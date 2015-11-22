class CreateSpecimens < ActiveRecord::Migration
  def change
    create_table :specimens do |t|
      t.string :name
      # PCA DATA
      t.timestamp :scanned_at
      t.float :geometry_voxel_y
      t.float :geometry_voxel_x
      t.integer :xray_voltage
      t.integer :xray_current
      t.integer :ct_number_images
      t.integer :calib_averaging
      t.integer :calib_num_image
      t.integer :calib_skip
      t.integer :detector_timing_value

      t.string :institutional_id
      t.string :scientific_name
      t.string :common_name
      t.string :bone_type
      t.string :author
      t.string :status, null: false, default: 'uploading'

      t.timestamps null: false
    end
  end
end
