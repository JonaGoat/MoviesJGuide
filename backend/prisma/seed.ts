import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const HERO_COLORS: Record<string, string> = {
  ironman: "#9a0928dd",
  hulk: "#15b04e",
  thor: "#221965",
  captainamerica: "#2563eb",
  avengers: "#77757a99",
  guardians: "#f59e0b",
  antman: "#d04a4a",
  spiderman: "#223cc0",
  doctorstrange: "#f755b4",
  blackpanther: "#620065",
  captainmarvel: "#d4de53",
  blackwidow: "#543a28",
  shangchi: "#6d5714",
  eternals: "#60fafa",
  deadpool: "#ffffff",
  xmen: "#66f43f",
  thunderbolts: "#72afa8",
  fantasticfour: "#0ca2bc",
  other: "#b694b8"
};

const TMDB_FORCE_IDS: Record<string, number> = {
  fantasticfourfirststeps: 617126,
  avengers: 24428,
  blackwidow: 497698,
  captainamerica3: 271110
};

function mk(
  id: string,
  title: string,
  year: number,
  phase: string,
  genres: string[],
  trailerUrl: string,
  heroKey: string,
  chronoOrder: number,
  releaseOrder: number,
  isUpcoming = false
) {
  return {
    id,
    title,
    year,
    phase,
    genres,
    trailerUrl,
    heroKey,
    color: HERO_COLORS[heroKey] || HERO_COLORS.other,
    chronoOrder,
    releaseOrder,
    isUpcoming,
    posterPath: `/images/${id}-poster.jpg`,
    bannerPath: `/images/${id}-banner.jpg`,
    runtime: null as string | null,
    rating: null as number | null,
    description: "Cargando información...",
    tmdbId: TMDB_FORCE_IDS[id]
  };
}

