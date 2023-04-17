class UsersController < ApplicationController
     
   def create 
    user = User.create!(user_params)
    if user.valid? 
        render json: user, status: :created
    else 
        render json:{error:"Invalid user detail"}, status: :unprocessable_entity

    end
   end

end
