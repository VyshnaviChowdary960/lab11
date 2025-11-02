// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Welcome</h1>
      <p><Link href="/feedback">Go to feedback form</Link></p>
    </div>
  );
}
