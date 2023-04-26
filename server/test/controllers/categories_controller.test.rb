# require 'test_helper'

# class CategoriesControllerTest < ActionController::TestCase
#   def setup
#     @category = categories(:one)
#   end

#   test "should create category" do
#     assert_difference('Category.count') do
#       post :create, params: { category: { name: "Test Category" } }
#     end

#     assert_response :created
#   end

#   test "should get index" do
#     get :index

#     assert_response :ok
#     assert_not_nil assigns(:category)
#   end

#   test "should show category" do
#     get :show, params: { id: @category.id }

#     assert_response :ok
#   end

#   test "should update category" do
#     patch :update, params: { id: @category.id, category: { name: "Updated Name" } }

#     assert_response :accepted
#     @category.reload
#     assert_equal "Updated Name", @category.name
#   end

#   test "should destroy category" do
#     assert_difference('Category.count', -1) do
#       delete :destroy, params: { id: @category.id }
#     end

#     assert_response :no_content
#   end
# end

require 'test_helper'

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @category = categories(:one)
    @admin_user = users(:admin)
    @regular_user = users(:regular)
  end

  test "should not get index without authorization" do
    get categories_url
    assert_response :unauthorized
  end

  test "should get index with authorization" do
    get categories_url, headers: { Authorization: token_for(@admin_user) }
    assert_response :success
  end

  test "should get show with authorization" do
    get category_url(@category), headers: { Authorization: token_for(@admin_user) }
    assert_response :success
  end

  test "should not create category without authorization" do
    assert_no_difference('Category.count') do
      post categories_url, params: { name: 'New Category' }
    end
    assert_response :unauthorized
  end

  test "should create category with authorization" do
    assert_difference('Category.count') do
      post categories_url, params: { name: 'New Category' }, headers: { Authorization: token_for(@admin_user) }
    end
    assert_response :created
  end

  test "should not update category without authorization" do
    patch category_url(@category), params: { name: 'Updated Category' }
    assert_response :unauthorized
  end

  test "should update category with authorization" do
    patch category_url(@category), params: { name: 'Updated Category' }, headers: { Authorization: token_for(@admin_user) }
    assert_response :accepted
  end

  test "should not delete category without authorization" do
    assert_no_difference('Category.count') do
      delete category_url(@category)
    end
    assert_response :unauthorized
  end

  test "should delete category with authorization" do
    assert_difference('Category.count', -1) do
      delete category_url(@category), headers: { Authorization: token_for(@admin_user) }
    end
    assert_response :no_content
  end

  test "should get index without admin authorization" do
    get categories_url, headers: { Authorization: token_for(@regular_user) }
    assert_response :success
  end

  test "should get show without admin authorization" do
    get category_url(@category), headers: { Authorization: token_for(@regular_user) }
    assert_response :success
  end

  private

  def token_for(user)
    JsonWebToken.encode(user_id: user.id)
  end
end