# == Schema Information
#
# Table name: attendances
#
#  id          :integer          not null, primary key
#  check_in    :datetime
#  check_out   :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  employee_id :integer          not null
#
# Indexes
#
#  index_attendances_on_employee_id  (employee_id)
#
# Foreign Keys
#
#  employee_id  (employee_id => employees.id)
#
class Attendance < ApplicationRecord
  belongs_to :employee
end
