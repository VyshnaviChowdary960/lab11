// pages/feedback.js
import Head from "next/head";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import { mutate } from "swr";

export default function FeedbackPage() {
  // on form success, revalidate feedback list
  const handleSuccess = (createdItem) => {
    // re-fetch list
    mutate("/api/feedback");
  };

  return (
    <>
      <Head>
        <title>Feedback — Full Stack</title>
      </Head>
      <main style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
        <h1>Feedback</h1>
        <p>Submit your name and comment. Feedback will be displayed below in real-time.</p>

        <FeedbackForm onSuccess={handleSuccess} />

        <FeedbackList />
      </main>
    </>
  );
}
