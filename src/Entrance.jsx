import { useState } from "react";
import { useAuth } from "./AuthContext";

/** Users can enter their name to receive a token from the API. */
export default function Entrance() {
  const [username, setUsername] = useState("");
  const { signup, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username);
  };

  return (
    <>
      <h1>Cave Entrance</h1>
      <p>Your journey has brought you to the base of a rocky mountain.</p>
      <p>
        The quickest path forward is through the mountain's winding tunnels, but
        a sturdy metal gate sits closed before you.
      </p>
      <p>
        Two giant badgers stand guard on either side of the gate, their eyes
        fixed on you. The one on the left opens its mouth, and with a deep,
        rumbling voice, it asks, "Who approaches? Speak your name."
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button>Respond</button>
      </form>

      {error && (
        <p style={{ color: "crimson", fontStyle: "italic" }}>
          ⚠️ The gate refuses to budge: {error}
        </p>
      )}
    </>
  );
}
