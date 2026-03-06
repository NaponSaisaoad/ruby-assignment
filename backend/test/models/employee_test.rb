# == Schema Information
#
# Table name: employees
#
#  id         :bigint           not null, primary key
#  last_name  :text
#  name       :text
#  position   :text
#  salary     :decimal(, )
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class EmployeeTest < ActiveSupport::TestCase

  def setup
    @employee = Employee.create!(
      name: "Napon",
      last_name: "Saisaoad",
      position: "Developer",
      salary: 54000
    )
  end

  test "calculate working days" do
    @employee.attendances.create!(
      check_in: Time.new(2026,3,1,9,0,0),
      check_out: Time.new(2026,3,1,18,0,0)
    )

    @employee.attendances.create!(
      check_in: Time.new(2026,3,2,9,0,0),
      check_out: Time.new(2026,3,2,18,0,0)
    )

    assert_equal 2, @employee.working_days
  end


  test "calculate ot hours when working more than 8 hours" do
    @employee.attendances.create!(
      check_in: Time.new(2026,3,1,9,0,0),
      check_out: Time.new(2026,3,1,19,0,0)
    )

    assert_equal 2, @employee.ot_hours.round
  end


  test "no ot when working less than or equal to 8 hours" do
    @employee.attendances.create!(
      check_in: Time.new(2026,3,1,9,0,0),
      check_out: Time.new(2026,3,1,17,0,0)
    )

    assert_equal 0, @employee.ot_hours
  end

  test "tax is zero when salary less than or equal to 30000" do
    employee = Employee.create!(
      name: "Test",
      last_name: "User",
      position: "Dev",
      salary: 25000
    )

    assert_equal 0, employee.tax
  end


  test "tax calculation for salary between 30001 and 50000" do
    employee = Employee.create!(
      name: "Test",
      last_name: "User",
      position: "Dev",
      salary: 40000
    )

    expected_tax = (40000 - 30000) * 0.05

    assert_in_delta expected_tax, employee.tax, 0.01
  end


  test "tax calculation for salary above 50000" do
    expected_tax = (20000 * 0.05) + (4000 * 0.10)

    assert_in_delta expected_tax, @employee.tax, 0.01
  end

  test "no attendance results in zero working days and ot pay" do
    employee = Employee.create!(
      name: "No",
      last_name: "Attendance",
      position: "Tester",
      salary: 40000
    )

    assert_equal 0, employee.working_days
    assert_equal 0, employee.ot_hours
    assert_equal 0, employee.ot_pay
  end

end