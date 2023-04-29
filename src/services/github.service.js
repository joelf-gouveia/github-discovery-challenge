import axios from "axios";

const BASE_URL = "https://api.github.com/search";
const PERSONAL_TOKEN = process.env.REACT_APP_GITHUB_PERSONAL_TOKEN;
const headers = {
  Authorization: `token ${PERSONAL_TOKEN}`,
  Accept:
    "application/vnd.github.raw",
};

export const getRepositories = (topic, sortBy, sortOrder = "desc") => {
  const topicQuery = `topic:${topic}`;
  const sortQuery = `sort=${sortBy}&order=${sortOrder}`;

  return axios.get(`${BASE_URL}/repositories?q=${topicQuery}&${sortQuery}`, {
    headers,
  });
};

