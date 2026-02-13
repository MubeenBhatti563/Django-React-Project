import React, { useEffect, useState } from "react";
import api from "../api";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error("Error fetching notes:", err));
  };

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}/`);
      if (res.status === 204) {
        // Filter out the deleted note from state instantly (Optimistic UI)
        setNotes(notes.filter((note) => note.id !== id));
      }
    } catch (err) {
      alert("Could not delete note: " + err.message);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.post("/api/notes/", { content, title });
      if (res.status === 201) {
        setTitle("");
        setContent("");
        getNotes(); // Refresh to get the new note with its ID
      }
    } catch (err) {
      alert("Error creating note: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Styling Object ---
  const styles = {
    wrapper: {
      backgroundColor: "#f0f2f5",
      minHeight: "90vh",
      padding: "40px 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    main: {
      maxWidth: "900px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 350px",
      gap: "30px",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      color: "#1a1a1a",
      marginBottom: "20px",
      borderBottom: "2px solid #3498db",
      display: "inline-block",
      paddingBottom: "5px",
    },
    noteGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    card: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      borderLeft: "5px solid #3498db",
      transition: "transform 0.2s",
    },
    formCard: {
      backgroundColor: "white",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      position: "sticky",
      top: "20px",
      height: "fit-content",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      boxSizing: "border-box",
      fontSize: "0.95rem",
    },
    btnSubmit: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    btnDelete: {
      backgroundColor: "transparent",
      color: "#e74c3c",
      border: "1px solid #e74c3c",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.8rem",
      marginTop: "10px",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.main}>
        {/* Left Side: Notes List */}
        <section>
          <h2 style={styles.sectionTitle}>My Collection</h2>
          <div style={styles.noteGrid}>
            {notes.length === 0 ? (
              <p style={{ color: "#888", fontStyle: "italic" }}>
                Your notebook is empty. Start by adding one!
              </p>
            ) : (
              notes.map((note) => (
                <div key={note.id} style={styles.card} className="note-card">
                  <h3 style={{ margin: "0 0 10px 0", color: "#2c3e50" }}>
                    {note.title}
                  </h3>
                  <p style={{ color: "#555", lineHeight: "1.5", margin: 0 }}>
                    {note.content}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "15px",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", color: "#999" }}>
                      {new Date(note.created_at).toLocaleDateString(undefined, {
                        dateStyle: "long",
                      })}
                    </span>
                    <button
                      style={styles.btnDelete}
                      onClick={() => deleteNote(note.id)}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#e74c3c";
                        e.target.style.color = "white";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#e74c3c";
                      }}
                    >
                      Discard
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Right Side: Create Form */}
        <aside>
          <div style={styles.formCard}>
            <h2
              style={{ ...styles.sectionTitle, borderBottomColor: "#2ecc71" }}
            >
              New Entry
            </h2>
            <form onSubmit={createNote}>
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  color: "#666",
                }}
              >
                Subject
              </label>
              <input
                style={styles.input}
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
              />

              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  color: "#666",
                }}
              >
                Thought
              </label>
              <textarea
                style={{ ...styles.input, height: "120px", resize: "none" }}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
              />

              <button
                style={{
                  ...styles.btnSubmit,
                  backgroundColor: isSubmitting ? "#95a5a6" : "#2ecc71",
                }}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Note"}
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
