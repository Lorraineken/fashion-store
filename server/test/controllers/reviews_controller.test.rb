require 'test_helper'

class ReviewsControllerTest < ActionController::TestCase
  setup do
    @review = reviews(:one)
    @user = users(:one)
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
    get :show, params: { id: @review.id }, session: { user_id: @user.id }
    assert_response :success
  end

  test "should not create review without authorization" do
    assert_no_difference('Review.count') do
      post :create, params: { comments: 'A new review', rating: 4, product_id: 1 }
    end
    assert_response :unauthorized
  end

  test "should create review with authorization" do
    assert_difference('Review.count') do
      post :create, params: { comments: 'A new review', rating: 4, product_id: 1 }, session: { user_id: @user.id }
    end
    assert_response :created
  end

  test "should not update review without authorization" do
    patch :update, params: { id: @review.id, comments: 'Updated review' }, session: { user_id: nil }
    assert_response :unauthorized
  end

  test "should update review with authorization" do
    patch :update, params: { id: @review.id, comments: 'Updated review' }, session: { user_id: @user.id }
    assert_response :accepted
  end

  test "should not delete review without authorization" do
    assert_no_difference('Review.count') do
      delete :destroy, params: { id: @review.id }
    end
    assert_response :unauthorized
  end

  test "should delete review with authorization" do
    assert_difference('Review.count', -1) do
      delete :destroy, params: { id: @review.id }, session: { user_id: @user.id }
    end
    assert_response :no_content
  end

  test "should get index without authorization" do
    get :index
    assert_response :success
  end

  test "should get show without authorization" do
    get :show, params: { id: @review.id }
    assert_response :success
  end
end