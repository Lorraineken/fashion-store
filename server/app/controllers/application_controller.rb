class ApplicationController < ActionController::API
  include ActionController::Cookies

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

  def not_found(message: "Not found")
    app_response(status_code: 404, message: message)
  end
end
