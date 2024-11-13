import axios from "axios";

const CodeResetPassword = async (Password, code) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/change-password?code=${code}`,
      { password: Password },
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
      if (status === 400 || status === 403) {
        throw new Error(data.message);
      }
    }
    throw new Error("Error en conexión. Inténtelo de nuevo mas tarde.");
  }
};

export default CodeResetPassword;
