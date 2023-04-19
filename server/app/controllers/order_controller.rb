class OrderController < ApplicationController
  def index
    @orders = current_user.orders
    render json: @orders, status: :ok
  end

  def make_order
    @order = Order.new(order_params)
    @order.user_id = current_user.id
    @order.save
    redirect_to orders_path, notice: "Successfully placed order"
  end

  def show
    @order = Order.find(params[:id]).to_json(:include => [{ :product => { :only => :name } }, { :user => { :only => :email } }])
    render json: @order, status: :ok
  end

  def destroy
    respond_with Order.destroy(params[:id])
  end

  private

  def order_params
    params[:order].permit(:products_id, :order_id, :quantity, :total_amount, :status, :address)
  end
end
