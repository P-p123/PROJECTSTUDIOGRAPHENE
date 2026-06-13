import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
});

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (task) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

export const updateTask = async (taskId, task) => {
  const response = await api.put(`/tasks/${taskId}`, task);
  return response.data;
};

export const toggleTaskCompletion = async (taskId) => {
  const response = await api.patch(`/tasks/${taskId}/toggle`);
  return response.data;
};

export const deleteTask = async (taskId) => {
  await api.delete(`/tasks/${taskId}`);
};
