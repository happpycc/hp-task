import Group from "./Group";
import TaskList from "./TaskList";
import GroupList from "./FloatWindow/GroupList";
import GroupInput from "./FloatWindow/GroupInput";
import TaskInput from "./FloatWindow/TaskInput";
import TaskEdit from "./FloatWindow/TaskEdit";

const Task = () => {
  return (
    <div className="h-screen flex justify-center items-center font-zpix text-2xl">
      <GroupList />
      <GroupInput />
      <TaskInput />
      <TaskEdit />
      <div className="flex flex-col h-full w-full bg-[#222831] justify-between gap-2">
        <Group />
        <TaskList />
      </div>
    </div>
  );
};

export default Task;
