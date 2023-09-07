import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getBooks } from '../features/librarySlice';
import '../styles/library.scss';

function LibraryDashboard() {
  const userId = useSelector(state => state.user.userId);
  // const bookCount = useSelector(state => state.library.bookCount);
  const bookData = useSelector(state => state.library.bookList);
  const dispatch = useDispatch();

  const body = {
    userId: userId,
  };

  useEffect(() => {
    console.log('body: ', body);
    dispatch(getBooks(body));
  }, [rows]);

  const rows = bookData.map((book, index) => ({
    id: index + 1,
    title: book.title,
    author: book.author,
    genre: book.genre,
    summary: book.summary,
    review: book.review,
  }));

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
    },
    { field: 'title', headerName: 'Title', width: 350 },
    { field: 'author', headerName: 'Author', width: 150 },
    { field: 'genre', headerName: 'Genre', width: 150 },
    { field: 'summary', headerName: 'Summary', width: 350 },
    { field: 'review', headerName: 'Review', width: 150 },
  ];

  return (
    <div className='libraryDashboard'>
      <Box>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </div>
  );
}

export default LibraryDashboard;
