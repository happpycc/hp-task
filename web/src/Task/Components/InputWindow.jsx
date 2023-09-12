import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";

export default function InputWindow() {
  const { inputWHidden, setInputWHidden } = useContext(TaskContext);
  if (inputWHidden)
    return (
      <div
        className="absolute right-0 left-0 bottom-0 top-0 m-auto w-full h-full bg-transparent flex justify-center items-center"
        onClick={() => {
          setInputWHidden(false);
        }}
      >
        <div
          className="border p-2 overflow-y-scroll no-scrollbar h-max-2/3 w-auto bg-blue-900"
          onClick={(e) => e.stopPropagation()}
        >
          <textarea></textarea>
        </div>
      </div>
    );
  else return <></>;
}
