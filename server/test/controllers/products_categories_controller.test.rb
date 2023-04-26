require 'test_helper'

class ProductsCategoriesControllerTest < ActionController::TestCase
  setup do
    @product_category = products_categories(:one)
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
    get :show, params: { id: @product_category.id }, session: { user_id: @admin_user.id }
    assert_response :success
  end

  test "should not create product_category without authorization" do
    assert_no_difference('ProductsCategory.count') do
      post :create, params: { product_id: 1, category_id: 1 }
    end
    assert_response :unauthorized
  end

  test "should create product_category with authorization" do
    assert_difference('ProductsCategory.count') do
      post :create, params: { product_id: 1, category_id: 1 }, session: { user_id: @admin_user.id }
    end
    assert_response :created
  end

  test "should not update product_category without authorization" do
    patch :update, params: { id: @product_category.id, product_id: 2 }, session: { user_id: @regular_user.id }
    assert_response :unauthorized
  end

  test "should update product_category with authorization" do
    patch :update, params: { id: @product_category.id, product_id: 2 }, session: { user_id: @admin_user.id }
    assert_response :accepted
  end

  test "should not delete product_category without authorization" do
    assert_no_difference('ProductsCategory.count') do
      delete :destroy, params: { id: @product_category.id }
    end
    assert_response :unauthorized
  end

  test "should delete product_category with authorization" do
    assert_difference('ProductsCategory.count', -1) do
      delete :destroy, params: { id: @product_category.id }, session: { user_id: @admin_user.id }
    end
    assert_response :no_content
  end

  test "should get index without admin authorization" do
    get :index, session: { user_id: @regular_user.id }
    assert_response :success
  end

  test "should get show without admin authorization" do
    get :show, params: { id: @product_category.id }, session: { user_id: @regular_user.id }
    assert_response :success
  end
end