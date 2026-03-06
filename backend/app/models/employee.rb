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
class Employee < ApplicationRecord
  has_many :attendances, dependent: :destroy

  validates :name, presence: true
  validates :last_name, presence: true
  validates :position, presence: true
  validates :salary, presence: true, numericality: { greater_than_or_equal_to: 0 }

  def full_name
    "#{name} #{last_name}"
  end

  # จำนวนวันทำงาน
  def working_days
    attendances.count
  end

  # OT ชั่วโมง
  def ot_hours
    attendances.sum do |attendance|
      next 0 unless attendance.check_out

      hours = (attendance.check_out - attendance.check_in) / 1.hour
      [hours - 8, 0].max
    end
  end

  # OT Pay
  def ot_pay
    ot_hours * (salary.to_f / 30 / 8)
  end

  # ภาษีแบบขั้นบันได
  def tax
    base = salary.to_f

    if base <= 30000
      0
    elsif base <= 50000
      (base - 30000) * 0.05
    else
      (20000 * 0.05) + ((base - 50000) * 0.10)
    end
  end

  # เงินสุทธิ
  def net_pay
    salary.to_f + ot_pay - tax
  end
end