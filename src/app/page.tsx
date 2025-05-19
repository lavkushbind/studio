
export default function Home() {
  console.log('Minimal Home Page Rendered - Inside Minimal Layout Test');
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', border: '2px solid red' }}>
      <h1>Minimal Home Page (Root /)</h1>
      <p>If you are seeing this, the minimal page.tsx and layout.tsx are rendering.</p>
      <p>Check the server console for log messages.</p>
    </div>
  );
}
