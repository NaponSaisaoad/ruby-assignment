class EmployeesController < ApplicationController
  def index
    employees = Employee.all
    render json: employees
  end

  def show
    employee = Employee.find(params[:id])
    render json: employee
  end

  def create
    employee = Employee.create!(employee_params)
    render json: employee
  end

  def update
    employee = Employee.find(params[:id])
    employee.update!(employee_params)
    render json: employee
  end

  private

  def employee_params
    params.require(:employee).permit(:name, :last_name, :position, :salary)
  end
end