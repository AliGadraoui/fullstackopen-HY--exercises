import axios from 'axios';

const baseUrl = 'https://phonebook-backend-8z1o.onrender.com/api/persons';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const create = newPerson => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
};

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data);
};

export default { getAll, create, remove };
