import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PhasesService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.phase.findMany({ orderBy: { order: "asc" } });
  }
}
