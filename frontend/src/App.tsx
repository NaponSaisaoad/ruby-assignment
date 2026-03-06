import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/employees/Create";
import Search from "./pages/employees/Search";
import Update from "./pages/employees/Update";
import Show from "./pages/employees/Show";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/employees/:id" element={<Update />} />
        <Route path="/employees/detail/:id" element={<Show />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
