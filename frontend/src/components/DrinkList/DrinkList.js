import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import './DrinkList.css';
import DrinkDetail from '../DrinkDetail/DrinkDetail';

import {API_URL} from '../../services/api'

const DrinkList = ({ drinks, onUploadPicture, onUpdateDrink, onDeleteDrink }) => {
  return (
    <Box sx={{ maxWidth: '800px', margin: 'auto', padding: 2 }}>
      {drinks.length === 0 ? (
        <Typography className="no-drinks" variant="h6">
          No drinks found.
        </Typography>
      ) : (
        drinks.map((drink) => (
          <Paper key={drink.id} className="drink-list-paper">
            {drink.Pictures && drink.Pictures.length > 0 && (
              <img
                src={`${API_URL.replace('/api', '')}/${drink.Pictures[0].path}`}
                alt={drink.Pictures[0].name}
                className="drink-image"
              />
            )}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{drink.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {drink.description}
              </Typography>
              <Typography variant="body2">
                Avg Rating: {drink.averageRating || 0} | Reviews: {drink.reviewCount}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <DrinkDetail
                drink={drink}
                onUpdateDrink={onUpdateDrink}
                onUploadPicture={onUploadPicture}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDeleteDrink(drink.id)}
                sx={{ mt: 2 }}
              >
                Remove
              </Button>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default DrinkList;
