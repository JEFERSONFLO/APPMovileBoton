import axios from "axios";

export const fetchregister = async (
  nombres,
  dni,
  apellidos,
  password,
  celular,
  pasillo,
  piso,
  email,
  usuario,numeroTienda
) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/register`,
        {
          nombres,
        dni,
        apellidos,
        password,
        celular,
        pasillo,
        piso,
        email,
        usuario,numeroTienda
        },
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
    throw new Error("Error en conexión. Inténtale de nuevo mas tarde.");
  }
};
