import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { GroupContext } from "../../Contexts/GroupContext";
import { ModeContext } from "../../Contexts/ModeContext";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

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
  if (groupListMode)
    return (
      <div
        className="absolute right-0 left-0 bottom-0 top-0 m-auto w-full h-full bg-transparent flex justify-center items-center"
        onClick={() =>
          show_window({
            group_list: false,
            group_input: false,
            task_input: false,
            task_edit: false,
          })
        }
      >
        <div
          className="p-3 bg-[#321F28] flex flex-col gap-1 h-2/3 w-3/4 justify-between rounded-lg items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-2 overflow-y-scroll no-scrollbar w-full">
            {groups.map((group) => {
              return (
                <div key={group._id} className="p-2 rounded-lg bg-[#B4A5A5]">
                  <div className="flex gap-1 justify-between">
                    <div
                      className="mr-3 text-[#5C3D2E] overflow-x-auto"
                      onClick={async () => {
                        await get_group(group._id);
                        localStorage.setItem("group_id", group._id);
                        show_window({
                          group_list: false,
                          group_input: false,
                          task_input: false,
                          task_edit: false,
                        });
                      }}
                    >
                      {group.name}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setGroupClick({ name: group.name, _id: group._id });
                          setGroupHandleMode(false);
                          show_window({
                            group_list: false,
                            group_input: true,
                            task_input: false,
                            task_edit: false,
                          });
                        }}
                      >
                        <PencilSquareIcon className="w-6 h-6" />
                      </button>
                      <button onClick={() => delete_group(group._id)}>
                        <TrashIcon className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="border rounded-lg w-full p-1"
            onClick={() => {
              setGroupClick({ name: "", _id: "" });
              setGroupHandleMode(true);
              show_window({
                group_list: false,
                group_input: true,
                task_input: false,
                task_edit: false,
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
