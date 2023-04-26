class AuthenticationController < ApplicationController
  def create_account
    user = User.create(create_params)
    if user.valid?
      create_user_session(user.id)
      token = encode_token(user_id: user.id)
      app_response(status_code: 201, message: "Account created successfully", body: {user: user, token:token})
    else
      app_response(status_code: 422, message: "Invalid input", body: user.errors.full_messages)
    end
  end

  def login_account
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
     # create_user_session(user.id)
     token = encode_data({user_id: user.id})
     
     
     render json: {message: "Log in success", body: {user: user,token:token}}
    else
      app_response(status_code: 401, message: "Invalid username or password")
    end
  end

  def logout_account
    @uid = null
    app_response(status_code: 200, message: "Log out successfully")
  end
  
  # Render 404 page for unmapped routes
  def render_404
    not_found
  end

  private

  def create_params
    params.permit(:username, :email, :password)
  end

end
