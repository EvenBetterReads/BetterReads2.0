import React from 'react';
import LibraryDashboard from './libraryDashboard';
import AddBookForm from './AddBookForm';
import '../styles/library.scss';

function LibraryContainer() {
  return (
    <div className='matchTableContainer'>
      <div className='outerBox'>
        <AddBookForm />
        <LibraryDashboard />
      </div>
    </div>
  );
}

export default LibraryContainer;
