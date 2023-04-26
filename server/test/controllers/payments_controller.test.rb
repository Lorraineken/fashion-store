require 'test_helper'

class PaymentControllerTest < ActionController::TestCase
  setup do
    @product = products(:one)
    @user = users(:one)
    @stripe_token = 'tok_visa'
  end

  test "should get index" do
    get :index, params: {}, session: { user_id: @user.id }
    assert_response :success
    assert_not_nil assigns(:payments)
  end

  test "should create payment" do
    assert_difference('Order.count') do
      post :create, params: { product_id: @product.id, stripeToken: @stripe_token, stripeEmail: @user.email }, session: { user_id: @user.id }
    end

    assert_response :success
    assert_not_nil assigns(:last_order)
    assert_equal assigns(:last_order).user_id, @user.id
    assert_equal assigns(:last_order).product_id, @product.id
    assert_equal assigns(:last_order).total, @product.price
  end

  test "should not create payment without authorization" do
    assert_no_difference('Order.count') do
      post :create, params: { product_id: @product.id, stripeToken: @stripe_token, stripeEmail: @user.email }
    end

    assert_response :unauthorized
  end

  test "should handle Stripe card error" do
    StripeMock.prepare_card_error(:card_declined)

    post :create, params: { product_id: @product.id, stripeToken: @stripe_token, stripeEmail: @user.email }, session: { user_id: @user.id }

    assert_response :success
    assert_equal JSON.parse(response.body), { "status" => "failed", "message" => "Unfortunately, there was an error processing your payment: The card was declined." }
  end
end