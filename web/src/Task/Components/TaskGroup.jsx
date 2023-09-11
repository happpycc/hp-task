import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";

const TaskGroup = () => {
  const { group, groups } = useContext(TaskContext);
  return (
    <>
      {groups.length === 0 && <div>Empty</div>}
      {groups.length !== 0 && (
        <div className="bg-blue-300 mx-2 mt-2 rounded-lg p-2">{group.name}</div>
      )}
    </>
  );
};

export default TaskGroup;
