import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async function(token, {rejectWithValue}){

    try {
      const response = await fetch('https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get', {
        headers: {
          'content-type': 'application/json',
          'x-auth': token
        },
        method: 'GET',
      });
      
      if(!response.ok){
        throw new Error('Server Error!');
      }
  
      const data = await response.json();
  
      return data;
    
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
'posts/deletePost',
async function({token, id}, {rejectWithValue, dispatch}){
  try {
    const response = await fetch(`https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
      headers: {
        'content-type': 'application/json',
        'x-auth': token
      },
      method: 'DELETE',
    })

    if(!response.ok){
      throw new Error('Can not delete post. Server error!');
    }

    dispatch(removePost({id}));
  } catch (error) {
    return rejectWithValue(error.message);
  }
}
);

export const editPost = createAsyncThunk(
  'posts/editPost',
  async function ([token, id, data], {rejectWithValue, dispatch}){

    try {
      const post = {
        companySigDate: data.companySigDate,
        companySignatureName: data.companySignatureName,
        documentName: data.documentName,
        documentStatus: data.documentStatus,
        documentType: data.documentType,
        employeeNumber: data.employeeNumber,
        employeeSigDate: data.employeeSigDate,
        employeeSignatureName: data.employeeSignatureName,
      };

      const response = await fetch(`https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
        headers: {
          'content-type': 'application/json',
          'x-auth': token
        },
        method: 'POST',
        body: JSON.stringify(post)
      });


      if(!response.ok){
        throw new Error('Can not update post. Server error!');
      }

      const postData = await response.json();

    dispatch(updatePost(id, postData.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async function ([token, data], {rejectWithValue, dispatch}){
    try {

      const post = {
        companySigDate: data.companySigDate,
        companySignatureName: data.companySignatureName,
        documentName: data.documentName,
        documentStatus: data.documentStatus,
        documentType: data.documentType,
        employeeNumber: data.employeeNumber,
        employeeSigDate: data.employeeSigDate,
        employeeSignatureName: data.employeeSignatureName,
      };

      const response = await fetch('https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/create', {
        headers: {
          'content-type': 'application/json',
          'x-auth': token
        },
        method: 'POST',
        body: JSON.stringify(post)
      });

      if(!response.ok){
        throw new Error('Can not add post. Server error!');
      }

      const postData = await response.json();

      dispatch(addPost(postData.data));

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
}

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: null,
    error: null,
  },

  reducers: {
    addPost(state, action) {

      state.posts.push(action.payload);
    },
    removePost(state, action) {
        state.posts = state.posts.filter(post => post.id !== action.payload.id);
    },
    updatePost(state, action) {
      let updatedPost = state.posts.find(post => post.id === action.payload.id);
      // eslint-disable-next-line no-unused-vars
      updatedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
  state.status = 'loading';
  state.error = null;
});
builder.addCase(fetchPosts.fulfilled, (state, action) => {
  state.status = 'resolved';
  state.posts = action.payload.data;
});
builder.addCase(fetchPosts.rejected, setError);
builder.addCase(deletePost.rejected, setError);
builder.addCase(editPost.rejected, setError);
}
});


export const {addPost, removePost, updatePost} = postSlice.actions;

export default postSlice.reducer;