// components/FeedbackList.js
import useSWR, { mutate } from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function FeedbackList() {
  const { data, error } = useSWR("/api/feedback", fetcher, { refreshInterval: 0 });

  if (error) return <div>Error loading feedback</div>;
  if (!data) return <div>Loading feedback...</div>;

  const items = data.data || [];

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Feedback ({items.length})</h3>
      <ul style={{ paddingLeft: 0, listStyle: "none" }}>
        {items.map((f) => (
          <li key={f._id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 6, marginBottom: 8 }}>
            <div style={{ fontWeight: "bold" }}>{f.name} <span style={{ color: "#666", fontSize: 12 }}>— {new Date(f.createdAt).toLocaleString()}</span></div>
            <div style={{ marginTop: 6 }}>{f.comment}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
