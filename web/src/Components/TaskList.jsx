import { useContext } from "react";
import { GroupContext } from "../Contexts/GroupContext";
import TaskItem from "./TaskItem";
import { ModeContext } from "../Contexts/ModeContext";
import { TaskContext } from "../Contexts/TaskContext";

const TaskList = () => {
  const { group, groups } = useContext(GroupContext);
  const { show_window } = useContext(ModeContext);
  const { setTaskClick, setTaskUpdateText } = useContext(TaskContext);
  if (groups.length === 0)
    return (
      <div className="h-full mx-2 mb-2 rounded-lg p-2 bg-[#040D12]">None</div>
    );
  return (
    <>
      {group.tasks.length === 0 && (
        <div className="h-full mx-2 mb-2 rounded-lg p-2 bg-[#053B50]">
          <div
            onClick={() => {
              setTaskClick({ content: "", position: 0 });
              show_window({
                group_list: false,
                group_input: false,
                task_input: true,
              });
            }}
          >
            Click me to add a task.
          </div>
        </div>
      )}
      {group.tasks.length !== 0 && (
        <div className="h-full p-2 overflow-y-auto no-scrollbar flex flex-col gap-2">
          {group.tasks.map((task, index) => {
            return <TaskItem key={task._id} index={index} task={task} />;
          })}
        </div>
      )}
    </>
  );
};

export default TaskList;
