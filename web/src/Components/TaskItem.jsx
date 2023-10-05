import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import { ModeContext } from "../Contexts/ModeContext";
import { GroupContext } from "../Contexts/GroupContext";
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

const TaskItem = ({ index, task }) => {
  const { group } = useContext(GroupContext);
  const { setTaskClick, update_position } = useContext(TaskContext);
  const { show_window } = useContext(ModeContext);
  return (
    <div className="w-full flex justify-around rounded-md bg-[#3F4E4F]">
      <div
        className={`flex p-1 ${
          index === 0 || index === group.tasks.length - 1
            ? "justify-center"
            : "flex-col justify-between gap-1 "
        }`}
      >
        {index !== 0 && (
          <button onClick={() => update_position(index, index - 1, task._id)}>
            <ArrowUpCircleIcon className="w-6 h-6" />
          </button>
        )}
        {index !== group.tasks.length - 1 && (
          <button onClick={() => update_position(index, index + 1, task._id)}>
            <ArrowDownCircleIcon className="w-6 h-6" />
          </button>
        )}
      </div>
      <div className="flex w-full justify-center items-center overflow-x-scroll">
        {task.content}
      </div>
      <div className="flex flex-col justify-between p-1 gap-1">
        <button
          onClick={() => {
            setTaskClick({
              content: "",
              position: index,
            });
            show_window({
              group_list: false,
              group_input: false,
              task_input: true,
            });
          }}
        >
          <PlusCircleIcon className="w-6 h-6" />
        </button>
        <button
          onClick={() => {
            setTaskClick({
              content: "",
              position: index + 1,
            });
            show_window({
              group_list: false,
              group_input: false,
              task_input: true,
            });
          }}
        >
          <PlusCircleIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
