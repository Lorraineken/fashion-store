class UsersController < ApplicationController
    before_action :authorize_admin
    skip_before_action :authorize_admin, only: [:show, :update]
    before_action :authorize

   def index 
    user =User.all 
    render json: user, status: :ok
   end

   def show 
    user = User.find(session[:user_id])
    render json: user, status: :ok
   end

   def update 
    user =User.find(params[:id])
    user.update!(user_params)
    render json: user, status: :accepted
   end

   def destroy 
    user =User.find(params[:id])
    user.destroy 
    head :no_content
   end

   private

   def user_params 
    params.permit(:username, :password, :email)
   end

end
