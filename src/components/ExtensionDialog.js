import React from 'react';
import factcheck from '../factcheck.zip'
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';

const ExtensionDialog = ({ open, onClose, downloadLink }) => {
  const handleDownload = () => {
    // Implement your download logic here
    window.open(downloadLink, '_blank');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Install Chrome Extension</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Follow the instructions below to install the Chrome extension:
        </Typography>
        <ol>
          <li>Download the zip file by clicking the button below.</li>
          <li>Unzip the downloaded file to your desired location.</li>
          <li>Open Chrome and go to <code>chrome://extensions/</code>.</li>
          <li>Enable Developer mode.</li>
          <li>Click "Load unpacked" and select the folder where you unzipped the file.</li>
        </ol>
        <a href={factcheck} download>  <div className="navbarTickets">Download Extension</div></a>
      </DialogContent>
    </Dialog>
  );
};

export default ExtensionDialog;
