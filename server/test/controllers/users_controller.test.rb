require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  setup do
    @user = users(:one)
  end

  test "should create user" do
    assert_difference('User.count') do
      post :create, params: { username: 'testuser', password: 'password', email: 'testuser@example.com' }
    end
    assert_response :ok
  end

  test "should login user" do
    post :login, params: { username: @user.username, password: 'password' }
    assert_response :ok
  end

  test "should not login user with invalid password" do
    post :login, params: { username: @user.username, password: 'wrongpassword' }
    assert_response :unprocessable_entity
  end

  test "should not get index without authorization" do
    get :index
    assert_response :unauthorized
  end

  test "should get index with authorization" do
    get :index, session: { user_id: @user.id }
    assert_response :success
  end

  test "should get show with authorization" do
    get :show, params: { id: @user.id }, session: { user_id: @user.id }
    assert_response :success
  end

  test "should not update user without authorization" do
    patch :update, params: { id: @user.id, username: 'newusername' }
    assert_response :unauthorized
  end

  test "should update user with authorization" do
    patch :update, params: { id: @user.id, username: 'newusername' }, session: { user_id: @user.id }
    assert_response :accepted
  end

  test "should not delete user without authorization" do
    assert_no_difference('User.count') do
      delete :destroy, params: { id: @user.id }
    end
    assert_response :unauthorized
  end

  test "should delete user with authorization" do
    assert_difference('User.count', -1) do
      delete :destroy, params: { id: @user.id }, session: { user_id: @user.id }
    end
    assert_response :no_content
  end
end