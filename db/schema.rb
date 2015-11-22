# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151122023346) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "rendered_assets", force: :cascade do |t|
    t.integer  "specimen_id_id"
    t.string   "uri"
    t.string   "name"
    t.string   "type"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "scans", force: :cascade do |t|
    t.integer  "specimen_id_id"
    t.string   "preview_uri"
    t.text     "images"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "specimen", force: :cascade do |t|
    t.string   "name"
    t.datetime "scanned_at"
    t.float    "geometry_voxel_y"
    t.float    "geometry_voxel_x"
    t.integer  "xray_voltage"
    t.integer  "xray_current"
    t.integer  "ct_number_images"
    t.integer  "calib_averaging"
    t.integer  "calib_num_image"
    t.integer  "calib_skip"
    t.integer  "detector_timing_value"
    t.string   "specimen_number"
    t.string   "scientific_name"
    t.string   "common_name"
    t.string   "bone_type"
    t.string   "author"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

end
