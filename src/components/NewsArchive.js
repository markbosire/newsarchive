import React from 'react';
import Navbar from './Navbar';

const NewsArchive = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Add your search logic here
  };

  return (
    <div className='News'>
        <Navbar />
     
      <div className='center'>
        <p>See any news article at any point in history of the internet</p>
        <div className='newsSearch'>
          <input type="text" value={searchTerm} onChange={handleSearchChange} />
          <button type="submit" style={{backgroundColor: 'red', color: 'white'}}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default NewsArchive;
