import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import './AddDrinkForm.css';

const AddDrinkForm = ({ onAddDrink }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddDrink({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="add-drink-form">
      <Typography variant="h6" className="add-drink-form-title">
        Add a New Drink
      </Typography>
      <TextField
        label="Drink Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth={true}
        color="primary"
        className="add-drink-form-button"
      >
        Add Drink
      </Button>
    </Box>
  );
};

export default AddDrinkForm;
