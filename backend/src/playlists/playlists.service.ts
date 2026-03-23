import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PlaylistsService {
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
    const lists = await this.prisma.playlist.findMany({
      where: { deviceId: device.id },
      include: { _count: { select: { items: true } } },
      orderBy: { updatedAt: "desc" }
    });
    return lists.map((p) => ({ id: p.id, name: p.name, itemCount: p._count.items }));
  }

  async create(deviceKey: string, name: string) {
    const device = await this.ensureDevice(deviceKey);
    if (!name || !name.trim()) throw new BadRequestException("name is required");
    return this.prisma.playlist.create({ data: { deviceId: device.id, name: name.trim() } });
  }

  async update(deviceKey: string, id: string, data: { name?: string }) {
    const device = await this.ensureDevice(deviceKey);
    const playlist = await this.prisma.playlist.findFirst({ where: { id, deviceId: device.id } });
    if (!playlist) throw new NotFoundException("Playlist not found");
    return this.prisma.playlist.update({ where: { id }, data: { name: data.name?.trim() || playlist.name } });
  }

  async remove(deviceKey: string, id: string) {
    const device = await this.ensureDevice(deviceKey);
    await this.prisma.playlistItem.deleteMany({ where: { playlistId: id } });
    return this.prisma.playlist.deleteMany({ where: { id, deviceId: device.id } });
  }

  async items(deviceKey: string, playlistId: string) {
    const device = await this.ensureDevice(deviceKey);
    const playlist = await this.prisma.playlist.findFirst({ where: { id: playlistId, deviceId: device.id } });
    if (!playlist) throw new NotFoundException("Playlist not found");
    const items = await this.prisma.playlistItem.findMany({
      where: { playlistId },
      include: { movie: true },
      orderBy: { order: "asc" }
    });
    return items.map((item) => ({
      id: item.id,
      movieId: item.movieId,
      order: item.order
    }));
  }

  async addItem(deviceKey: string, playlistId: string, movieId: string) {
    const device = await this.ensureDevice(deviceKey);
    const playlist = await this.prisma.playlist.findFirst({ where: { id: playlistId, deviceId: device.id } });
    if (!playlist) throw new NotFoundException("Playlist not found");

    const existing = await this.prisma.playlistItem.findFirst({ where: { playlistId, movieId } });
    if (existing) return existing;

    const maxOrder = await this.prisma.playlistItem.aggregate({
      where: { playlistId },
      _max: { order: true }
    });

    const order = (maxOrder._max.order || 0) + 1;
    return this.prisma.playlistItem.create({ data: { playlistId, movieId, order } });
  }

  async removeItem(deviceKey: string, playlistId: string, movieId: string) {
    const device = await this.ensureDevice(deviceKey);
    const playlist = await this.prisma.playlist.findFirst({ where: { id: playlistId, deviceId: device.id } });
    if (!playlist) throw new NotFoundException("Playlist not found");

    return this.prisma.playlistItem.deleteMany({ where: { playlistId, movieId } });
  }
}
