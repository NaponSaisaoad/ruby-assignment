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
  validate :one_check_in_per_day
  validate :check_out_after_check_in

  def working_hours
    return 0 unless check_out
    (check_out - check_in) / 1.hour
  end

  def ot_hours
    [working_hours - 8, 0].max
  end

  private

  def one_check_in_per_day
    return unless check_in

    existing = employee.attendances
      .where(check_in: check_in.beginning_of_day..check_in.end_of_day)
      .where.not(id: id)

    if existing.exists?
      errors.add(:check_in, "employee already checked in today")
    end
  end

  def check_out_after_check_in
    return unless check_out

    if check_out <= check_in
      errors.add(:check_out, "must be after check in")
    end
  end
end