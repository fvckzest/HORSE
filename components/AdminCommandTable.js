const adminCommands = [
  "/add",
  "/list",
  "/delete slug",
  "/refresh",
  "/clear",
  "/logout"
];

export default function AdminCommandTable() {
  return (
    <aside className="admin-command-table" aria-label="admin commands">
      <strong>admin</strong>
      <ul>
        {adminCommands.map((command) => (
          <li key={command}>{command}</li>
        ))}
      </ul>
    </aside>
  );
}
