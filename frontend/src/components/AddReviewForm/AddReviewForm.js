import React, { useState } from 'react';
import { TextField, Button, Box, Input } from '@mui/material';
import './AddReviewForm.css';

const AddReviewForm = ({ drink, onAddReview,selectedValue, onUploadPicture }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState(selectedValue?.description);
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview({ rating, comment });
    setRating(1);
    setComment('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="add-review-form">
      <TextField
        type="number"
        label="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        InputProps={{ inputProps: { min: 1, max: 5 } }}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Your Review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        multiline
        rows={4}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth={true}
        className="add-review-form-button"
        sx={{ mb: 2 }}
      >
        Add Review
      </Button>
      <Box sx={{ mt: 2 }}>
        <Input
          type="file"
          onChange={(e) => onUploadPicture(drink.id, e.target.files[0])}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default AddReviewForm;
