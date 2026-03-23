import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TmdbService } from "../tmdb/tmdb.service";

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService, private readonly tmdb: TmdbService) {}

  private mapMovie(movie: any) {
    return {
      id: movie.id,
      title: movie.title,
      year: movie.year,
      phase: movie.phase?.name || "",
      heroKey: movie.heroKey,
      color: movie.color,
      chronoOrder: movie.chronoOrder,
      releaseOrder: movie.releaseOrder,
      runtime: movie.runtime,
      rating: movie.rating,
      description: movie.description,
      trailerUrl: movie.trailerUrl,
      posterPath: movie.posterPath,
      bannerPath: movie.bannerPath,
      isUpcoming: movie.isUpcoming,
      genres: movie.genres?.map((g: any) => g.genre.name) || []
    };
  }

  async list(params: { search?: string; genre?: string; phase?: string; order?: "chrono" | "release" }) {
    const where: any = {};

    if (params.search) {
      const q = params.search.trim();
      const maybeYear = Number(q);
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { heroKey: { contains: q, mode: "insensitive" } },
        { phase: { name: { contains: q, mode: "insensitive" } } }
      ];
      if (!Number.isNaN(maybeYear)) {
        where.OR.push({ year: maybeYear });
      }
    }

    if (params.genre) {
      where.genres = { some: { genre: { name: params.genre } } };
    }

    if (params.phase) {
      where.phase = { name: params.phase };
    }

    const orderBy = params.order === "release" ? { releaseOrder: "asc" } : { chronoOrder: "asc" };

    const movies = await this.prisma.movie.findMany({
      where,
      orderBy,
      include: {
        phase: true,
        genres: { include: { genre: true } }
      }
    });

    return movies.map((m) => this.mapMovie(m));
  }

  async getById(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: { phase: true, genres: { include: { genre: true } } }
    });
    if (!movie) throw new NotFoundException("Movie not found");

    if (!movie.runtime || !movie.description || movie.rating == null) {
      await this.tryHydrateFromTmdb(movie.id);
    }

    const fresh = await this.prisma.movie.findUnique({
      where: { id },
      include: { phase: true, genres: { include: { genre: true } } }
    });
    return this.mapMovie(fresh || movie);
  }

  async getRecommendations(id: string) {
    const base = await this.prisma.movie.findUnique({ where: { id } });
    if (!base) throw new NotFoundException("Movie not found");

    const all = await this.prisma.movie.findMany({ orderBy: { chronoOrder: "asc" } });
    const byChrono = [...all].sort((a, b) => (a.chronoOrder ?? 9999) - (b.chronoOrder ?? 9999));
    const byRelease = [...all].sort((a, b) => (a.releaseOrder ?? 9999) - (b.releaseOrder ?? 9999));

    const sameHero = byChrono.filter((m) => m.heroKey === base.heroKey && m.id !== base.id);

    const neighbors = (arr: typeof all) => {
      const idx = arr.findIndex((m) => m.id === base.id);
      return [idx > 0 ? arr[idx - 1] : null, idx >= 0 && idx < arr.length - 1 ? arr[idx + 1] : null].filter(Boolean);
    };

    const extras = [...neighbors(byChrono), ...neighbors(byRelease)];
    const ids = new Set<string>();
    const merged = [...sameHero, ...extras].filter((m) => {
      if (!m || ids.has(m.id)) return false;
      ids.add(m.id);
      return true;
    });

    const withRelations = await this.prisma.movie.findMany({
      where: { id: { in: merged.map((m) => m.id) } },
      include: { phase: true, genres: { include: { genre: true } } }
    });

    return withRelations.map((m) => this.mapMovie(m));
  }

  private async tryHydrateFromTmdb(id: string) {
    try {
      const movie = await this.prisma.movie.findUnique({ where: { id } });
      if (!movie) return;

      let tmdbId = movie.tmdbId || null;
      if (!tmdbId) {
        const found = await this.tmdb.searchMovie(movie.title, movie.year);
        tmdbId = found?.id || null;
      }

      if (!tmdbId) return;
      const details = await this.tmdb.getMovieDetails(tmdbId);
      if (!details) return;

      const data: {
        tmdbId?: number;
        runtime?: string;
        rating?: number | null;
        description?: string;
      } = { tmdbId };

      if (typeof details.runtime === "number" && details.runtime > 0) {
        const h = Math.floor(details.runtime / 60);
        const m = details.runtime % 60;
        data.runtime = `${h}h ${m}min`;
      }

      if (typeof details.vote_average === "number") {
        data.rating = details.vote_average;
      }

      if (details.overview && typeof details.overview === "string" && details.overview.trim()) {
        data.description = details.overview.trim();
      }

      if (Object.keys(data).length > 1) {
        await this.prisma.movie.update({ where: { id }, data });
      }
    } catch {
      return;
    }
  }
}
