import { GET_VIEWER } from "./queries";
import { getClient } from "./client";

export async function getViewer(token) {
  try {
    const query = GET_VIEWER;
    const { data } = await getClient(token).query({ query });
    return data;
  } catch (error) {
    console.error("Error fetching viewer data:", error);
    throw error; // Opcional: puedes lanzar el error para manejarlo en el componente que llama a getViewer()
  }
}