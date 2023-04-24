class ApplicationController < ActionController::API
  include ActionController::Cookies

  JWT_SECRET = "qqqwrcgff21234OCKS)(WJMW)"

  wrap_parameters format: []

  # application response body
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

  def authorize
    unauthorized unless session.include? :user_id
  end

   # authorize using JWT
   def authorize_jwt
    jwt_data = decode_data(request.headers["token"])
    app_response(body: jwt_data)
  end

  def uid
    jwt_data = decode_data(request.headers["token"])
    jwt_data[0]["user_id"]
  end

  # ENCODE DATA INTO TOKEN
  def encode_data(data)
    # set expiry of token (I have currently set it at 24 hours)
    # data[:exp] = 24.hours.from_now.to_i
    JWT.encode(data, JWT_SECRET, "HS256")
  end

  # DECODE INFORMATION FROM TOKEN
  def decode_data(token)
    begin
      JWT.decode(token, key: JWT_SECRET, verify: true, options: { algorithm: "HS256" })
    rescue => error
      error
    end
  end

  def authorize_admin
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :admin_user
  end

  def not_found(message: "Not found")
    app_response(status_code: 404, message: message)
  end
end
