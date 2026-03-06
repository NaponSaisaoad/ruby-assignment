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

  validate :check_out_after_check_in

  def working_hours
    return 0 unless check_out
    ((check_out - check_in) / 1.hour)
  end

  def ot_hours
    [working_hours - 8, 0].max
  end

  private

  def check_out_after_check_in
    if check_out.present? && check_out <= check_in
      errors.add(:check_out, "must be after check in")
    end
  end
end