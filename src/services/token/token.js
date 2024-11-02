import axios from "axios";
import { useAuth } from "../../context/AuthContext/AuthContext";

const TokenNofi = async (authToken,datatoken) => {

  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL_SOCKET}/tokens-fcm`,
      datatoken,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default TokenNofi;
