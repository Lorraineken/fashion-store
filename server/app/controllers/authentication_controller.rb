# class AuthenticationController < ApplicationController
#   def create_account
#     user = User.create(create_params)
#     if user.valid?
#       create_user_session(user.id)
#       app_response(status_code: 201, message: "Account created successfully", body: user)
#     else
#       app_response(status_code: 422, message: "Invalid input", body: user.errors.full_messages)
#     end
#   end

#   def login_account
#     user = User.find_by(email: params[:email])
#     if user&.authenticate(params[:password])
#       token = JWT.encode({ user_id: user.id }, Rails.application.secrets.secret_key_base, 'HS256')
#       create_user_session(user.id, token)
#       # #check for admin
#       # role = user.roles.where(name: "admin").first
#       # if role.name == "admin"
#       #   session[:admin_user] = "admin"
#       # end
      
#       app_response(message: "Log in success", body: { user: user, token: token })
#     else
#       app_response(status_code: 401, message: "Invalid username or password")
#     end
#   end

#   def logout_account
#     delete_user_session
#     delete_admin_session
#     app_response(status_code: 200, message: "Log out successfully")
#   end
  
#   # Render 404 page for unmapped routes
#   def render_404
#     not_found
#   end

#   private

#   def create_params
#     params.permit(:username, :email, :password)
#   end

#   def create_user_session(user_id)
#     session[:user_id] ||= user_id
#     @current_user_token = token
#   end

#   def delete_user_session
#     session.delete :user_id
#     @current_user_token = nil
#   end

#   def delete_admin_session 
#     session.delete :admin_user
#   end
# end
