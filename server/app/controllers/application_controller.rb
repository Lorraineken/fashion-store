class ApplicationController < ActionController::API
  include ActionController::Cookies
  

  JWT_SECRET = "qqqwrcgff21234OCKS)(WJMW)"

  wrap_parameters format: []

   def app_response(status_code: 200, message: "Success", body: nil, serializer: nil)
     if serializer
       render json: {
                status: status_code,
                message: message,
                body: ActiveModelSerializers::SerializableResource.new(body, serializer: serializer),
              }, status: status_code
     else
       render json: {
                status: status_code,
                message: message,
                body: body,
              }, status: status_code
     end
   end

  def uid
    jwt_data = decode_data(request.headers["token"])
    jwt_data[0]["user_id"]
  end

  # ENCODE DATA INTO TOKEN
  def encode_data(data)
    
    JWT.encode(data, ENV['JWT_SECRET'], "HS256")
  end

  def decode(token)
    JWT.decode(token, ENV['JWT_SECRET'], true, { algorithm: 'HS256' })
  end

  def authorize
    auth_headers = request.headers['Authorization']
    if !auth_headers
        render json:{message: "Not Authorized"}
    else
        token = auth_headers.split(' ')[1]
        save_user_id(token)
    end
  end

  def save_user_id(token)
    @uid = decode(token)[0]["user_id"].to_i
  end

   def check_admin
       user = User.find_by(id: @uid)
       role = user.roles.where(name: "admin").first
       if role && role.name == "admin"
         true
       end
   end


  def not_found(message: "Not found")
    app_response(status_code: 404, message: message)
  end
end