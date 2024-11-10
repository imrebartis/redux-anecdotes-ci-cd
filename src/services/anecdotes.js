import axios from "axios";


// eslint-disable-next-line no-undef
const baseUrl = process.env.NODE_ENV === 'production'
  ? "https://redux-anecdotes-ci-cd-green-river-391.fly.dev/anecdotes"
  : "http://localhost:3000/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateVotes = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const anecdote = response.data;
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

  const updateResponse = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return updateResponse.data;
};

export default {
  getAll,
  createNew,
  updateVotes,
};
