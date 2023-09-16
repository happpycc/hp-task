import { useContext } from "react";
import { DataContext } from "../Contexts/DataContext";

const TaskGroup = () => {
  const {
    group,
    groups,
    setGroupListMode,
    setGroupInputMode,
    setGroupHandleMode,
    setGroupInput,
  } = useContext(DataContext);
  return (
    <>
      {groups.length === 0 && (
        <div
          onClick={() => {
            setGroupInputMode(true);
            setGroupInput("");
            setGroupHandleMode(true); // true ===> POST; false ===> PUT
          }}
          className="bg-blue-300 mx-2 mt-2 rounded-lg border-black p-2"
        >
          Click me to add a group.
        </div>
      )}
      {groups.length !== 0 && (
        <div
          onClick={() => setGroupListMode(true)}
          className="bg-blue-300 mx-2 mt-2 rounded-lg border-black p-2"
        >
          {group.name}
        </div>
      )}
    </>
  );
};

export default TaskGroup;
