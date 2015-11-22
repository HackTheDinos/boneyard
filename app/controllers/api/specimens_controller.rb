class Api::SpecimensController < Api::BaseController
  before_action :set_specimen, only: [:show, :update]

  def index
    @specimens = Specimen.where(where_params)
    render json: @specimens
  end

  def show
    render json: @specimen
  end

  def update
    success = @specimen.update_attributes(update_params)
    return render_validation_errors(@specimen) unless success
    render json: @specimen
  end

  def create
    @specimen = Specimen.create(update_params)
    return render_validation_errors(@specimen) unless @specimen.valid?
    render json: @specimen
  end

  private

  def set_specimen
    @specimen = Specimen.find_by(id: params[:id])
    render_not_found unless @specimen
  end

  def update_params
    params.permit(:status).merge(where_params)
  end

  def create_params
    params.permit(:images, :preview_uri)
  end

  def where_params
    params.permit(
      :specimenned_at,
      :geometry_voxel_y,
      :geometry_voxel_x,
      :xray_voltage,
      :xray_current,
      :ct_number_images,
      :calib_averaging,
      :calib_num_image,
      :calib_skip,
      :detector_timing_value,
      :institutional_id,
      :scientific_name,
      :common_name,
      :bone_type,
      :author
    )
  end
end
