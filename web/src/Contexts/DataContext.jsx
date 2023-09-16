import axios from "axios";
import { useState, useEffect } from "react";
import { createContext } from "react";

export const DataContext = createContext({});

export function DataContextProvider({ children }) {
  const [group, setGroup] = useState({ name: "", tasks: [] });
  const [groups, setGroups] = useState([]);
  const [groupHandleMode, setGroupHandleMode] = useState(false); // true ===> POST; false ===> PUT
  const [groupInput, setGroupInput] = useState("");
  const [groupInputMode, setGroupInputMode] = useState(false);
  const [taskInputMode, setTaskInputMode] = useState(false);
  const [groupListMode, setGroupListMode] = useState(false);
  const get_group = async (_id) => {
    await axios
      .get(`/group/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          setGroup(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const add_group = async () => {
    await axios
      .post("/group", { name: groupInput })
      .then((res) => {
        if (res.status === 200) {
          setGroup(res.data);
          setGroups((groups) => [res.data, ...groups]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const update_group = async () => {
    await axios
      .put(`/group/`, { name: groupInput })
      .then((res) => {
        if (res.status === 200) {
          setGroup((_group) => {
            _group.name = res.data.name;
            _group.update_time = res.data.update_time;
            setGroups((_groups) => {
              _groups = _groups.filter((__group) => __group._id !== _group._id);
              const __group = _group;
              delete __group.tasks;
              return [__group, _groups];
            });
            return _group;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const delete_group = async (_id) => {
    await axios
      .delete(`/group/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          setGroups((_groups) => {
            _groups = _groups.filter((_group) => _group._id !== _id);
            if (_id === group._id) {
              _groups.length !== 0 && get_group(_groups[0]._id);
            }
            return _groups;
          });
          setGroupListMode(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("/groups")
      .then((res) => {
        if (res.status === 200) {
          setGroups(res.data);
          const local_group_id = localStorage.getItem("group_id");
          if (
            res.data.find((group) => {
              return group._id === local_group_id;
            }) !== undefined
          ) {
            get_group(local_group_id);
          } else if (res.data.length !== 0) {
            get_group(res.data[0]._id);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DataContext.Provider
      value={{
        groupInput,
        setGroupInput,
        groupHandleMode,
        setGroupHandleMode,
        group,
        setGroup,
        groups,
        setGroups,
        get_group,
        add_group,
        delete_group,
        groupListMode,
        setGroupListMode,
        groupInputMode,
        setGroupInputMode,
        taskInputMode,
        setTaskInputMode,
        update_group,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
