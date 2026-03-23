import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { MoviesModule } from "./movies/movies.module";
import { GenresModule } from "./genres/genres.module";
import { PhasesModule } from "./phases/phases.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { PlaylistsModule } from "./playlists/playlists.module";

@Module({
  imports: [
    PrismaModule,
    MoviesModule,
    GenresModule,
    PhasesModule,
    FavoritesModule,
    PlaylistsModule
  ]
})
export class AppModule {}
