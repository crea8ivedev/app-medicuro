import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function GoogleLogin() {

  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "outline", size: "large" }
      );
    };

    document.body.appendChild(script);
  }, []);

  const handleCredentialResponse = async (response) => {
    const token = response.credential;

    const res = await fetch("/api/auth/google/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // send cookies if session-based
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    if (data.statusCode == 200) {
       navigate("/dashboard")
    } else {
      console.error("❌ Login failed", data.error);
    }
  };

  return <div id="google-button"></div>;
}