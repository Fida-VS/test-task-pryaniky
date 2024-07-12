import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
    'user/loginUser',
    async function({ login, password }, {rejectWithValue, dispatch}){
  
      try {
        const response = await fetch('https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login', {
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ login, password })
        });
        
        if(!response.ok){
          throw new Error('Server Error!');
        }
    
        const userData = await response.json();
        const token = userData.data.token;

        localStorage.setItem('userData', JSON.stringify(token));

        dispatch(setUser(token));
        
      
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
  }

const userSlice = createSlice({
    name: "user",
    initialState: {
      token: null,
      error: null,
    },
  
    reducers: {
        setUser(state, action) {
            state.token = action.payload;
          },
  },
  extraReducers: (builder) => {
   
    builder.addCase(loginUser.rejected, setError);
  
}
  });




  export const {setUser} = userSlice.actions;

  export default userSlice.reducer;