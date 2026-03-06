import { Card, Form, Input, InputNumber, Button } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../../api/employees/getById";
import { update } from "../../api/employees/update";
import type { UpdateEmployee } from "../../types/employee";

export default function EditEmployee() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getById(Number(id)).then((res) => {
      form.setFieldsValue(res.data);
    });
  }, []);

  const onFinish = (values: UpdateEmployee) => {
    update(Number(id), values).then(() => {
      navigate("/");
    });
  };

  return (
    <Card title="Edit Employee" style={{ maxWidth: 500 }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="First Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="last_name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Position" name="position" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Salary" name="salary" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </Card>
  );
}