require 'test_helper'

class CategoriesControllerTest < ActionController::TestCase
  def setup
    @category = categories(:one)
  end

  test "should create category" do
    assert_difference('Category.count') do
      post :create, params: { category: { name: "Test Category" } }
    end

    assert_response :created
  end

  test "should get index" do
    get :index

    assert_response :ok
    assert_not_nil assigns(:category)
  end

  test "should show category" do
    get :show, params: { id: @category.id }

    assert_response :ok
  end

  test "should update category" do
    patch :update, params: { id: @category.id, category: { name: "Updated Name" } }

    assert_response :accepted
    @category.reload
    assert_equal "Updated Name", @category.name
  end

  test "should destroy category" do
    assert_difference('Category.count', -1) do
      delete :destroy, params: { id: @category.id }
    end

    assert_response :no_content
  end
end