import "../App.css";
import { Button } from '@mui/material';
import ExtensionDialog from './ExtensionDialog';
import React, { useState,useEffect } from 'react';
function Navbar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const downloadLink = '../factcheck.zip'; // Replace with your actual download link

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  return (
    <React.Fragment>
       <ExtensionDialog open={dialogOpen} onClose={handleCloseDialog} downloadLink={downloadLink} />
   
    <div className="navbar">
      <section>
        <div className="navbarRight">
        <i class="fas fa-newspaper"></i>
          <h1>TruthPolice</h1>
         
         
        </div>
        <div className="navbarLeft">
          <div className="navbarSchedule" onClick={handleOpenDialog}>Fact Check Tool</div>
         
        
        </div>
      </section>
    </div>
    </React.Fragment>
  );
}
export default Navbar;