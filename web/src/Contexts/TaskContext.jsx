import { useContext } from "react";
import { createContext } from "react";
import { GroupContext } from "./GroupContext";

export const TaskContext = createContext({});

export function TaskContextProvider({ children }) {
  const { group } = useContext(GroupContext);
  const add_task = () => {};
  const delete_task = () => {};
  const update_task = () => {};
  const get_task = () => {};
  return (
    <TaskContext.Provider
      value={{
        add_task,
        delete_task,
        update_task,
        get_task,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
