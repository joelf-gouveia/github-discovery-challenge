import axios from "axios";

const BASE_URL = "https://api.github.com/search";
const PERSONAL_TOKEN = process.env.REACT_APP_GITHUB_PERSONAL_TOKEN;
console.log(PERSONAL_TOKEN);
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

export const getContributors = (contributors_url) => {
  return axios.get(contributors_url + "?per_page=1&anon=true", { headers });
};

export const getDependents = (fullname) => {
  return axios.get(
    `${BASE_URL}/repositories?q=dependency:${fullname}&per_page=1`,
    { headers }
  );
};

export const getLanguages = (languages_url) => {
  return axios.get(languages_url, {
    headers: {
      Accept: "application/vnd.github.mercy-preview+json",
      Authorization: `token ${PERSONAL_TOKEN}`,
    },
  });
};
