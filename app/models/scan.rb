class Scan < ActiveRecord::Base
  belongs_to :specimen

  validates :specimen, presence: true
  validates :status, inclusion: { in: ['uploading', 'uploaded'] }

  serializes :images

  after_initialize :ensure_defaults

  def ensure_defaults
    self.status = 'uploading'
  end
end
