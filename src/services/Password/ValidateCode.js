import axios from "axios";

const ValidateCode = async (codeString) => {
  console.log("codigo",codeString)
  try {
    const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/validate-reset-code?code=${codeString}`,
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
    throw new Error("Error en conexión. Inténtelo de nuevo más tarde.");
  }
};

export default ValidateCode;
/*  http://localhost:3000/auth/validate-reset-code?code=V7SDSD
 */
