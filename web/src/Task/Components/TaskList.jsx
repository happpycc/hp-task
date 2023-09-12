import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { group, groups } = useContext(TaskContext);
  if (groups.length === 0)
    return (
      <div className="h-full mx-2 mb-2 rounded-lg p-2 bg-[#040D12]">None</div>
    );
  return (
    <>
      {group.tasks.length === 0 && (
        <div className="h-full mx-2 mb-2 rounded-lg p-2 bg-[#053B50]">
          Empty
        </div>
      )}
      {group.tasks.length !== 0 && (
        <div className="h-full bg-red-300 mx-2 mb-2 rounded-lg p-2">
          {group.tasks.map((task, index) => {
            return <TaskItem key={task._id} index={index} task={task} />;
          })}
        </div>
      )}
    </>
  );
};

export default TaskList;
