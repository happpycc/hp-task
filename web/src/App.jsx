import Layout from "./Components/Layout";
import axios from "axios";
import { DataContextProvider } from "./Contexts/DataContext";

const App = () => {
  axios.defaults.baseURL = "http://192.168.1.11:5556";
  return (
    <DataContextProvider>
      <Layout />
    </DataContextProvider>
  );
};

export default App;
