import axios from "axios";

const me = async (authToken) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL_SOCKET}/user/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log("Response data:", response.data);  
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401 || status === 403) {
        throw new Error(data.message);
      }
    }
    throw new Error("Error en conexión. Inténtelo de nuevo mas tarde.");
  }
};
export default me;
