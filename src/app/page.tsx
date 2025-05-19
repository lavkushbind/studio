
export default function Home() {
  console.log('Minimal Home Page Rendered - Inside Minimal Layout Test (Turbopack test)');
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', border: '2px solid blue', margin: '20px' }}>
      <h1>Minimal Home Page (Root /)</h1>
      <p>This page is intentionally minimal for debugging the "route not found /page" error.</p>
      <p>Check the server console for log messages. Turbopack is currently disabled via package.json for this test.</p>
    </div>
  );
}
