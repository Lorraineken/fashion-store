import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUser, setError } = userSlice.actions;

export const loginAccount = (userData) => async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/login_account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        
      });
      const data = await response.json();
      console.log(data)
      const token = data.body.token;
      localStorage.setItem('token', token);
      if (data.ok) {
        // Extract the JWT token from the response
        console.log(data)
        const token = data.body.token;
        console.log(token)
        
        // Store the JWT token in local storage
        localStorage.setItem('token', token);
        
        dispatch(setUser(data.body));
      } else {
        console.log(data.message)
        dispatch(setError(data.message));
      }
    } catch (error) {
      console.log(error)
      dispatch(setError(error.message));
    }
  };
  

export default userSlice.reducer;