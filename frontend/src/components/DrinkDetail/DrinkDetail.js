import React, { useState, useEffect } from 'react';
import { fetchDrinkById, addReview, fetchReviews, deleteReview, updateReview } from '../../services/api';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddReviewForm from '../AddReviewForm/AddReviewForm';
import './DrinkDetail.css';

const DrinkDetail = ({ drink, onUpdateDrink, onUploadPicture }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      const data = await fetchDrinkById(drink.id);
      setDetails(data);
      await loadReviews(data.id);
      setLoading(false);
    };
    loadDetails();
  }, [drink.id]);

  const loadReviews = async (drinkId) => {
    const reviewData = await fetchReviews(drinkId);
    setReviews(reviewData.items);
  };

  const handleAddReview = async (review) => {
    await addReview(drink.id, review);
    await loadReviews(drink.id);
  };

  const handleRemoveReview = async (reviewId) => {
    await deleteReview(drink.id, reviewId);
    await loadReviews(drink.id);
  };

  const handleEditReview = async (review) => {
    await updateReview(drink.id, selectedReview.id, review);
    await loadReviews(drink.id);
    setEditDialogOpen(false);
  };

  const handleOpenEditDialog = (review) => {
    setSelectedReview(review);
    setEditDialogOpen(true);
  };

  const handleCloseDialog = async () => {
    setReviewDialogOpen(false);
    const updatedData = await fetchDrinkById(drink.id);
    onUpdateDrink(updatedData);
  };

  if (loading) return <Typography className="loading">Loading...</Typography>;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setReviewDialogOpen(true)}
        className="add-review-button"
      >
        Add a Review
      </Button>

      <Dialog
        open={reviewDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add a Review for {details.name}</DialogTitle>
        <DialogContent>
          <AddReviewForm
            drink={drink}
            onAddReview={handleAddReview}
            onUploadPicture={onUploadPicture}
          />
          <Typography variant="h6" className="reviews-title">
            Reviews
          </Typography>
          {reviews.length > 0 ? (
            <table className="reviews-table">
              <thead>
                <tr>
                  <th className="table-header">User</th>
                  <th className="table-header">Rating</th>
                  <th className="table-header">Comment</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review.id}>
                    <td className="table-cell">{review.user_name}</td>
                    <td className="table-cell">{review.rating}</td>
                    <td className="table-cell">{review.description}</td>
                    <td className="table-cell">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                    <td className="table-cell">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleRemoveReview(review.id)}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenEditDialog(review)}
                        sx={{ ml: 1 }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography>No reviews found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button fullWidth={true} onClick={handleCloseDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent>
          {selectedReview && (
            <AddReviewForm
              drink={drink}
              selectedValue={selectedReview}
              onAddReview={handleEditReview}
              initialValues={selectedReview} 
              onUploadPicture={onUploadPicture}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button fullWidth={true} onClick={() => setEditDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DrinkDetail;
