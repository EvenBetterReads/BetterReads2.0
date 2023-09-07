import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  bookList: [],
  bookCount: 0,
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getBooks = createAsyncThunk('library/getBooks', async body => {
  try {
    const response = await axios.get(`/api/book_review/${body.user_id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const addBook = createAsyncThunk('library/addBook', async data => {
  try {
    const response = await axios.post(`/api/book_review/${data.user_id}`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const removeBook = createAsyncThunk(
  'library/removeBook',
  async bookId => {
    try {
      const response = await axios.delete('');
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
);

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    // bookAdded: {
    //     reducer(state, action) {
    //         state.bookList.push(action.payload)
    //     },
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // const loadedBooks = action.payload.map(book => {
        //     return book;
        // });

        // Add any fetched books to the array
        // state.bookList = state.bookList.concat(loadedBooks)
        state.bookList = action.payload;
        state.loggedIn = true;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.bookList.push(action.payload);
      });
  },
});

// export const getBookList = state => state.library.bookList;
// export const getBooksStatus = state => state.library.status;
// export const getBooksError = state => state.library.error;

export const { bookAdded } = librarySlice.actions;

export default librarySlice.reducer;
