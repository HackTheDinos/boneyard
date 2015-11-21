class SpecimensController < ApplicationController
  def index
    render json: [{ id: 1, tiffs: ['data'] }]
  end
end
