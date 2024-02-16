import { Area } from "@prisma/client";

export function getAreaName(area: Area): string {
  switch (area) {
    case Area.WORK:
      return "Travail";
    case Area.PERSONAL:
      return "Personnel";
    case Area.HEALTH:
      return "Santé";
    case Area.HOBBIES:
      return "Loisirs";
    case Area.LEARNING:
      return "Apprentissage";
  }
}
