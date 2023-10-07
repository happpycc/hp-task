import Layout from "./Components/Layout";
import axios from "axios";
import { ModeContextProvider } from "./Contexts/ModeContext";
import { GroupContextProvider } from "./Contexts/GroupContext";
import { TaskContextProvider } from "./Contexts/TaskContext";

const App = () => {
  axios.defaults.baseURL = "https://happpy.cc/api/task";
  return (
    <ModeContextProvider>
      <GroupContextProvider>
        <TaskContextProvider>
          <Layout />
        </TaskContextProvider>
      </GroupContextProvider>
    </ModeContextProvider>
  );
};

export default App;
