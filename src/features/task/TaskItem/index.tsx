import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import AreaIcon from "@/features/area/AreaIcon";
import { getAreaName } from "@/features/area/utils";
import { formatDate, getTimeDifferenceString } from "@/lib/date";
import { TasksInRange } from "@/resolvers/task/query";
import { motion } from "framer-motion";
import { CalendarClock, Folder, Hourglass } from "lucide-react";
import { useMemo } from "react";
import { TaskEditView } from "./TaskEditView";
import TaskPriorityBadge from "./TaskPriorityBadge";

interface Props {
  task: TasksInRange[number];
}
export default function TaskItem({ task }: Props) {
  const { startDate, endDate, name, priority, area, project, isDone } = task;

  const taskArea = project?.area || area;

  const timeDuration = useMemo(
    () => getTimeDifferenceString(startDate, endDate),
    [startDate, endDate]
  );

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Sheet>
        <SheetTrigger className="w-full">
          <Card className="w-full">
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
                {timeDuration && (
                  <div className="flex gap-1">
                    <Hourglass size="20px" />
                    {timeDuration}
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
        </SheetTrigger>
        <TaskEditView task={task} />
      </Sheet>
    </motion.div>
  );
}
