import axios from "axios";

export const api = axios.create({
  baseURL: "http://gateway.marvel.com",
  params: {
    apikey: process.env.NEXT_PUBLIC_MARVEL_KEY,
    ts: process.env.NEXT_PUBLIC_MARVEL_TIMESTAMP,
    hash: process.env.NEXT_PUBLIC_MARVEL_HASH,
  },
});
