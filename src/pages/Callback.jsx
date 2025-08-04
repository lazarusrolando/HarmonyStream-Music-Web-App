import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const accessToken = params.get("access_token");
    const expiresIn = parseInt(params.get("expires_in"), 10);

    if (accessToken && expiresIn) {
      const expiresAt = Date.now() + expiresIn * 1000;

      localStorage.setItem("spotify_access_token", accessToken);
      localStorage.setItem("spotify_token_expires_at", expiresAt.toString());

      navigate("/"); // Redirect to home/dashboard
    } else {
      alert("Spotify authentication failed.");
      navigate("/login");
    }
  }, [navigate]);

  return <p>Logging you in with Spotify...</p>;
};

export default Callback;
