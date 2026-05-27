const bootLines = [
  "booting /horse/mode",
  "mounting frontsite shadow: zest.art",
  "checking trapdoors: 6 visible",
  "loading local fragments",
  "operator: dj horsepower",
  "status: unstable but active"
];

export default function BootSequence() {
  return (
    <div className="boot-sequence" aria-label="system initialization">
      {bootLines.map((line, index) => (
        <p key={line} style={{ "--delay": `${index * 110}ms` }}>
          <span>[ok]</span> {line}
        </p>
      ))}
      <p className="boot-ready">
        <span>[ready]</span> type /help or choose a door
      </p>
    </div>
  );
}
