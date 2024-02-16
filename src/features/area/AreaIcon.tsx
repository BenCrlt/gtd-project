import { Area } from "@prisma/client";
import { BookOpen, Briefcase, Cross, Heart, Piano } from "lucide-react";

interface Props {
  area: Area;
  size?: string;
}

export default function AreaIcon({ area, size }: Props) {
  switch (area) {
    case Area.WORK:
      return <Briefcase size={size} />;
    case Area.PERSONAL:
      return <Heart size={size} />;
    case Area.HEALTH:
      return <Cross size={size} />;
    case Area.HOBBIES:
      return <Piano size={size} />;
    case Area.LEARNING:
      return <BookOpen size={size} />;
  }
}
