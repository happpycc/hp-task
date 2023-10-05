import { useContext } from "react";
import { ModeContext } from "../../Contexts/ModeContext";
import { TaskContext } from "../../Contexts/TaskContext";

export default function TaskInput() {
  const { taskInputMode, show_window } = useContext(ModeContext);
  const { taskClick, setTaskClick, add_task } = useContext(TaskContext);
  if (taskInputMode)
    return (
      <div
        className="absolute right-0 left-0 bottom-0 top-0 m-auto w-full h-full bg-transparent flex justify-center items-center"
        onClick={() => {
          show_window({
            group_list: false,
            group_input: false,
            task_input: false,
          });
        }}
      >
        <div
          className="bg-[#321F28] p-3 overflow-y-scroll no-scrollbar w-auto flex flex-col gap-3 rounded"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            className="outline-none resize-none p-2 rounded-lg bg-[#734046]"
            value={taskClick.content}
            onChange={(e) =>
              setTaskClick((_taskClick) => ({
                ..._taskClick,
                content: e.target.value,
              }))
            }
          />
          <button
            className="border w-full rounded-lg"
            onClick={async () => {
              await add_task();
              show_window({
                group_list: false,
                group_input: false,
                task_input: false,
              });
            }}
          >
            Add
          </button>
        </div>
      </div>
    );
  else return <></>;
}
