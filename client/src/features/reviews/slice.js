import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    const response = await fetch("http://localhost:3000/reviews");
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    return response.json();
  }
);

export const addReview = createAsyncThunk(
  "reviews/addReview",
  (review) => {
    return fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add review");
      }
      return res.json();
    });
  }
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  (review) => {
    return fetch(`http://localhost:3000/reviews/${review.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update review");
      }
      return res.json();
    });
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  (id) => {
    return fetch(`http://localhost:3000/reviews/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete review");
      }
      return id;
    });
  }
);

export const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload;
      })
  
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = "success";
        state.list.push(action.payload);
      })


      .addCase(updateReview.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.list.findIndex(
          (review) => review.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
    
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.list.findIndex(
          (review) => review.id === action.payload
        );
        if (index !== -1) {
          state.list.splice(index, 1);
        }
      })

  },
});

export default reviewSlice.reducer;