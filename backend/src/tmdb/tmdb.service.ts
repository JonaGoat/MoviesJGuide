import { Injectable } from "@nestjs/common";

@Injectable()
export class TmdbService {
  private get apiKey() {
    return (process.env.TMDB_API_KEY || "").trim();
  }

  private get readToken() {
    return (process.env.TMDB_READ_TOKEN || "").trim();
  }

  private get lang() {
    return (process.env.TMDB_LANG || "es-ES").trim();
  }

  private get region() {
    return (process.env.TMDB_REGION || "CL").trim();
  }

  private get headers(): Record<string, string> {
    if (this.readToken && this.readToken.length > 20) {
      return { Authorization: `Bearer ${this.readToken}` };
    }
    return {};
  }

  private get enabled(): boolean {
    return Boolean(this.apiKey || this.readToken);
  }

  private async fetchJson(url: string) {
    try {
      const res = await fetch(url, { headers: this.headers });
      const data = await res.json().catch(() => null);
      if (!res.ok) return null;
      if (data && typeof data.status_code === "number" && data.success === false) return null;
      return data;
    } catch {
      return null;
    }
  }

  async searchMovie(title: string, year?: number) {
    if (!this.enabled) return null;
    const normalizedTitle =
      title.includes("Fantastic 4") || title.includes("Fantastic Four")
        ? "The Fantastic Four: First Steps"
        : title;

    const doSearch = async (query: string, y?: number) => {
      const url = new URL("https://api.themoviedb.org/3/search/movie");
      if (this.apiKey) url.searchParams.set("api_key", this.apiKey);
      url.searchParams.set("language", this.lang);
      url.searchParams.set("region", this.region);
      url.searchParams.set("include_adult", "false");
      url.searchParams.set("query", query);
      if (y) url.searchParams.set("year", String(y));
      const data = await this.fetchJson(url.toString());
      if (!data || !Array.isArray(data.results) || !data.results.length) return null;
      return data.results[0];
    };

    const withYear = await doSearch(normalizedTitle, year);
    if (withYear) return withYear;
    return doSearch(normalizedTitle);
  }

  async getMovieDetails(tmdbId: number) {
    if (!this.enabled) return null;
    const url = new URL(`https://api.themoviedb.org/3/movie/${tmdbId}`);
    if (this.apiKey) url.searchParams.set("api_key", this.apiKey);
    url.searchParams.set("language", this.lang);
    return this.fetchJson(url.toString());
  }
}
