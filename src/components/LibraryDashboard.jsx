import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getBooks } from '../features/librarySlice';
import '../styles/library.scss';
// import { Button } from '@mui/material';

function LibraryDashboard() {
  const userId = useSelector(state => state.user.userId);
  console.log('userId: ', userId);
  // const bookCount = useSelector(state => state.library.bookCount);
  const bookData = useSelector(state => state.library.bookList);
  const dispatch = useDispatch();

  const body = {
    user_id: userId,
  };

  useEffect(() => {
    dispatch(getBooks(body));
  }, [bookData]);

  const [clickedRow, setClickedRow] = React.useState();
  const onButtonClick = (e, row) => {
    console.log('row: ', row);
    fetch(`api/book_review/${row.bookid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    e.stopPropagation();
    setClickedRow(row);
  };

  const rows = bookData.map((book, index) => ({
    id: index + 1,
    bookid: book._id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    summary: book.summary,
    review: book.rating,
  }));

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: params => {
        return (
          <button
            onClick={e => onButtonClick(e, params.row)}
            variant='contained'>
            Delete
          </button>
        );
      },
    },
    { field: 'title', headerName: 'Title', width: 350 },
    { field: 'author', headerName: 'Author', width: 150 },
    { field: 'genre', headerName: 'Genre', width: 150 },
    { field: 'summary', headerName: 'Summary', width: 350 },
    { field: 'review', headerName: 'Review', width: 150 },
  ];

  return (
    <div className='libraryDashboard'>
      <Box className='box'>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </div>
  );
}

export default LibraryDashboard;
