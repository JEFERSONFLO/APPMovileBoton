import axios from "axios";

const EmailPassword = async (email) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/reset-password`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 404 || status === 403) {
        throw new Error(data.message);
      }
    }
    throw new Error("Error en conexión. Inténtelo de nuevo mas tarde.");
  }
};
/* http://localhost:3000/auth/reset-password
 */
export default EmailPassword;
