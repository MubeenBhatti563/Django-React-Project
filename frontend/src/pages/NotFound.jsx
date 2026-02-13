import React from "react";
import { Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "88vh",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    color: "#333",
    padding: "20px",
  },
  errorCode: {
    fontSize: "8rem",
    fontWeight: "900",
    margin: "0",
    color: "#dee2e6",
    position: "relative",
  },
  title: {
    fontSize: "2rem",
    marginTop: "-40px",
    marginBottom: "10px",
    color: "#2d3436",
  },
  text: {
    fontSize: "1.1rem",
    color: "#636e72",
    marginBottom: "30px",
    maxWidth: "400px",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
    transition: "background-color 0.2s",
    boxShadow: "0 4px 6px rgba(0,123,255,0.2)",
  },
};

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.title}>Lost in Space?</h2>
      <p style={styles.text}>
        The page you're looking for has vanished into the digital void or never
        existed in the first place.
      </p>
      <Link
        to="/"
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
