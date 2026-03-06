import "./App.css";
import Employee from "./pages/Employee";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateEmployee from "./pages/CreateEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Employee />} />
        <Route path="/create" element={<CreateEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
