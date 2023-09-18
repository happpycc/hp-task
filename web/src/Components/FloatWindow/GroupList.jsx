import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { GroupContext } from "../../Contexts/GroupContext";
import { ModeContext } from "../../Contexts/ModeContext";

export default function GroupList() {
  const { setGroupClick, groups, setGroups, get_group, delete_group } =
    useContext(GroupContext);
  const { groupListMode, setGroupHandleMode, show_window } =
    useContext(ModeContext);
  useEffect(() => {
    axios
      .get("/groups")
      .then((res) => {
        if (res.status === 200) {
          setGroups(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [groupListMode]);
  useEffect(() => {
    groups.length === 0 &&
      show_window({
        group_list: false,
        group_input: false,
        task_input: false,
      });
  }, [groups]);
  if (groupListMode)
    return (
      <div
        className="absolute right-0 left-0 bottom-0 top-0 m-auto w-full h-full bg-transparent flex justify-center items-center"
        onClick={() =>
          show_window({
            group_list: false,
            group_input: false,
            task_input: false,
          })
        }
      >
        <div
          className="border p-2 bg-blue-900 flex flex-col gap-1 h-2/3 justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-1 gap-2 overflow-y-scroll no-scrollbar">
            {groups.map((group) => {
              return (
                <div key={group._id} className="border p-1">
                  <div className="flex gap-1 justify-between">
                    <div
                      onClick={async () => {
                        await get_group(group._id);
                        localStorage.setItem("group_id", group._id);
                        show_window({
                          group_list: false,
                          group_input: false,
                          task_input: false,
                        });
                      }}
                    >
                      {group.name}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          console.log(group._id);
                          setGroupClick({ name: group.name, _id: group._id });
                          setGroupHandleMode(false);
                          show_window({
                            group_list: false,
                            group_input: true,
                            task_input: false,
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => delete_group(group._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="border p-1 mx-1"
            onClick={() => {
              setGroupClick({ name: "", _id: "" });
              setGroupHandleMode(true);
              show_window({
                group_list: false,
                group_input: true,
                task_input: false,
              });
            }}
          >
            Add
          </button>
        </div>
      </div>
    );
  else return <></>;
}
