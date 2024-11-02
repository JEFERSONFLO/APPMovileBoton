import axios from "axios";

const login = async ({ dataLogin }) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/login`,
      dataLogin,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 404 || status === 403) {
        throw new Error(data.message); 
      }
    }
    throw new Error("Error de conexión. Inténtalo de nuevo.");
  }
};

export default login;
