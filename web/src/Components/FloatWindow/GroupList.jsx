import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { DataContext } from "../../Contexts/DataContext";

export default function GroupList() {
  const {
    setGroupInput,
    get_group,
    delete_group,
    groups,
    setGroups,
    groupListMode,
    setGroupListMode,
    setGroupInputMode,
    setGroupHandleMode,
  } = useContext(DataContext);
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
        onClick={() => {
          setGroupListMode(false);
        }}
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
                        setGroupListMode(false);
                      }}
                    >
                      {group.name}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setGroupListMode(false);
                          setGroupInput(group.name);
                          setGroupHandleMode(false);
                          setGroupInputMode(true);
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
              setGroupListMode(false);
              setGroupInput("");
              setGroupHandleMode(true);
              setGroupInputMode(true);
            }}
          >
            Add
          </button>
        </div>
      </div>
    );
  else return <></>;
}
