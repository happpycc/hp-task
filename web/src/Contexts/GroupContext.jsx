import axios from "axios";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { ModeContext } from "./ModeContext";

export const GroupContext = createContext({});

export function GroupContextProvider({ children }) {
  const [group, setGroup] = useState({ name: "", tasks: [] });
  const [groups, setGroups] = useState([]);
  const [groupClick, setGroupClick] = useState({ name: "", _id: "" });
  const { show_window } = useContext(ModeContext);
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
      .post("/group", { name: groupClick.name })
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
      .put(`/group/${groupClick._id}`, { name: groupClick.name })
      .then((res) => {
        if (res.status === 200) {
          setGroup((_group) => {
            _group.name = res.data.name;
            _group.update_time = res.data.update_time;
            return _group;
          });
          setGroups((_groups) => {
            _groups = _groups.filter((_group) => _group._id !== groupClick._id);
            return [res.data, ..._groups];
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
    <GroupContext.Provider
      value={{
        group,
        setGroup,
        groups,
        setGroups,

        groupClick,
        setGroupClick,

        get_group,
        add_group,
        delete_group,
        update_group,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}
