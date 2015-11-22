class Specimen < ActiveRecord::Base
  has_many :scans
  has_many :rendered_assets

  validates :institutional_id, uniqueness: true, allow_nil: true
  validates :status, inclusion: { in: ['uploading', 'uploaded'] }

  after_initialize :ensure_defaults

  def ensure_defaults
    self.status = 'uploading'
  end
end
