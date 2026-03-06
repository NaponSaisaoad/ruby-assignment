import { Button, Layout, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { search } from "../../api/employees/search";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { remove } from "../../api/employees/remove";
interface Employee {
  id: number;
  name: string;
  last_name: string;
  position: string;
  salary: string;
}

export default function Search() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    search().then((res) => {
      setEmployees(res.data);
    });
  }, []);

  const onDelete = (id: number) => {
    remove(id).then(() => {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    });
  };

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
    {
      title: "Action",
      render: (_: unknown, record: Employee) => (
        <Space>
          <Button type="link" href={`/employees/detail/${record.id}`}>
            View
          </Button>
          <Button type="link" href={`/employees/${record.id}`}>
            Edit
          </Button>
          <Popconfirm
            title="Delete employee?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
        <Content style={{ padding: "40px 80px" }}>
          <Title level={2}>Employee</Title>
          <Table rowKey="id" dataSource={employees} columns={columns} />
          <Button type="primary" href="/create">
            Add Employee
          </Button>
        </Content>
      </Layout>
    </>
  );
}
