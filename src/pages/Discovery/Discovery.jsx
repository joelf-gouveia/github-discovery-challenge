import React, { useEffect, useState } from "react";
import { usePreferences } from "../../hooks";
import { Grid, Typography, Box } from "@mui/material";
import { Chips, Topic, NoData } from "../../components";
import { useAuth } from "../../hooks/AuthProvider";
import uuid from "react-uuid";
import {
  getRepositories,
  DEFAULT_PER_PAGE,
} from "../../services/github.service";
import { updateSpecificDocumentInCollection } from "../../services/user.firebase";
import "./discovery.scss";

export const Discovery = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const {
    preferences,
    onAddPreferences,
    onDeletePreferences,
    onUpdatePreferences,
  } = usePreferences();
  const [cache, setCache] = useState({});
  const [savedBookmarks, setSavedBookmarks] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const { bookmarks } = user;
    setSavedBookmarks(bookmarks);
  }, [user]);

  useEffect(() => {
    preferences.forEach((pf) => {
      if (!cache[pf.topic]) {
        onFetch(pf.topic, pf.orderBy);
      } else if (cache[pf.topic].orderBy !== pf.orderBy) {
        onFetch(pf.topic, pf.orderBy);
      }
    });
  }, [preferences]);

  const parseRepo = (items) =>
    items.map((item) => {
      return {
        id: item.id,
        html_url: item.html_url,
        image_url: `https://opengraph.githubassets.com/1a/${item.full_name}`,
      };
    });

  const onFetch = async (topic, orderBy, isLoadingMore = false) => {
    try {
      const response = isLoadingMore
        ? await getRepositories(
            topic,
            orderBy,
            DEFAULT_PER_PAGE,
            cache[topic].length / DEFAULT_PER_PAGE + 1 // To get the page number.
          )
        : await getRepositories(topic, orderBy);
      const items = response.data.items;
      const repos = parseRepo(items);
      if (!isLoadingMore) {
        setCache((prevState) => ({ ...prevState, [topic]: repos }));
      } else {
        const newRepos = [...cache[topic], ...repos];
        setCache((prevState) => ({
          ...prevState,
          [topic]: newRepos,
        }));
      }
    } catch (err) {
      alert.error("There was an issue fetching repositories");
    }
  };

  const onTopicChange = (topic, isSelected) => {
    if (isSelected) {
      const preferenceTopic = preferences.find((pf) => pf.topic === topic);
      onDeletePreferences(preferenceTopic.id);
    } else {
      const newData = { topic, orderBy: "stars", id: uuid() };
      onAddPreferences(newData);
    }
  };

  const onOrderByChange = (orderBy, topic) => {
    const selectPreference = preferences.find((pf) => pf.topic === topic);
    onUpdatePreferences(selectPreference.id, {
      ...selectPreference,
      orderBy: orderBy,
    });
  };

  const onBookmarkChange = (repository, isSelected) => {
    let bks = {};
    if (isSelected) {
      bks = savedBookmarks.filter((bk) => bk.id !== repository.id);
    } else {
      bks = [...savedBookmarks, repository];
    }

    updateSpecificDocumentInCollection("users", user.uid, { bookmarks: bks });
    setSavedBookmarks(bks);
  };

  const topics = preferences.map((pf) => pf.topic);

  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      {loading && <div>Loading</div>}
      {!loading && (
        <>
          <Topic
            title={`My Bookmarks (${savedBookmarks.length})`}
            noData={<NoData title="No bookmarks found" />}
            showOrderBy={false}
            shouldLoadMore={false}
            onFetch={onFetch}
            cache={savedBookmarks}
            savedBookmarks={savedBookmarks}
            onBookmarkChange={onBookmarkChange}
          />
          <Grid item className="titleContainer">
            <Typography variant="subtitle1">Toggle topics to show</Typography>
            <Chips topics={topics} onClick={onTopicChange} />
          </Grid>
          {Object.keys(cache).map((topic) => {
            const preference = preferences.find((pf) => pf.topic === topic);

            if (preference) {
              return (
                <Topic
                  key={topic}
                  onFetch={onFetch}
                  title={`Top ${topic}`}
                  cache={cache[topic]}
                  preference={preference}
                  savedBookmarks={savedBookmarks}
                  onBookmarkChange={onBookmarkChange}
                  handleOptionSelect={onOrderByChange}
                />
              );
            }
          })}
        </>
      )}
    </Box>
  );
};
