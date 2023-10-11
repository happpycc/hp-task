import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import { ModeContext } from "../Contexts/ModeContext";
import { GroupContext } from "../Contexts/GroupContext";
import {
  StopIcon,
  XCircleIcon,
  CheckCircleIcon,
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const TaskItem = ({ index, task }) => {
  const { group } = useContext(GroupContext);
  const { setTaskClick, update_position, update_state } =
    useContext(TaskContext);
  const { show_window } = useContext(ModeContext);
  const [state, setState] = useState(task.state);
  const handleStateOnClick = async () => {
    let _state = state;
    switch (_state) {
      case "todo":
        _state = "done";
        break;
      case "done":
        _state = "abandon";
        break;
      case "abandon":
        _state = "todo";
        break;
    }
    await update_state(index, _state, task._id);
    setState(_state);
  };
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
      <div className="flex w-full justify-center items-center overflow-x-scroll pl-1.5">
        <button
          onClick={() => {
            setTaskClick({ content: task.content, id: task._id, index: index });
            show_window({
              group_list: false,
              group_input: false,
              task_input: false,
              task_edit: true,
            });
          }}
        >
          {task.content}
        </button>
      </div>
      <div className="flex items-center pt-1.5 pr-1.5">
        {state === "todo" && (
          <StopIcon onClick={handleStateOnClick} className="w-8 h-8" />
        )}
        {state === "done" && (
          <CheckCircleIcon onClick={handleStateOnClick} className="w-8 h-8" />
        )}
        {state === "abandon" && (
          <XCircleIcon onClick={handleStateOnClick} className="w-8 h-8" />
        )}
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
              task_edit: false,
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
              task_edit: false,
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
