import axios from 'axios';

export const API_URL = 'http://localhost:4000/api';

export const fetchDrinks = async (params) => {
  const response = await axios.get(`${API_URL}/drinks`, { params });
  return response.data;
};

export const addDrink = async (drinkData) => {
  const response = await axios.post(`${API_URL}/drinks`, drinkData);
  return response.data;
};

export const fetchDrinkById = async (drinkId) => {
  const response = await axios.get(`${API_URL}/drinks/${drinkId}`);
  return response.data;
};

export const addReview = async (drinkId, reviewData) => {
  const response = await axios.post(
    `${API_URL}/drinks/${drinkId}/reviews`,
    reviewData
  );
  return response.data;
};

export const uploadPicture = async (drinkId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(
    `${API_URL}/drinks/${drinkId}/pictures`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const searchDrinks = async (name, offset = 0, length = 10) => {
  const response = await fetch(
    `${API_URL}/drinks?name=${encodeURIComponent(name)}&offset=${offset}&length=${length}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch drinks');
  }
  return response.json();
};

export const deleteDrink = async (drinkId) => {
  await axios.delete(`${API_URL}/drinks/${drinkId}`);
};

export const fetchReviews = async (drinkId, offset = 0, length = 10) => {
  const response = await axios.get(`${API_URL}/drinks/${drinkId}/reviews`, {
      params: { offset, length },
  });
  return response.data;
};

export const deleteReview = async (drinkId, reviewId) => {
  const response = await fetch(`${API_URL}/drinks/${drinkId}/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete review');
  }
};

export const updateReview = async (drinkId, reviewId, reviewData) => {
  const response = await fetch(`${API_URL}/drinks/${drinkId}/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });
  return await response.json();
};