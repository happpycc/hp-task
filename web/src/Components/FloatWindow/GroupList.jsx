import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { DataContext } from "../../Contexts/DataContext";

export default function GroupList() {
  const {
    get_group,
    groups,
    setGroups,
    groupListMode,
    setGroupListMode,
    setGroupInputMode,
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
          className="border p-2 bg-blue-900 flex flex-col gap-1 overflow-y-scroll h-max-2/3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-1 gap-2">
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
                          setGroupInputMode(true);
                        }}
                      >
                        Edit
                      </button>
                      <button>Delete</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="border p-1 mx-1">Add</button>
        </div>
      </div>
    );
  else return <></>;
}
