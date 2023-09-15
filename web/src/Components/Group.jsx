import { useContext } from "react";
import { DataContext } from "../Contexts/DataContext";

const TaskGroup = () => {
  const { group, groups, setGroupListMode, setGroupInputMode } =
    useContext(DataContext);
  return (
    <>
      {groups.length === 0 && <div>Empty</div>}
      {groups.length !== 0 && (
        <div className="flex">
          <div
            onClick={() => setGroupListMode(true)}
            className="bg-blue-300 mx-2 mt-2 rounded-lg border-black p-2 w-full"
          >
            {group.name}
          </div>
        </div>
      )}
    </>
  );
};

export default TaskGroup;
