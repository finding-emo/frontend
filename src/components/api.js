// src/api.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer 29af196d3bb3b46177f3ec5cbe4c44d8",
  },
});

export const getEmojisFromAPI = async (text, clientId) => {
  try {
    const response = await apiClient.post("/suggestions", {
      text,
      clientId,
    });
    console.log("API Response: ", response);
    const emojis = response.data.emoticonUrls;
    console.log(emojis);
    return emojis;
  } catch (error) {
    console.error("API 호출 중 에러 발생:", error.response.data);
    return [];
  }
};

