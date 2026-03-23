import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    const genres = await this.prisma.genre.findMany({ orderBy: { name: "asc" } });
    return genres.map((g) => g.name);
  }
}
