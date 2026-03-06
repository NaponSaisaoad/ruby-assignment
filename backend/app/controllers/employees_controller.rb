class EmployeesController < ApplicationController

  before_action :set_employee, only: [:show, :update, :destroy]

  def index
  if params[:keyword].present?
    employees = Employee.where(
      "name ILIKE :q OR last_name ILIKE :q",
      q: "%#{params[:keyword]}%"
    )
  else
    employees = Employee.all
  end

    render json: employees
  end

  def show
    employee = Employee.includes(:attendances).find(params[:id])

    render json: {
      id: employee.id,
      name: employee.name,
      last_name: employee.last_name,
      position: employee.position,
      salary: employee.salary,
      attendances: employee.attendances,
      payroll: {
        working_days: employee.working_days,
        ot_hours: employee.ot_hours,
        ot_pay: employee.ot_pay,
        tax: employee.tax,
        net_pay: employee.net_pay
      }
  }
  end

  def create
    employee = Employee.new(employee_params)

    if employee.save
      render json: employee
    else
      render json: employee.errors, status: :unprocessable_entity
    end
  end

  def update
    if @employee.update(employee_params)
      render json: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @employee.destroy
    head :no_content
  end

  private

  def set_employee
    @employee = Employee.find(params[:id])
  end

  def employee_params
    params.require(:employee).permit(:name, :last_name, :position, :salary)
  end
end