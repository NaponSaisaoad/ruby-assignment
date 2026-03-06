# == Schema Information
#
# Table name: attendances
#
#  id          :bigint           not null, primary key
#  check_in    :datetime
#  check_out   :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  employee_id :bigint           not null
#
# Indexes
#
#  index_attendances_on_employee_id  (employee_id)
#
# Foreign Keys
#
#  fk_rails_...  (employee_id => employees.id)
#
class Attendance < ApplicationRecord
  belongs_to :employee

  validates :check_in, presence: true
  validates :check_out, presence: true

  validate :check_out_after_check_in
  validate :one_attendance_per_day
end
