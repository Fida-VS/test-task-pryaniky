import { configureStore } from '@reduxjs/toolkit';
import postReducer from './post-slice';
import userReducer from './user-slice';


export default configureStore({
    reducer: {
        posts: postReducer,
        user: userReducer,
    }
});






