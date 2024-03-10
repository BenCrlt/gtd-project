import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import AreaIcon from "@/features/area/AreaIcon";
import { getAreaName } from "@/features/area/utils";
import { formatDate, getTimeDifferenceString } from "@/lib/date";
import { TasksInRange } from "@/resolvers/task/query";
import { motion } from "framer-motion";
import { CalendarClock, Folder, Hourglass } from "lucide-react";
import { useContext, useMemo } from "react";
import { EditTaskFormContext } from "../TaskEditFormContext";
import { TaskEditView } from "./TaskEditView";
import TaskPriorityBadge from "./TaskPriorityBadge";

interface Props {
  task: TasksInRange[number];
}
export default function TaskItem({ task }: Props) {
  const { onSelect } = useContext(EditTaskFormContext);
  const { startDate, endDate, name, priority, area, project, isDone } = task;

  const taskArea = project?.area || area;

  const timeDuration = useMemo(
    () => getTimeDifferenceString(startDate, endDate),
    [startDate, endDate]
  );

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
      <DialogTrigger className="w-full">
        <Card className="w-full" onClick={() => onSelect(task)}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center gap-4">
              {name}
              <TaskPriorityBadge priority={priority} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3">
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
          </CardContent>
        </Card>
      </DialogTrigger>
      <TaskEditView />
    </motion.div>
  );
}
