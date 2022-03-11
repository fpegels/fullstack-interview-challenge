import { Response, Result } from "./types";

export async function get() {
  try {
    const response = await fetch("http://localhost:3000/planets");
    const data = await response.json();
    return transformResponse(data);
  } catch (error) {
    throw new Error(`API Planets did not respond correctly`);
  }
}

function transformResponse(response: Response): Result {
  return response;
}
