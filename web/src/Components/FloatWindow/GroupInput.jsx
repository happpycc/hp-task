import { useContext } from "react";
import { GroupContext } from "../../Contexts/GroupContext";
import { ModeContext } from "../../Contexts/ModeContext";

export default function InputWindow() {
  const { groupClick, setGroupClick, add_group, update_group } =
    useContext(GroupContext);
  const { groupHandleMode, show_window, groupInputMode } =
    useContext(ModeContext);
  if (groupInputMode)
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
          className="border p-2 overflow-y-scroll no-scrollbar w-auto bg-blue-900 flex flex-col gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            className="outline-none resize-none p-1"
            value={groupClick.name}
            onChange={(e) =>
              setGroupClick((_groupClick) => ({
                ..._groupClick,
                name: e.target.value,
              }))
            }
          />
          <button
            className="border w-full"
            onClick={async () => {
              groupHandleMode ? await add_group() : await update_group();
              show_window({
                group_list: false,
                group_input: false,
                task_input: false,
              });
            }}
          >
            {groupHandleMode ? "Add" : "Update"}
          </button>
        </div>
      </div>
    );
  else return <></>;
}
