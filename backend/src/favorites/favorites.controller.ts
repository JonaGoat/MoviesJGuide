import { Controller, Delete, Get, Headers, Param, Post, Query } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { resolveDeviceId } from "../common/device/resolve-device-id";

@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  list(@Headers("x-device-id") header: string, @Query("deviceId") query: string) {
    const deviceId = resolveDeviceId({ header, query });
    return this.favoritesService.list(deviceId);
  }

  @Post(":movieId")
  add(@Param("movieId") movieId: string, @Headers("x-device-id") header: string, @Query("deviceId") query: string) {
    const deviceId = resolveDeviceId({ header, query });
    return this.favoritesService.add(deviceId, movieId);
  }

  @Delete(":movieId")
  remove(@Param("movieId") movieId: string, @Headers("x-device-id") header: string, @Query("deviceId") query: string) {
    const deviceId = resolveDeviceId({ header, query });
    return this.favoritesService.remove(deviceId, movieId);
  }
}
