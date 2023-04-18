class PaymentController < ApplicationController
  def create
    # Get the credit card details submitted by the form
    token = params[:stripeToken]
    @product = Product.find(params[:product_id])
    @user = current_user

    # Create the charge on Stripe's servers - this will charge the user's card
    begin
      charge = Stripe::Charge.create(
        :amount => (@product.price * 100).to_i, # amount in cents, again
        :currency => "ksh",
        :source => token,
        :description => params[:stripeEmail],
      )

      if charge.paid
        Order.create!(product_id: @product.id, user_id: @user.id, total: @product.price)
        # Own code: Get order params
        @last_order = Order.where(user_id: @user.id).order(id: :desc).first
      end

      flash[:success] = "Payment processed successfully."
    rescue Stripe::CardError => e
      # The card has been declined
      body = e.json_body
      err = body[:error]
      flash[:error] = "Unfortunately, there was an error processing your payment: #{err[:message]}"
    end
  end
end
