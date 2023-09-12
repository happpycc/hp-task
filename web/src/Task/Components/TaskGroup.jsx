import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";

const TaskGroup = () => {
  const { group, groups, setGroupLHidden, setInputWHidden } =
    useContext(TaskContext);
  return (
    <>
      {groups.length === 0 && <div>Empty</div>}
      {groups.length !== 0 && (
        <div className="flex">
          <div
            onClick={() => setGroupLHidden(true)}
            className="bg-blue-300 ml-2 mt-2 rounded-l-lg border-r border-black p-2 w-full"
          >
            {group.name}
          </div>
          <div className="flex bg-blue-300 mr-2 mt-2 rounded-r-lg p-2 gap-2">
            <button onClick={() => setInputWHidden(true)}>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskGroup;
