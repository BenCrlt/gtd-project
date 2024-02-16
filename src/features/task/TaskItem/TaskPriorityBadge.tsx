import { Badge } from "@/components/ui/badge";
import { Priority } from "@prisma/client";

interface Props {
  priority: Priority;
}

export default function TaskPriorityBadge({ priority }: Props) {
  switch (priority) {
    case "LOW":
      return <Badge className="bg-green-500">Low</Badge>;
    case "MEDIUM":
      return <Badge className="bg-yellow-500">Medium</Badge>;
    case "HIGH":
      return <Badge className="bg-red-500">High</Badge>;
  }
}
