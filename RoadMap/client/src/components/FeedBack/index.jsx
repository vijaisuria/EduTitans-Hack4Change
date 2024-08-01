import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Feedback = () => {
  const [feedback, setFeedback] = useState(null); // null, 'like', or 'dislike'

  const handleLike = () => {
    setFeedback(feedback === 'like' ? null : 'like');
  };

  const handleDislike = () => {
    setFeedback(feedback === 'dislike' ? null : 'dislike');
  };

  return (
    <div style={{display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', }}>
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#d6d6d6', 
        borderRadius: '20px', 
        padding: '0px 8px',
        marginTop: '16px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <span>Was this really helpful for you?</span>
        <IconButton onClick={handleLike} sx={{ color: feedback === 'like' ? 'green' : 'inherit' }}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton onClick={handleDislike} sx={{ color: feedback === 'dislike' ? 'red' : 'inherit' }}>
          <ThumbDownIcon />
        </IconButton>
      </Box>
    </Box>
    </div>
  );
};

export default Feedback;
