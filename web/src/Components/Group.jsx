import { useContext } from "react";
import { GroupContext } from "../Contexts/GroupContext";
import { ModeContext } from "../Contexts/ModeContext";

const TaskGroup = () => {
  const { group, groups, setGroupClick } = useContext(GroupContext);
  const { show_window, setGroupHandleMode } = useContext(ModeContext);
  return (
    <>
      {groups.length === 0 && (
        <div
          onClick={() => {
            setGroupClick({ name: "" });
            show_window({
              group_list: false,
              group_input: true,
              task_input: false,
              task_edit: false,
            });
            setGroupHandleMode(true);
          }}
          className="bg-blue-300 mx-2 mt-2 rounded-lg p-2"
        >
          Click me to add a group.
        </div>
      )}
      {groups.length !== 0 && (
        <div
          onClick={() =>
            show_window({
              group_list: true,
              group_input: false,
              task_input: false,
              task_edit: false,
            })
          }
          className="bg-[#395B64] mx-2 mt-2 rounded-lg p-2"
        >
          {group.name}
        </div>
      )}
    </>
  );
};

export default TaskGroup;
