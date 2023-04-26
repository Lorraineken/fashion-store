require 'test_helper'

class UserRolesControllerTest < ActionController::TestCase
  setup do
    @user_role = user_roles(:one)
    @admin_user = users(:admin)
    @regular_user = users(:regular)
  end

  test "should not get index without admin authorization" do
    get :index, session: { user_id: @regular_user.id }
    assert_response :unauthorized
  end

  test "should get index with admin authorization" do
    get :index, session: { user_id: @admin_user.id }
    assert_response :success
  end

  test "should get show with admin authorization" do
    get :show, params: { id: @user_role.id }, session: { user_id: @admin_user.id }
    assert_response :success
  end

  test "should not create user_role without admin authorization" do
    assert_no_difference('UserRole.count') do
      post :create, params: { user_id: 1, role_id: 1 }, session: { user_id: @regular_user.id }
    end
    assert_response :unauthorized
  end

  test "should create user_role with admin authorization" do
    assert_difference('UserRole.count') do
      post :create, params: { user_id: 1, role_id: 1 }, session: { user_id: @admin_user.id }
    end
    assert_response :created
  end

  test "should not update user_role without admin authorization" do
    patch :update, params: { id: @user_role.id, role_id: 2 }, session: { user_id: @regular_user.id }
    assert_response :unauthorized
  end

  test "should update user_role with admin authorization" do
    patch :update, params: { id: @user_role.id, role_id: 2 }, session: { user_id: @admin_user.id }
    assert_response :accepted
  end

  test "should not delete user_role without admin authorization" do
    assert_no_difference('UserRole.count') do
      delete :destroy, params: { id: @user_role.id }, session: { user_id: @regular_user.id }
    end
    assert_response :unauthorized
  end

  test "should delete user_role with admin authorization" do
    assert_difference('UserRole.count', -1) do
      delete :destroy, params: { id: @user_role.id }, session: { user_id: @admin_user.id }
    end
    assert_response :no_content
  end
end