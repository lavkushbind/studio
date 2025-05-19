
export default function Home() {
  // Intentionally simple to debug routing issues.
  // Check server console for "Minimal Home Page Rendered" to see if this module is hit.
  console.log('Minimal Home Page Rendered');
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Minimal Home Page</h1>
      <p>If you are seeing this, the basic rendering of the root page (/) is working.</p>
      <p>The &quot;route not found /page&quot; error might be caused by something else if it still occurs.</p>
      <a href="/#some-section-test">Test Basic Anchor Link (to hash)</a>
      <br />
      <a href="/teachers/teacher-alice-001">Test Basic Anchor Link (to a teacher profile)</a>
    </div>
  );
}
