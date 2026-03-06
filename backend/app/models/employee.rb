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
end