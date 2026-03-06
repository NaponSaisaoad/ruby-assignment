import { Table } from "antd";
import { useEffect, useState } from "react";
import { getEmployees } from "../api/empolyee/getEmployees";

interface Employee {
  id: number;
  name: string;
  last_name: string;
  position: string;
  salary: string;
}

export default function Employee() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    getEmployees().then((res) => {
      setEmployees(res.data);
    });
  }, []);

  const columns = [
    {
      title: "Name",
      render: (record: Employee) => `${record.name} ${record.last_name}`,
    },
    {
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Salary",
      dataIndex: "salary",
    },
  ];

  return <Table rowKey="id" dataSource={employees} columns={columns} />;
}