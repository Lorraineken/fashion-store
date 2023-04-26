require 'test_helper'

class ProductsControllerTest < ActionController::TestCase
  setup do
    @product = products(:one)
    @admin_user = users(:admin)
    @regular_user = users(:regular)
  end

  test "should not get index without authorization" do
    get :index
    assert_response :unauthorized
  end

  test "should get index with authorization" do
    get :index, session: { user_id: @admin_user.id }
    assert_response :success
  end

  test "should get show with authorization" do
    get :show, params: { id: @product.id }, session: { user_id: @admin_user.id }
    assert_response :success
  end

  test "should not create product without authorization" do
    assert_no_difference('Product.count') do
      post :create, params: { name: 'New Product', category_id: 1, price: 10, description: 'A new product', image_url: 'http://example.com/image.jpg', gender: 'male' }
    end
    assert_response :unauthorized
  end

  test "should create product with authorization" do
    assert_difference('Product.count') do
      post :create, params: { name: 'New Product', category_id: 1, price: 10, description: 'A new product', image_url: 'http://example.com/image.jpg', gender: 'male' }, session: { user_id: @admin_user.id }
    end
    assert_response :created
  end

  test "should not update product without authorization" do
    patch :update, params: { id: @product.id, name: 'Updated Product' }, session: { user_id: @regular_user.id }
    assert_response :unauthorized
  end

  test "should update product with authorization" do
    patch :update, params: { id: @product.id, name: 'Updated Product' }, session: { user_id: @admin_user.id }
    assert_response :accepted
  end

  test "should not delete product without authorization" do
    assert_no_difference('Product.count') do
      delete :destroy, params: { id: @product.id }
    end
    assert_response :unauthorized
  end

  test "should delete product with authorization" do
    assert_difference('Product.count', -1) do
      delete :destroy, params: { id: @product.id }, session: { user_id: @admin_user.id }
    end
    assert_response :no_content
  end

  test "should get index without admin authorization" do
    get :index, session: { user_id: @regular_user.id }
    assert_response :success
  end

  test "should get show without admin authorization" do
    get :show, params: { id: @product.id }, session: { user_id: @regular_user.id }
    assert_response :success
  end
end