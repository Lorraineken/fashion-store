require 'test_helper'

class OrderControllerTest < ActionController::TestCase
  setup do
    @order = orders(:one)
    @user = users(:one)
    @product = products(:one)
  end

  test "should get index" do
    get :index, params: {}, session: { user_id: @user.id }
    assert_response :success
    assert_not_nil assigns(:orders)
  end

  test "should create order" do
    assert_difference('Order.count') do
      post :make_order, params: { order: { products_id: @product.id, quantity: 1, total_amount: 10, status: 'pending', address: '123 Main St' } }, session: { user_id: @user.id }
    end

    assert_redirected_to orders_path
  end

  test "should show order" do
    get :show, params: { id: @order.id }, session: { user_id: @user.id }
    assert_response :success
  end

  test "should destroy order" do
    assert_difference('Order.count', -1) do
      delete :destroy, params: { id: @order.id }, session: { user_id: @user.id }
    end

    assert_redirected_to orders_path
  end

  test "should not get index without authorization" do
    get :index, params: {}
    assert_response :unauthorized
  end

  test "should not create order without authorization" do
    assert_no_difference('Order.count') do
      post :make_order, params: { order: { products_id: @product.id, quantity: 1, total_amount: 10, status: 'pending', address: '123 Main St' } }
    end

    assert_response :unauthorized
  end

  test "should not show order without authorization" do
    get :show, params: { id: @order.id }
    assert_response :unauthorized
  end

  test "should not destroy order without authorization" do
    assert_no_difference('Order.count') do
      delete :destroy, params: { id: @order.id }
    end

    assert_response :unauthorized
  end
end