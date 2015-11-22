class CreateSpecimen < ActiveRecord::Migration
  def change
    create_table :specimen do |t|
      t.string :name
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
      t.string :specimen_number
      t.string :scientific_name
      t.string :common_name
      t.string :bone_type
      t.string :author

      t.timestamps null: false
    end
  end
end
