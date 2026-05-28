export default function CommandDock({ commands }) {
  function getHref(command) {
    if (command === "/about" || command === "/music" || command === "/links") {
      return command;
    }
    if (command === "/exit") {
      return "https://zest.art";
    }
    return "#console-title";
  }

  return (
    <section className="command-dock" aria-labelledby="dock-title">
      <div>
        <p className="eyebrow">visible doors</p>
        <h2 id="dock-title">clickable command shortcuts</h2>
      </div>
      <div className="dock-grid">
        {commands.map((item) => (
          <a className="dock-command" href={getHref(item.command)} key={item.command}>
            <span>{item.command}</span>
            <strong>{item.label}</strong>
            <p>{item.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
