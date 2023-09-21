import { useState } from "react";
import { createContext } from "react";

export const ModeContext = createContext({});

export function ModeContextProvider({ children }) {
  const [groupHandleMode, setGroupHandleMode] = useState(false); // true ===> POST; false ===> PUT
  const [taskHandleMode, setTaskHandleMode] = useState(false); // true ===> POST; false ===> PUT
  const [groupInputMode, setGroupInputMode] = useState(false);
  const [taskInputMode, setTaskInputMode] = useState(false);
  const [groupListMode, setGroupListMode] = useState(false);
  const show_window = ({ group_list, group_input, task_input }) => {
    setGroupListMode(group_list);
    setGroupInputMode(group_input);
    setTaskInputMode(task_input);
  };
  return (
    <ModeContext.Provider
      value={{
        show_window,

        groupHandleMode,
        setGroupHandleMode,
        groupInputMode,
        setGroupInputMode,
        taskInputMode,
        setTaskInputMode,
        groupListMode,
        setGroupListMode,

        taskHandleMode,
        setTaskHandleMode,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}
