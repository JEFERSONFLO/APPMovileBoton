import axios from "axios";


const update = async (authToken, dataUser) => {
  try {
    const response = await axios.patch(
      `${process.env.EXPO_PUBLIC_API_URL_SOCKET}/user/me`,
      dataUser, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    
    if (response.status !== 200) {
      throw new Error("Error al actualizar los datos del usuario");
    }

    return response.data;
  } catch (error) {
    console.error("Error en update:", error);
    throw error;
  }
};

export default update; 