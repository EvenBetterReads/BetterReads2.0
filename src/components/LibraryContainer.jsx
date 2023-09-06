import React from 'react';
import LibraryDashboard from './libraryDashboard';
import AddBookForm from './AddBookForm';

function LibraryContainer() {
  return (
    <div className='matchTableContainer' style={styles.LibraryContainer}>
      <div className='outerBox'>
        <AddBookForm />
        <LibraryDashboard />
      </div>
    </div>
  );
}

const styles = {
  LibraryContainer: {
    display: 'flex',
    width: '50%',
  },
};

export default LibraryContainer;
