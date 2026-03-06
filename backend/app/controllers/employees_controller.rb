class EmployeesController < ApplicationController
  def index
    employees = Employee.all
    render json: employees
  end

  private

  def employee_params
    params.require(:employee).permit(:name, :salary, :position)
  end
end