import React, { useEffect, useState } from "react";
import { useLocalStorage, usePreferences } from "../../hooks";
import { Grid, Typography } from "@mui/material";
import { Chips, Topic } from "../../components";
import uuid from "react-uuid";
import { getRepositories } from "../../services/github.service";
import { updateSpecificDocumentInCollection } from "../../services/user.firebase";

export const Discovery = () => {
  const [user] = useLocalStorage("users");
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
    console.log("user", user);
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

  const onFetch = async (topic, orderBy) => {
    try {
      const response = await getRepositories(topic, orderBy);
      const items = response.data.items;

      const repos = items.map((item) => {
        return {
          id: item.id,
          html_url: item.html_url,
          image_url: `https://opengraph.githubassets.com/1a/${item.full_name}`,
        };
      });

      setCache((prevState) => ({ ...prevState, [topic]: repos }));
    } catch (err) {
      console.log("error", err);
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
    <Grid container>
      {loading && <div>Loading</div>}
      {!loading && (
        <>
          <Topic
            title={`New Bookmarks (${savedBookmarks.length})`}
            cache={savedBookmarks}
            savedBookmarks={savedBookmarks}
            onBookmarkChange={onBookmarkChange}
            showOrderBy={false}
          />
          <Grid item sx={{ p: 2, ml: 3 }}>
            <Typography variant="subtitle1">Toggle topics to show</Typography>
            <Chips topics={topics} onClick={onTopicChange} />
          </Grid>
          {Object.keys(cache).map((topic) => {
            const preference = preferences.find((pf) => pf.topic === topic);

            if (preference) {
              return (
                <Topic
                  key={topic}
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
    </Grid>
  );
};
