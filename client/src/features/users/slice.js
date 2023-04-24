import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  (user) => {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add User");
      }
      return res.json();
    });
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  (user) => {
    return fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update User");
      }
      return res.json();
    });
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  (id) => {
    return fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete User");
      }
      return id;
    });
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((user) => user.id === action.payload);
        if (index !== -1) {
          state.list.splice(index, 1);
        }
      });
  },
});

export default userSlice.reducer;