import { Response, Result } from "./types";
import queryString from "query-string";

interface getProps {
  date: string;
  origin: string;
  destination: string;
}

export async function get({ date, origin, destination }: getProps) {
  const query = queryString.stringify({
    date,
    origin,
    destination,
  });

  try {
    const response = await fetch(`http://localhost:3000/flights?${query}`);
    const data = await response.json();
    return transformResponse(data);
  } catch (error) {
    throw new Error(`API Flights did not respond correctly`);
  }
}

function transformResponse(data: Response): Result {
  return data.map((flight) => {
    return {
      ...flight,
      date: flight.data,
      id: `${flight.origin}-${flight.destination}-${flight.data}`,
    };
  });
}
