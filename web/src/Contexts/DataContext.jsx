import axios from "axios";
import { useState, useEffect } from "react";
import { createContext } from "react";

export const DataContext = createContext({});

export function DataContextProvider({ children }) {
  const [group, setGroup] = useState({ name: "", tasks: [] });
  const [groups, setGroups] = useState([]);
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
        group,
        setGroup,
        groups,
        setGroups,
        get_group,
        groupListMode,
        setGroupListMode,
        groupInputMode,
        setGroupInputMode,
        taskInputMode,
        setTaskInputMode,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
