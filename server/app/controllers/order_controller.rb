class OrderController < ApplicationController

    def index
        @orders = current_user.orders
    end

    def make_order
        @order = Order.new(order_params)
        @order.user_id = current_user.id
        @order.save
        redirect_to orders_path, notice: "Successfully placed order"
    end

    private
    def order_params
        params[:order].permit(:address)
    end
end