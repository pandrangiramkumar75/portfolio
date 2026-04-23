function DashboardVisual() {
  return (
    <div className="project-visual project-visual--dashboard" aria-hidden="true">
      <div className="project-visual__chrome">
        <span />
        <span />
        <span />
      </div>
      <div className="project-visual__layout">
        <div className="project-visual__sidebar">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="project-visual__content">
          <div className="project-visual__line project-visual__line--short" />
          <div className="project-visual__line" />
          <div className="project-visual__line project-visual__line--medium" />
          <div className="project-visual__grid">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <div className="project-visual__metric">
        <strong>99.8%</strong>
        <span>UPTIME</span>
      </div>
    </div>
  );
}

function WaveVisual() {
  return (
    <div className="project-visual project-visual--waves" aria-hidden="true">
      <div className="project-visual__wave project-visual__wave--one" />
      <div className="project-visual__wave project-visual__wave--two" />
      <div className="project-visual__wave project-visual__wave--three" />
      <div className="project-visual__wave project-visual__wave--four" />
      <div className="project-visual__wave project-visual__wave--five" />
    </div>
  );
}

export default function ProjectCard({ project }) {
  const visual = project.visual === 'waves' ? <WaveVisual /> : <DashboardVisual />;

  return (
    <article className="project-card">
      <div className="project-card__label">{project.label}</div>
      <div className="project-card__media">{visual}</div>
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__footer">
          <div className="project-card__tags" aria-label="Tech stack">
            {project.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="github-button">
            <span className="material-symbols-outlined" aria-hidden="true">
              open_in_new
            </span>
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
