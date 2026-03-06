import { Card, Form, Input, InputNumber, Button } from "antd";
import { create } from "../../api/employees/create";
import { useNavigate } from "react-router-dom";
import type { CreateEmployee as CreateEmployeeForm } from "../../types/employee";

export default function Create() {
  const navigate = useNavigate();

  const onFinish = (values: CreateEmployeeForm) => {
    create(values).then(() => {
      navigate("/");
    });
  };

  return (
    <Card title="Create Employee" style={{ maxWidth: 500 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="First Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Position"
          name="position"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Salary" name="salary" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </Card>
  );
}
