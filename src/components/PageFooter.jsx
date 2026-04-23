export default function PageFooter({ leftLabel, links }) {
  return (
    <footer className="page-footer">
      {leftLabel ? <div className="page-footer__left">{leftLabel}</div> : null}
      <div className="page-footer__links">
        {links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
