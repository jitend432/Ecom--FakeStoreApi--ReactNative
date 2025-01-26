import axios from "axios";
import { Products } from "./apiUrls";


export const GetProducts = async () => {
    const producturl = `${Products}`;
    return  axios.get(producturl)
    .then(response => {
      return response.data;
  })
    .catch(error => {
      console.error("Error fetching data: ", error)
      throw error;
  })
  }
