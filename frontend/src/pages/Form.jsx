import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const name = method === "login" ? "Login" : "Register";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Inline Styles ---
  const styles = {
    formContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "50px auto",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      backgroundColor: "#ffffff",
    },
    input: {
      width: "90%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "1rem",
    },
    button: {
      width: "95%",
      padding: "12px",
      marginTop: "20px",
      backgroundColor: loading ? "#ccc" : "#4a90e2",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: loading ? "not-allowed" : "pointer",
      fontSize: "1.1rem",
      fontWeight: "bold",
      transition: "0.3s ease",
    },
    loader: {
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #3498db",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      animation: "spin 2s linear infinite",
      margin: "0 auto",
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h1 style={{ color: "#333", marginBottom: "20px" }}>{name}</h1>
      <input
        style={styles.input}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={styles.button} type="submit" disabled={loading}>
        {loading ? "Processing..." : name}
      </button>

      {/* Simple footer for context */}
      <p style={{ marginTop: "15px", fontSize: "0.9rem", color: "#666" }}>
        {method === "login" ? (
          <>
            Don't have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/login">
              Login
            </Link>
          </>
        )}
      </p>
    </form>
  );
};

export default Form;
