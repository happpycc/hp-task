import Group from "./Group";
import TaskList from "./TaskList";
import GroupList from "./FloatWindow/GroupList";
import GroupInput from "./FloatWindow/GroupInput";
import TaskInput from "./FloatWindow/TaskInput";

const Task = () => {
  return (
    <div className="h-screen flex justify-center items-center font-zpix">
      <GroupList />
      <GroupInput />
      <TaskInput />
      <div className="flex flex-col h-full w-full bg-[#222831] justify-between gap-2">
        <Group />
        <TaskList />
      </div>
    </div>
  );
};

export default Task;
