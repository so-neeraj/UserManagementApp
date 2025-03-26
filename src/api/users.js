import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async (page = 1, limit = 10) => {
  // Note: JSONPlaceholder doesn't support real pagination
  // This is just for demonstration
  const response = await axios.get(API_URL);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = response.data.slice(startIndex, endIndex);
  return {
    data: paginatedUsers,
    headers: {
      'x-total-count': response.data.length,
    },
  };
};

export const addUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response;
};