const movies = [
  mk("ironman","Iron Man",2008,"Fase 1",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=uzdRdMqPJqI","ironman",3,1),
  mk("incrediblehulk","The Incredible Hulk",2008,"Fase 1",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=iAbQLS2TGq4","hulk",10,2),
  mk("ironman2","Iron Man 2",2010,"Fase 1",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=rOrRtdOQcZs","ironman",4,3),
  mk("thor","Thor",2011,"Fase 1",["Acción","Fantasía"],"https://www.youtube.com/watch?v=XqlnQDNrg-Q","thor",5,4),
  mk("captainamerica1","Captain America: The First Avenger",2011,"Fase 1",["Acción","Aventura"],"https://www.youtube.com/watch?v=JhI9QQeLeD0","captainamerica",1,5),
  mk("avengers","The Avengers",2012,"Fase 1",["Acción","Ciencia ficción","Aventura"],"https://www.youtube.com/watch?v=yNXfOOL8824","avengers",12,6),

  mk("ironman3","Iron Man 3",2013,"Fase 2",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=MPwsK6CI4dQ","ironman",13,7),
  mk("thor2","Thor: The Dark World",2013,"Fase 2",["Acción","Fantasía"],"https://www.youtube.com/watch?v=_87P6WrC8C0","thor",14,8),
  mk("captainamerica2","Captain America: The Winter Soldier",2014,"Fase 2",["Acción","Thriller"],"https://www.youtube.com/watch?v=GpP3kd1a0Yk","captainamerica",15,9),
  mk("guardians1","Guardians of the Galaxy",2014,"Fase 2",["Acción","Ciencia ficción","Aventura"],"https://www.youtube.com/watch?v=qdIuXCfUKM8","guardians",16,10),
  mk("avengers2","Avengers: Age of Ultron",2015,"Fase 2",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=DMFBm_lp4rU","avengers",18,11),
  mk("antman","Ant-Man",2015,"Fase 2",["Acción","Comedia","Ciencia ficción"],"https://www.youtube.com/watch?v=42h1BHPf0ag","antman",19,12),

  mk("captainamerica3","Captain America: Civil War",2016,"Fase 3",["Acción","Aventura"],"https://www.youtube.com/watch?v=s5PVmDAEuro","captainamerica",20,13),
  mk("doctorstrange","Doctor Strange",2016,"Fase 3",["Acción","Fantasía"],"https://www.youtube.com/watch?v=pSDvNzXDA38","doctorstrange",21,14),
  mk("guardians2","Guardians of the Galaxy Vol. 2",2017,"Fase 3",["Acción","Ciencia ficción","Aventura"],"https://www.youtube.com/watch?v=Za0BlY6plOA","guardians",17,15),
  mk("spidermanhomecoming","Spider-Man: Homecoming",2017,"Fase 3",["Acción","Aventura"],"https://www.youtube.com/watch?v=UBd31udDF_0","spiderman",22,16),
  mk("thor3","Thor: Ragnarok",2017,"Fase 3",["Acción","Comedia","Fantasía"],"https://www.youtube.com/watch?v=qeJoP5eprXc&t=5s","thor",23,17),
  mk("blackpanther","Black Panther",2018,"Fase 3",["Acción","Aventura"],"https://www.youtube.com/watch?v=wp_QaWgfZDc","blackpanther",24,18),
  mk("avengers3","Avengers: Infinity War",2018,"Fase 3",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=LG4DS-L4PZo","avengers",25,19),
  mk("antman2","Ant-Man and the Wasp",2018,"Fase 3",["Acción","Comedia","Ciencia ficción"],"https://www.youtube.com/watch?v=8_rTIAOohas","antman",26,20),
  mk("captainmarvel","Captain Marvel",2019,"Fase 3",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=6XkN-MFNZpI","captainmarvel",2,21),
  mk("avengers4","Avengers: Endgame",2019,"Fase 3",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=KdL8ucqi1F8","avengers",27,22),
  mk("spidermanfarfromhome","Spider-Man: Far From Home",2019,"Fase 3",["Acción","Aventura"],"https://www.youtube.com/watch?v=GNbfQKcHHqw","spiderman",28,23),

  mk("blackwidow","Black Widow",2021,"Fase 4",["Acción","Thriller"],"https://www.youtube.com/watch?v=bWge6aMmgkk","blackwidow",11,24),
  mk("shangchi","Shang-Chi and the Legend of the Ten Rings",2021,"Fase 4",["Acción","Fantasía","Aventura"],"https://www.youtube.com/watch?v=BD77EOU8N3o","shangchi",29,25),
  mk("eternals","Eternals",2021,"Fase 4",["Acción","Ciencia ficción","Fantasía"],"https://www.youtube.com/watch?v=v1EkoQV4g5c","eternals",30,26),
  mk("spidermannowayhome","Spider-Man: No Way Home",2021,"Fase 4",["Acción","Aventura"],"https://www.youtube.com/watch?v=aIONNnhkonQ","spiderman",31,27),
  mk("doctorstrange2","Doctor Strange in the Multiverse of Madness",2022,"Fase 4",["Acción","Fantasía"],"https://www.youtube.com/watch?v=KREBGtEeW9U","doctorstrange",32,28),
  mk("thor4","Thor: Love and Thunder",2022,"Fase 4",["Acción","Comedia","Fantasía"],"https://www.youtube.com/watch?v=ZaD7iZR0-5w","thor",33,29),
  mk("blackpanther2","Black Panther: Wakanda Forever",2022,"Fase 4",["Acción","Aventura"],"https://www.youtube.com/watch?v=hpT-11DMqVs","blackpanther",34,30),

  mk("antman3","Ant-Man and the Wasp: Quantumania",2023,"Fase 5",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=mjkQXxYn-ag","antman",35,31),
  mk("guardians3","Guardians of the Galaxy Vol. 3",2023,"Fase 5",["Acción","Ciencia ficción","Aventura"],"https://www.youtube.com/watch?v=sinstLBy9l8","guardians",36,32),
  mk("themarvels","The Marvels",2023,"Fase 5",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=itm8efx8k8U&t=12s","captainmarvel",37,33),

  mk("deadpoolwolverine","Deadpool & Wolverine",2024,"Fase 5",["Acción","Comedia"],"https://www.youtube.com/watch?v=UzFZR2dRsSY","deadpool",38,34),
  mk("captainamerica4","Captain America: Brave New World",2025,"Fase 5",["Acción","Thriller"],"https://www.youtube.com/watch?v=RXoqRPP-y5c","captainamerica",39,35),
  mk("thunderbolts","Thunderbolts*",2025,"Fase 5",["Acción","Aventura"],"https://www.youtube.com/watch?v=F2XL9eamayo","thunderbolts",40,36),
  mk("fantasticfourfirststeps","The Fantastic 4: First Steps",2025,"Fase 6",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=big1YWw_TgM","fantasticfour",41,37),

  mk("spidermanbrandnewday","Spider-Man: Brand New Day",2026,"Fase 6",["Acción","Aventura"],"https://www.youtube.com/watch?v=QOdF1zK4ZkY","spiderman",42,38,true),
  mk("avengersdoomsday","Avengers: Doomsday",2026,"Fase 6",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=NLWIn5lfXCE","avengers",43,39,true),
  mk("avengerssecretwars","Avengers: Secret Wars",2027,"Fase 6",["Acción","Ciencia ficción"],"https://www.youtube.com/results?search_query=avengers_secret_wars+trailer","avengers",44,40,true)
];

async function main() {
  const phaseNames = Array.from(new Set(movies.map((m) => m.phase)));
  const phasesSorted = phaseNames.sort((a, b) => {
    const na = Number((a.match(/\d+/) || ["0"])[0]);
    const nb = Number((b.match(/\d+/) || ["0"])[0]);
    return na - nb;
  });

  const phaseIdByName = new Map<string, string>();
  for (const [index, name] of phasesSorted.entries()) {
    const phase = await prisma.phase.upsert({
      where: { name },
      update: { order: index + 1 },
      create: { name, order: index + 1 }
    });
    phaseIdByName.set(name, phase.id);
  }

  const genreNames = Array.from(new Set(movies.flatMap((m) => m.genres)));
  const genreIdByName = new Map<string, string>();
  for (const name of genreNames) {
    const genre = await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name }
    });
    genreIdByName.set(name, genre.id);
  }

  for (const movie of movies) {
    const phaseId = phaseIdByName.get(movie.phase);
    if (!phaseId) continue;

    await prisma.movie.upsert({
      where: { id: movie.id },
      update: {
        title: movie.title,
        year: movie.year,
        heroKey: movie.heroKey,
        color: movie.color,
        chronoOrder: movie.chronoOrder,
        releaseOrder: movie.releaseOrder,
        runtime: movie.runtime,
        rating: movie.rating,
        description: movie.description,
        trailerUrl: movie.trailerUrl,
        posterPath: movie.posterPath,
        bannerPath: movie.bannerPath,
        isUpcoming: movie.isUpcoming,
        tmdbId: movie.tmdbId,
        phaseId
      },
      create: {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        heroKey: movie.heroKey,
        color: movie.color,
        chronoOrder: movie.chronoOrder,
        releaseOrder: movie.releaseOrder,
        runtime: movie.runtime,
        rating: movie.rating,
        description: movie.description,
        trailerUrl: movie.trailerUrl,
        posterPath: movie.posterPath,
        bannerPath: movie.bannerPath,
        isUpcoming: movie.isUpcoming,
        tmdbId: movie.tmdbId,
        phaseId
      }
    });

    await prisma.movieGenre.deleteMany({ where: { movieId: movie.id } });

    const genreIds = movie.genres.map((g) => genreIdByName.get(g)).filter(Boolean) as string[];
    if (genreIds.length) {
      await prisma.movieGenre.createMany({
        data: genreIds.map((genreId) => ({ movieId: movie.id, genreId }))
      });
    }
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

