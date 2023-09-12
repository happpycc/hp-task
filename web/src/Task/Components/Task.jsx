import TaskGroup from "./TaskGroup";
import TaskList from "./TaskList";
import GroupList from "./GroupList";
import InputWindow from "./InputWindow";

const Task = () => {
  return (
    <div className="h-screen flex justify-center items-center font-zpix">
      <div className="flex flex-col h-full w-full bg-[#222831] justify-between gap-2">
        <GroupList />
        <InputWindow />
        <TaskGroup />
        <TaskList />
      </div>
    </div>
  );
};

export default Task;
