class RolesController < ApplicationController
  before_action :authorize_admin

  rescue_from ActiveRecord::RecordNotFound, with: :role_record_missing
  rescue_from ActiveRecord::RecordInvalid, with: :validation_error

  def create
    role = Role.create!(role_params)
    if role.valid?
      render json: role, status: :created
    else
      render json: { error: "Invalid role detail" }, status: :unprocessable_entity
    end
  end
  
  def index
    role = Role.all
    render json: role, status: :ok
  end

  def show
    role = Role.find(params[:id])
    render json: role, status: :ok
  end

  def update
    role = Role.find(params[:id])
    role.update!(role_params)
    render json: role, status: :accepted
  end

  def destroy
    role = Role.find(params[:id])
    role.destroy
    head :no_content
  end

  private

  def role_params
    params.permit(:name)
  end

  def role_record_missing
    render json: { "error": "role not found" }, status: :not_found
  end

  def validation_error
    render json: { "errors": ["validation errors"] }, status: :unprocessable_entity
  end
end
