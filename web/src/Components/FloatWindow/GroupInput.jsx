import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";

export default function InputWindow() {
  const {
    groupInput,
    setGroupInput,
    groupInputMode,
    setGroupInputMode,
    add_group,
    update_group,
    groupHandleMode,
  } = useContext(DataContext);
  if (groupInputMode)
    return (
      <div
        className="absolute right-0 left-0 bottom-0 top-0 m-auto w-full h-full bg-transparent flex justify-center items-center"
        onClick={() => {
          setGroupInputMode(false);
        }}
      >
        <div
          className="border p-2 overflow-y-scroll no-scrollbar w-auto bg-blue-900 flex flex-col gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            className="outline-none resize-none p-1"
            value={groupInput}
            onChange={(e) => setGroupInput(e.target.value)}
          />
          <button
            className="border w-full"
            onClick={async () => {
              groupHandleMode ? await add_group() : await update_group();
              setGroupInput("");
              setGroupInputMode(false);
            }}
          >
            {groupHandleMode ? "Add" : "Update"}
          </button>
        </div>
      </div>
    );
  else return <></>;
}
