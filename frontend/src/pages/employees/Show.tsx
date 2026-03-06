import { useEffect, useState } from "react";
import { Card, Descriptions } from "antd";
import { useParams } from "react-router-dom";
import { getById } from "../../api/employees/getById";
import type { Employee } from "../../types/employee";

export default function Show() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);

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

  if (!employee) return <div>...</div>;

  return (
    <Card title="Employee Detail">
      <Descriptions column={1}>
        <Descriptions.Item label="Name">{employee.name}</Descriptions.Item>

        <Descriptions.Item label="Position">
          {employee.position}
        </Descriptions.Item>

        <Descriptions.Item label="Salary">{employee.salary}</Descriptions.Item>
      </Descriptions>

      <Card title="Payroll Summary" style={{ marginTop: 20 }}>
        <p>Working Days: -</p>
        <p>OT Hours: -</p>
        <p>OT Pay: -</p>
        <p>Tax: -</p>
        <p>Net Pay: -</p>
      </Card>
      <Card title="Attendance" style={{ marginTop: 20 }}>
        {employee.attendances?.map((a) => (
          <p key={a.id}>
            Check In: {a.check_in} | Check Out: {a.check_out}
          </p>
        ))}
      </Card>
    </Card>
  );
}
