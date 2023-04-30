import axios from "axios";

export const DEFAULT_PER_PAGE = 30;
const BASE_URL = "https://api.github.com/search";
const PERSONAL_TOKEN = process.env.REACT_APP_GITHUB_PERSONAL_TOKEN;
const headers = {
  Authorization: `token ${PERSONAL_TOKEN}`,
  Accept: "application/vnd.github.raw",
};

export const getRepositories = (
  topic,
  sortBy,
  sortOrder = "desc",
  page = 1
) => {
  const topicQuery = `topic:${topic}`;
  const sortQuery = `sort=${sortBy}&order=${sortOrder}`;

  return axios.get(
    `${BASE_URL}/repositories?q=${topicQuery}&${sortQuery}&per_page=${DEFAULT_PER_PAGE}&page=${page}`,
    {
      headers,
    }
  );
};
