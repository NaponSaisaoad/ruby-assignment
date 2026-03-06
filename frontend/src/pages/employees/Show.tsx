import { useEffect, useState } from "react";
import { Card, Descriptions, Table, Button, Space } from "antd";
import { useParams } from "react-router-dom";
import { getById } from "../../api/employees/getById";
import { create } from "../../api/attendances/create";
import { update } from "../../api/attendances/update";
import type { Employee } from "../../types/employee";
import type { Attendance } from "../../types/attendance";

export default function Show() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);

  const reloadEmployee = async () => {
    try {
      const res = await getById(Number(id));
      setEmployee(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await getById(Number(id));
        setEmployee(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  const columns = [
    {
      title: "Check In",
      dataIndex: "check_in",
    },
    {
      title: "Check Out",
      dataIndex: "check_out",
      render: (value: string | null) => value || "-",
    },
    {
      title: "Action",
      render: (_: unknown, record: Attendance) => (
        <Space>
          {!record.check_out && (
            <Button
              size="small"
              onClick={async () => {
                await update(record.id, {
                  check_out: new Date().toISOString(),
                });

                reloadEmployee();
              }}
            >
              Check Out
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card title="Employee Detail">
      <Descriptions column={1}>
        <Descriptions.Item label="Name">
          {employee.full_name}
        </Descriptions.Item>

        <Descriptions.Item label="Position">
          {employee.position}
        </Descriptions.Item>

        <Descriptions.Item label="Salary">{employee.salary}</Descriptions.Item>
      </Descriptions>

      <Card title="Payroll Summary" style={{ marginTop: 20 }}>
        <p>Working Days: {employee.payroll?.working_days ?? "-"}</p>
        <p>OT Hours: {employee.payroll?.ot_hours ?? "-"}</p>
        <p>OT Pay: {employee.payroll?.ot_pay ?? "-"}</p>
        <p>Tax: {employee.payroll?.tax ?? "-"}</p>
        <p>Net Pay: {employee.payroll?.net_pay ?? "-"}</p>
      </Card>

      <Card
        title="Attendance"
        style={{ marginTop: 20 }}
        extra={
          <Button
            type="primary"
            onClick={async () => {
              await create({
                employee_id: employee.id,
                check_in: new Date().toISOString(),
              });

              reloadEmployee();
            }}
          >
            Check In
          </Button>
        }
      >
        <Table
          rowKey="id"
          dataSource={employee.attendances}
          columns={columns}
          pagination={false}
        />
      </Card>
    </Card>
  );
}
