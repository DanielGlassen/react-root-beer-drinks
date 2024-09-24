import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Typography,
  TextField,
  CircularProgress,
  Snackbar,
  Button,
  Dialog,
  DialogActions,
} from '@mui/material';
import {
  fetchDrinks,
  addDrink,
  searchDrinks,
  uploadPicture,
  deleteDrink
} from '../../services/api';
import DrinkList from '../DrinkList/DrinkList';
import AddDrinkForm from '../AddDrinkForm/AddDrinkForm';
import { debounce, loadDrinks as loadDrinksUtil } from '../../utils/utils';
import './Dashboard.css';

const Dashboard = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const debouncedSearch = useMemo(() => {
    return debounce(async (term) => {
      setLoading(true);
      try {
        if (term) {
          const data = await searchDrinks(term);
          setDrinks(data.items);
        } else {
          await loadDrinksUtil(fetchDrinks, setDrinks, setLoading, setError, setSnackOpen);
        }
      } catch (err) {
        setError('Failed to search drinks');
        setSnackOpen(true);
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleAddDrink = async (newDrink) => {
    await addDrink(newDrink);
    await loadDrinksUtil(fetchDrinks, setDrinks, setLoading, setError, setSnackOpen);
    setDialogOpen(false);
  };

  const handleUploadPicture = async (drinkId, file) => {
    if (!file) return;
    try {
      await uploadPicture(drinkId, file);
      await loadDrinksUtil(fetchDrinks, setDrinks, setLoading, setError, setSnackOpen);
    } catch (err) {
      console.error('Failed to upload picture:', err);
      setSnackOpen(true);
    }
  };

  const handleUpdateDrink = (updatedDrink) => {
    setDrinks((prevDrinks) =>
      prevDrinks.map((drink) =>
        drink.id === updatedDrink.id ? updatedDrink : drink
      )
    );
  };

  const handleDeleteDrink = async (drinkId) => {
    try {
      await deleteDrink(drinkId);
      setDrinks((prevDrinks) => prevDrinks.filter((drink) => drink.id !== drinkId));
    } catch (err) {
      setError('Failed to delete drink');
      setSnackOpen(true);
    }
  };

  useEffect(() => {
    loadDrinksUtil(fetchDrinks, setDrinks, setLoading, setError, setSnackOpen);
  }, []);

  return (
    <Container className="dashboard-container">
      <Typography variant="h4" className="dashboard-title">
        Root Beer Dashboard
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Search for a root beer..."
        value={searchTerm}
        onChange={handleInputChange}
        fullWidth
        className="dashboard-search"
      />
      <Button
        variant="contained"
        color="primary"
        className="add-beer-button"
        sx={{ marginTop: '10px' }}
        onClick={() => setDialogOpen(true)}
      >
        Add Beer
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <AddDrinkForm onAddDrink={handleAddDrink} />
        <DialogActions>
          <Button fullWidth onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {loading ? (
        <CircularProgress />
      ) : (
        <DrinkList
          drinks={drinks}
          onUploadPicture={handleUploadPicture}
          onUpdateDrink={handleUpdateDrink}
          onDeleteDrink={handleDeleteDrink}
        />
      )}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={error}
        className="snackbar"
      />
    </Container>
  );
};

export default Dashboard;
