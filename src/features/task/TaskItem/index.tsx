import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import AreaIcon from "@/features/area/AreaIcon";
import { getAreaName } from "@/features/area/utils";
import { getTimeDifferenceString } from "@/lib/date";
import { TasksInRange } from "@/resolvers/task/query";
import { differenceInMinutes } from "date-fns";
import { motion } from "framer-motion";
import { Hourglass } from "lucide-react";
import { useContext, useMemo } from "react";
import { EditTaskFormContext } from "../TaskEditFormContext";
import TaskPriorityBadge from "./TaskPriorityBadge";

interface Props {
  task: TasksInRange[number];
}
export default function TaskItem({ task }: Props) {
  const { onEdit, onUpdateTaskStatus } = useContext(EditTaskFormContext);
  const { startDate, endDate, name, priority, area, isDone, id } = task;

  const taskArea = area;

  const timeDuration = useMemo(
    () =>
      endDate && differenceInMinutes(startDate, endDate) > 0
        ? getTimeDifferenceString(startDate, endDate)
        : undefined,
    [startDate, endDate]
  );

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
      <Card className="w-full" onClick={() => onEdit(task)}>
        <CardHeader>
          <CardTitle className="flex justify-between items-center gap-4">
            {name}
            <TaskPriorityBadge priority={priority} />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex place-content-between px-6 py-2">
          <div className="flex gap-3 items-center">
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
          </div>
          <div
            className="flex size-10 border-s-violet-50 justify-center items-center"
            onClick={(e) => {
              onUpdateTaskStatus(id, !isDone);
              e.stopPropagation();
            }}
          >
            <Checkbox checked={isDone} className="size-6 rounded-full" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
