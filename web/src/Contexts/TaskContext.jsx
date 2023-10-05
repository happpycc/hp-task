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
    position: 0,
  });
  const [taskUpdateText, setUpdateText] = useState("");
  const update_groups = (update_time) => {
    setGroups((_groups) => {
      _groups = _groups.filter((_group) => _group._id !== group._id);
      return [
        {
          ...group,
          tasks: undefined,
          update_time: update_time,
        },
        ..._groups,
      ];
    });
  };
  const add_task = async () => {
    await axios
      .post(`/task/${group._id}`, {
        content: taskClick.content,
        position: taskClick.position,
      })
      .then((res) => {
        if (res.status === 200) {
          setGroup((_group) => {
            _group.tasks.splice(taskClick.position, 0, res.data);
            return { ..._group, update_time: res.data.update_time };
          });
          update_groups(res.data.update_time);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const delete_task = () => {};
  const update_task = () => {};
  const update_position = async (old_index, new_index, id) => {
    await axios
      .put(`/task/position/${group._id}`, {
        id: id,
        position: new_index,
      })
      .then((res) => {
        if (res.status === 200) {
          setGroup((_group) => {
            let tasks = [...group.tasks];
            tasks[old_index] = tasks.splice(new_index, 1, tasks[old_index])[0];
            return { ..._group, update_time: res.data.update_time, tasks };
          });
          update_groups(res.data.update_time);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const get_task = () => {};
  return (
    <TaskContext.Provider
      value={{
        add_task,
        delete_task,
        update_task,
        update_position,
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
