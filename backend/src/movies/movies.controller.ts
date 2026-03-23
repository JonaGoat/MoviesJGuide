import { Controller, Get, Param, Query } from "@nestjs/common";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  list(
    @Query("search") search?: string,
    @Query("genre") genre?: string,
    @Query("phase") phase?: string,
    @Query("order") order?: "chrono" | "release"
  ) {
    return this.moviesService.list({ search, genre, phase, order });
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.moviesService.getById(id);
  }

  @Get(":id/recommendations")
  getRecommendations(@Param("id") id: string) {
    return this.moviesService.getRecommendations(id);
  }
}
