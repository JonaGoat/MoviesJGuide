export function heroLabel(heroKey: string): string {
  const map: Record<string, string> = {
    ironman: "Iron Man",
    hulk: "Hulk",
    thor: "Thor",
    captainamerica: "Captain America",
    avengers: "Avengers",
    guardians: "Guardians",
    antman: "Ant-Man",
    spiderman: "Spider-Man",
    doctorstrange: "Doctor Strange",
    blackpanther: "Black Panther",
    captainmarvel: "Captain Marvel",
    blackwidow: "Black Widow",
    shangchi: "Shang-Chi",
    eternals: "Eternals",
    deadpool: "Deadpool",
    xmen: "X-Men",
    thunderbolts: "Thunderbolts",
    fantasticfour: "Fantastic Four",
    other: "Otros"
  };
  return map[heroKey] || "Otros";
}
