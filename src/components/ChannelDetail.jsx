import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useReducer } from "react";

const initialState = {
  channelDetail: null,
  videos: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "videos":
      return { ...state, videos: action.payload };
    case "channelDetail":
      return { ...state, channelDetail: action.payload };
    default:
      return state;
  }
};

const ChannelDetail = () => {
  // const [channelDetail, setChannelDetail] = useState();
  // const [videos, setVideos] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);
      dispatch({ type: "channelDetail", payload: data?.items[0] });
      // setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(
        `search?channelId=${id}&part=snippet%2Cid&order=date`
      );
      dispatch({ type: "video", payload: videosData?.items });
      // setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            height: "300px",
            background:
              "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={state.channelDetail} marginTop="-93px" />
      </Box>
      <Box p={2} display="flex">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={state.videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
