import "dotenv/config";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const originEnv = process.env.FRONTEND_ORIGIN || "";
  const originList = originEnv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  app.enableCors({
    origin: originList.length
      ? originList
      : [
          "http://localhost:3000",
          "https://movies-j-guide.vercel.app",
          /\.vercel\.app$/,
        ],
    credentials: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true })
  );

  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  await app.listen(port, "0.0.0.0");

  console.log(`API running on port ${port}`);
}

bootstrap();
