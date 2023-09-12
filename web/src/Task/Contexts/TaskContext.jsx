import axios from "axios";
import { useState, useEffect } from "react";
import { createContext } from "react";

export const TaskContext = createContext({});

export function TaskContextProvider({ children }) {
  const [group, setGroup] = useState({ name: "", tasks: [] });
  const [groups, setGroups] = useState([]);
  const [groupLHidden, setGroupLHidden] = useState(false);
  const [inputWHidden, setInputWHidden] = useState(false);
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
          const local_group = localStorage.getItem("group");
          if (res.data.includes(local_group)) {
            get_group(local_group._id);
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
    <TaskContext.Provider
      value={{
        group,
        setGroup,
        groups,
        setGroups,
        groupLHidden,
        setGroupLHidden,
        get_group,
        inputWHidden,
        setInputWHidden,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
