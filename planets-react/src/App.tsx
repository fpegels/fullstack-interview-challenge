import "./App.css";
import { useEffect, useState } from "react";
import { api } from "./api";
import { useStoreState } from "./providers/storeProvider";
import { Flights } from "./screens";

function App() {
  const [, setState] = useStoreState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    api.planets
      .get()
      .then((planets) => setState({ planets: planets }))
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [setState]);

  if (error !== "") {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      {loading ? (
        <div className="loading">Loading Planets, please wait...</div>
      ) : (
        <Flights />
      )}
    </div>
  );
}

export default App;
