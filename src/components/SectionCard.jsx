export default function SectionCard({ label, title, description, className = '', children }) {
  return (
    <section className={`section-card ${className}`.trim()}>
      <div className="section-card__head">
        <span className="eyebrow">{label}</span>
      </div>
      {title ? <h2 className="section-card__title">{title}</h2> : null}
      {description ? <p className="section-card__description">{description}</p> : null}
      {children}
    </section>
  );
}
