import { useEffect } from 'react'
import './App.css'
import { getEmployees } from './api/empolyee/getEmployees';

function App() {

  useEffect(() => {
    getEmployees().then(res => {
      console.log(res.data);
    });
  }, []);

  return <h1>Payroll App</h1>;
}

export default App
