import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query } from "@nestjs/common";
import { PlaylistsService } from "./playlists.service";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { resolveDeviceId } from "../common/device/resolve-device-id";

@Controller("playlists")
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Get()
  list(@Headers("x-device-id") header: string, @Query("deviceId") query: string) {
    const deviceId = resolveDeviceId({ header, query });
    return this.playlistsService.list(deviceId);
  }

  @Post()
  create(
    @Body() body: CreatePlaylistDto,
    @Headers("x-device-id") header: string,
    @Query("deviceId") query: string
  ) {
    const deviceId = resolveDeviceId({ header, query });
    return this.playlistsService.create(deviceId, body.name);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() body: UpdatePlaylistDto,
    @Headers("x-device-id") header: string,
    @Query("deviceId") query: string
  ) {
    const deviceId = resolveDeviceId({ header, query });
    return this.playlistsService.update(deviceId, id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Headers("x-device-id") header: string, @Query("deviceId") query: string) {
    const deviceId = resolveDeviceId({ header, query });
    return this.playlistsService.remove(deviceId, id);
  }

  @Get(":id/items")
  items(@Param("id") id: string, @Headers("x-device-id") header: string, @Query("deviceId") query: string) {
    const deviceId = resolveDeviceId({ header, query });
    return this.playlistsService.items(deviceId, id);
  }

  @Post(":id/items")
  addItem(
    @Param("id") id: string,
    @Body("movieId") movieId: string,
    @Headers("x-device-id") header: string,
    @Query("deviceId") query: string
  ) {
    const deviceId = resolveDeviceId({ header, query });
    return this.playlistsService.addItem(deviceId, id, movieId);
  }

  @Delete(":id/items/:movieId")
  removeItem(
    @Param("id") id: string,
    @Param("movieId") movieId: string,
    @Headers("x-device-id") header: string,
    @Query("deviceId") query: string
  ) {
    const deviceId = resolveDeviceId({ header, query });
    return this.playlistsService.removeItem(deviceId, id, movieId);
  }
}
