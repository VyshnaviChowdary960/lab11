// components/FeedbackForm.js
import { useState } from "react";
import axios from "axios";

export default function FeedbackForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validate() {
    if (!name.trim()) return "Name is required";
    if (!comment.trim()) return "Comment is required";
    if (name.length > 100) return "Name too long (max 100 chars)";
    if (comment.length > 1000) return "Comment too long (max 1000 chars)";
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    try {
      const payload = { name: name.trim(), comment: comment.trim() };
      const res = await axios.post("/api/feedback", payload);
      if (res.data?.success) {
        setName("");
        setComment("");
        if (onSuccess) onSuccess(res.data.data);
      } else {
        setError(res.data?.error || "Unknown error");
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
      <div style={{ marginBottom: 8 }}>
        <label>
          Name
          <br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            disabled={loading}
          />
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Comment
          <br />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={1000}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            disabled={loading}
          />
        </label>
      </div>

      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

      <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}
