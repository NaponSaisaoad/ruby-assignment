import { useEffect, useState } from "react";
import { Card, Descriptions, Table, Button, Space } from "antd";
import { useParams } from "react-router-dom";
import { getById } from "../../api/employees/getById";
import { create } from "../../api/attendances/create";
import { update } from "../../api/attendances/update";
import type { Employee } from "../../types/employee";
import type { Attendance } from "../../types/attendance";
import { message } from "antd";

export default function Show() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);

  const formatAttendances = (attendances: Attendance[]) =>
    attendances.map((attendance) => ({
      ...attendance,
      check_in: new Date(attendance.check_in).toLocaleString(),
      check_out: attendance.check_out
        ? new Date(attendance.check_out).toLocaleString()
        : null,
    }));

  const reloadEmployee = async () => {
    try {
      const res = await getById(Number(id));
      setEmployee({
        ...res.data,
        attendances: formatAttendances(res.data.attendances),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await getById(Number(id));
        setEmployee({
          ...res.data,
          attendances: formatAttendances(res.data.attendances),
        });
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
                try {
                  await update(record.id, {
                    check_out: new Date().toISOString(),
                  });

                  message.success("Check-out success");
                  reloadEmployee();
                } catch (error: any) {
                  message.error(
                    error?.response?.data?.check_out?.[0] || "Check-out failed",
                  );
                }
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
          {employee.name} {employee.last_name}
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
              try {
                await create({
                  employee_id: employee.id,
                  check_in: new Date().toISOString(),
                });

                message.success("Check-in success");
                reloadEmployee();
              } catch (error: any) {
                message.error(
                  error?.response?.data?.check_in?.[0] ||
                    error?.response?.data?.employee?.[0] ||
                    "Check-in failed",
                );
              }
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
        <Button type="primary" href="/" style={{ marginTop: 16 }}>
          Back
        </Button>
      </Card>
    </Card>
  );
}
