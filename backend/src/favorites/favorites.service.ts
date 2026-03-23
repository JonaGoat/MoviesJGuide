import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  private async ensureDevice(deviceKey: string) {
    return this.prisma.device.upsert({
      where: { deviceKey },
      update: {},
      create: { deviceKey }
    });
  }

  async list(deviceKey: string) {
    const device = await this.ensureDevice(deviceKey);
    return this.prisma.favorite.findMany({
      where: { deviceId: device.id },
      select: { movieId: true, createdAt: true }
    });
  }

  async add(deviceKey: string, movieId: string) {
    const device = await this.ensureDevice(deviceKey);
    return this.prisma.favorite.upsert({
      where: { deviceId_movieId: { deviceId: device.id, movieId } },
      update: {},
      create: { deviceId: device.id, movieId }
    });
  }

  async remove(deviceKey: string, movieId: string) {
    const device = await this.ensureDevice(deviceKey);
    return this.prisma.favorite.deleteMany({ where: { deviceId: device.id, movieId } });
  }
}
