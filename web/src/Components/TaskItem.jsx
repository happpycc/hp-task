const TaskItem = ({ index, task }) => {
  return (
    <div className="w-full">
      {index}.{task.content}
    </div>
  );
};

export default TaskItem;
