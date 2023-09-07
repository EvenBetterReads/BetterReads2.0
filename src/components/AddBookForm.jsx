import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormGroup,
  FormLabel,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { addBook } from '../features/librarySlice';

// const sxStyle = {
//   fontSize: '2rem',
//   backgroundColor: '',
//   width: 800,
//   height: 1000,
//   border: 'solid 10px black',
// };

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [review, setReview] = useState(0);

  const userId = useSelector(state => state.user.userId);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      addBook({
        user_id: userId,
        title,
        author,
        genre,
        summary,
        rating: review,
      }),
    );
  };

  return (
    <div className='addBookFrom'>
      <form onSubmit={handleSubmit}>
        <FormGroup className='formGroup'>
          <FormLabel component='legend'>Title</FormLabel>
          <TextField
            required
            className='field'
            name='title'
            variant='outlined'
            placeholder='Harry Potter and The Sorcerers Stone...'
            value={title}
            onChange={e => setTitle(e.target.value)}
            sx={{ paddingBottom: 2 }}
          />
          <FormLabel component='legend'>Author</FormLabel>
          <TextField
            required
            className='field'
            name='author'
            variant='outlined'
            placeholder='J.K. Rowling...'
            value={author}
            onChange={e => setAuthor(e.target.value)}
            sx={{ paddingBottom: 2 }}
          />
          <FormLabel component='legend'>Genre</FormLabel>
          <TextField
            className='field'
            name='genre'
            variant='outlined'
            placeholder='Fantasy...'
            value={genre}
            onChange={e => setGenre(e.target.value)}
            sx={{ paddingBottom: 2 }}
          />
          <FormLabel component='legend'>Summary</FormLabel>
          <TextField
            className='field'
            name='summary'
            variant='outlined'
            placeholder=''
            value={summary}
            onChange={e => setSummary(e.target.value)}
            sx={{ paddingBottom: 2 }}
          />
          <Typography component='legend'>Review</Typography>
          <Rating
            name='review'
            value={review}
            onChange={e => setReview(e.target.value)}
            sx={{ paddingBottom: 2 }}
          />
          <button type='submit'>Submit</button>
        </FormGroup>
      </form>
    </div>
  );
}

export default AddBookForm;
