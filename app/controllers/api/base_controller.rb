class Api::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token

  def render_validation_errors(model)
    render json: model.errors, status: 422
  end

  def render_not_found
    render json: { errors: 'not found' }, status: 404
  end
end
