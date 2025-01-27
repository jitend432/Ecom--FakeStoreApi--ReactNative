import axios from "axios";
import { Products } from "./apiUrls";



  export const GetProducts = async () => {
      try {
        const response = await axios.get(Products);
        return response.data;
      } catch (error) {
        console.error("Error Fetching data:", error);
        throw error;
      }
  };



