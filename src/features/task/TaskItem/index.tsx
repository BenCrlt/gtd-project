import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AreaIcon from "@/features/area/AreaIcon";
import { getAreaName } from "@/features/area/utils";
import { formatDate } from "@/lib/date";
import { TasksInRange } from "@/resolvers/task/query";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { CalendarClock, Folder, Hourglass } from "lucide-react";
import { useMemo } from "react";
import TaskPriorityBadge from "./TaskPriorityBadge";

const MINUTES_IN_ONE_HOUR = 60;
const MINUTES_IN_ONE_DAY = MINUTES_IN_ONE_HOUR * 24;

interface Props {
  task: TasksInRange[number];
}
export default function TaskItem({ task }: Props) {
  const { startDate, endDate, name, priority, area, project, isDone } = task;

  const renderTimeDuration = useMemo(() => {
    if (!endDate) {
      return undefined;
    }
    const _differenceInMinutes = differenceInMinutes(endDate, startDate);
    if (_differenceInMinutes >= MINUTES_IN_ONE_DAY) {
      return `${differenceInDays(endDate, startDate)}d`;
    }
    if (_differenceInMinutes >= MINUTES_IN_ONE_HOUR) {
      return `${differenceInHours(endDate, startDate)}h`;
    }
    return `${_differenceInMinutes}m`;
  }, [endDate, startDate]);

  const taskArea = project?.area || area;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-4">
          {name}
          <TaskPriorityBadge priority={priority} />
        </CardTitle>
        <CardDescription className="flex gap-2">
          <div className="flex gap-1">
            <CalendarClock size="20px" />
            {formatDate(startDate, "p")}
          </div>
          {renderTimeDuration && (
            <div className="flex gap-1">
              <Hourglass size="20px" />
              {renderTimeDuration}
            </div>
          )}
          {taskArea && (
            <div className="flex gap-1">
              <AreaIcon area={taskArea} size="20px" />
              {getAreaName(taskArea)}
            </div>
          )}
          {project && (
            <div className="flex gap-1">
              <Folder size="20px" />
              {project.name}
            </div>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
