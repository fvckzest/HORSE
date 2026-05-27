const statusItems = [
  ["mode", "horse"],
  ["connection", "unstable / active"],
  ["public site", "zest.art"],
  ["transmission", "open"],
  ["last update", "2026-05-26"],
  ["supabase", "deferred"]
];

export default function StatusPanel() {
  return (
    <aside className="terminal-panel status-panel" aria-labelledby="status-title">
      <div className="panel-titlebar">
        <h2 id="status-title">backend status</h2>
        <span className="status-light">live</span>
      </div>
      <dl>
        {statusItems.map(([term, detail]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
