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
    index: 0,
  });
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
  const delete_task = async () => {
    await axios.delete(`task/${group._id}/${taskClick.id}`).then((res) => {
      if (res.status === 200) {
        setGroup((_group) => {
          _group.tasks = _group.tasks.filter(
            (task) => task._id !== taskClick.id,
          );
          return { ..._group, update_time: res.data.update_time };
        });
        update_groups(res.data.update_time);
      }
    });
  };
  const update_content = async () => {
    await axios
      .put(`/task/content/${group._id}`, {
        content: taskClick.content,
        id: taskClick.id,
      })
      .then((res) => {
        setGroup((_group) => {
          _group.tasks[taskClick.index].content = res.data.content;
          _group.tasks[taskClick.index].update_time = res.data.update_time;
          _group.update_time = res.data.update_time;
          return { ..._group };
        });
        update_groups(res.data.update_time);
      });
  };
  const update_state = async (index, state, id) => {
    await axios.put(`/task/state/${group._id}`, { id, state }).then((res) => {
      setGroup((_group) => {
        _group.tasks[index].state = state;
        _group.tasks[index].update_time = res.data;
        _group.update_time = res.data;
        return { ..._group };
      });
      update_groups(res.data);
    });
  };
  const update_position = async (old_index, new_index, id) => {
    await axios
      .put(`/task/position/${group._id}`, {
        id: id,
        position: new_index,
      })
      .then((res) => {
        if (res.status === 200) {
          setGroup((_group) => {
            let tasks = [..._group.tasks];
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
        get_task,
        add_task,
        delete_task,
        update_content,
        update_state,
        update_position,

        taskClick,
        setTaskClick,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
