import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePlaylistDto {
  @IsString()
  @MaxLength(80)
  name!: string;
}
