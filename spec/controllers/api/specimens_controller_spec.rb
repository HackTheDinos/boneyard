require 'rails_helper'

RSpec.describe Api::SpecimensController, type: :controller do
  let(:json) { JSON.parse(response.body) }
  let(:specimen) { create(:specimen) }

  describe '#create' do
    it 'succeeds' do
      post :create, { }
      expect(response.status).to eq 200
    end

    it 'has status updating' do
      post :create, {  }
      expect(json['status']).to eq('uploading')
    end
  end

  describe '#update' do
    it 'succeeds' do
      put :update, { id: specimen.id, status: 'uploaded' }
      expect(response.status).to eq 200
    end
  end

  describe '#show' do
    it 'succeeds' do
      get :show, id: specimen.id
      expect(response.status).to eq 200
    end
  end
end
