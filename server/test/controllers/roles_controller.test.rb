require 'test_helper'

class RolesControllerTest < ActionController::TestCase
  setup do
    @role = roles(:one)
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
    get :show, params: { id: @role.id }, session: { user_id: @admin_user.id }
    assert_response :success
  end

  test "should not create role without admin authorization" do
    assert_no_difference('Role.count') do
      post :create, params: { name: 'New Role' }, session: { user_id: @regular_user.id }
    end
    assert_response :unauthorized
  end

  test "should create role with admin authorization" do
    assert_difference('Role.count') do
      post :create, params: { name: 'New Role' }, session: { user_id: @admin_user.id }
    end
    assert_response :created
  end

  test "should not update role without admin authorization" do
    patch :update, params: { id: @role.id, name: 'Updated Role' }, session: { user_id: @regular_user.id }
    assert_response :unauthorized
  end

  test "should update role with admin authorization" do
    patch :update, params: { id: @role.id, name: 'Updated Role' }, session: { user_id: @admin_user.id }
    assert_response :accepted
  end

  test "should not delete role without admin authorization" do
    assert_no_difference('Role.count') do
      delete :destroy, params: { id: @role.id }, session: { user_id: @regular_user.id }
    end
    assert_response :unauthorized
  end

  test "should delete role with admin authorization" do
    assert_difference('Role.count', -1) do
      delete :destroy, params: { id: @role.id }, session: { user_id: @admin_user.id }
    end
    assert_response :no_content
  end
end