import { Button, Layout, Table } from "antd";
import { useEffect, useState } from "react";
import { get } from "../api/employee/get";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
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
    get().then((res) => {
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

  return (
    <>
      <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
        <Content style={{ padding: "40px 80px" }}>
          <Title level={2}>Employee List</Title>
          <Table rowKey="id" dataSource={employees} columns={columns} />
          <Button type="primary" href="/create">
            Add Employee
          </Button>
        </Content>
      </Layout>
    </>
  );
}
