import { useContext } from "react";
import { createContext } from "react";
import { GroupContext } from "./GroupContext";
import { useState } from "react";
import axios from "axios";

export const TaskContext = createContext({});

export function TaskContextProvider({ children }) {
  const { group, setGroup, setGroups } = useContext(GroupContext);
  const [taskClick, setTaskClick] = useState({
    id: "",
    content: "",
  });
  const [taskUpdateText, setUpdateText] = useState("");
  const add_task = async () => {
    await axios
      .post(`/task/${group._id}`, {
        content: taskClick.content,
        position: group.tasks.length,
      })
      .then((res) => {
        if (res.status === 200) {
          setGroup((_group) => {
            _group.tasks.push(res.data);
            return { ..._group };
          });
          setGroups((_groups) => {
            _groups = _groups.filter((_group) => _group._id !== group._id);
            const _group = group;
            _group.tasks = undefined;
            return [_group, ..._groups];
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

        taskClick,
        setTaskClick,

        taskUpdateText,
        setUpdateText,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
