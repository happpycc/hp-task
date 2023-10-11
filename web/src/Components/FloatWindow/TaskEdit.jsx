import { useContext } from "react";
import { ModeContext } from "../../Contexts/ModeContext";
import { TaskContext } from "../../Contexts/TaskContext";

export default function TaskEdit() {
  const { taskEditMode, show_window } = useContext(ModeContext);
  const { taskClick, setTaskClick, delete_task, update_content } =
    useContext(TaskContext);
  if (taskEditMode)
    return (
      <div
        className="absolute right-0 left-0 bottom-0 top-0 m-auto w-full h-full bg-transparent flex justify-center items-center"
        onClick={() => {
          show_window({
            group_list: false,
            group_input: false,
            task_input: false,
            task_edit: false,
          });
        }}
      >
        <div
          className="bg-[#321F28] p-3 overflow-y-scroll no-scrollbar w-3/4 flex flex-col gap-3 rounded"
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
              await update_content();
              show_window({
                group_list: false,
                group_input: false,
                task_input: false,
                task_edit: false,
              });
            }}
          >
            Update
          </button>
          <button
            className="border w-full rounded-lg"
            onClick={async () => {
              await delete_task();
              show_window({
                group_list: false,
                group_input: false,
                task_input: false,
                task_edit: false,
              });
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  else return <></>;
}
