import Layout from "./Components/Layout";
import axios from "axios";
import { ModeContextProvider } from "./Contexts/ModeContext";
import { GroupContextProvider } from "./Contexts/GroupContext";
import { TaskContextProvider } from "./Contexts/TaskContext";

const App = () => {
  axios.defaults.baseURL = "http://192.168.1.11:5556";
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
