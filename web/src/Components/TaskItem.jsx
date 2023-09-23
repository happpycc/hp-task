import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import { ModeContext } from "../Contexts/ModeContext";
import { GroupContext } from "../Contexts/GroupContext";

const TaskItem = ({ index, task }) => {
  const { group } = useContext(GroupContext);
  const { setTaskClick, update_position } = useContext(TaskContext);
  const { show_window } = useContext(ModeContext);
  return (
    <div className="w-full flex justify-around border">
      <div className="flex flex-col">
        {index !== 0 && (
          <button
            onClick={() =>
              update_position(index + 1, index === 0 ? 0 : index - 1, task._id)
            }
          >
            ++
          </button>
        )}
        {index !== group.tasks.length - 1 && (
          <button onClick={() => update_position(index, index + 1, task._id)}>
            ++
          </button>
        )}
      </div>
      <div className="flex w-full justify-center items-center">
        {task.content}
      </div>
      <div className="flex flex-col">
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
          +
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
          +
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
