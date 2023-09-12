import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { TaskContext } from "../Contexts/TaskContext";

export default function GroupList() {
  const { get_group, groups, setGroups, groupLHidden, setGroupLHidden } =
    useContext(TaskContext);
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
  }, [groupLHidden]);
  if (groupLHidden)
    return (
      <div
        className="absolute right-0 left-0 bottom-0 top-0 m-auto w-full h-full bg-transparent flex justify-center items-center"
        onClick={() => {
          setGroupLHidden(false);
        }}
      >
        <div
          className="border p-2 overflow-y-scroll no-scrollbar h-max-2/3 w-auto bg-blue-900"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col p-1 gap-2">
            {groups.map((group) => {
              return (
                <li
                  key={group._id}
                  className="border p-1"
                  onClick={async () => {
                    await get_group(group._id);
                    setGroupLHidden(false);
                  }}
                >
                  {group.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  else return <></>;
}
