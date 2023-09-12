import Task from "./Task/Components/Task";
import axios from "axios";
import { TaskContextProvider } from "./Task/Contexts/TaskContext";

const App = () => {
  axios.defaults.baseURL = "http://192.168.1.11:5556";
  return (
    <TaskContextProvider>
      <Task />
    </TaskContextProvider>
  );
};

export default App;
