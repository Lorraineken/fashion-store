class UsersController < ApplicationController
     
   def create 
    user = User.create!(user_params)
    if user.valid? 
        render json: user, status: :created
    else 
        render json:{error:"Invalid user detail"}, status: :unprocessable_entity

    end
   end

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
