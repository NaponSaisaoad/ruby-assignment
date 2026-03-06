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
require "test_helper"

class AttendanceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
