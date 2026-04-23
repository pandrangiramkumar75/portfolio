import { Link } from 'react-router-dom';
import PageFooter from '../components/PageFooter';
import SectionCard from '../components/SectionCard';
import { profile } from '../data/profile';

const resumeHref = `${import.meta.env.BASE_URL}${profile.resumeFile}`;

function ContactFacts() {
  return (
    <dl className="hero-facts">
      <div>
        <dt>Phone</dt>
        <dd>
          {profile.contact.phones.map((phone, index) => (
            <span key={phone}>
              {index > 0 ? ' / ' : ''}
              {phone}
            </span>
          ))}
        </dd>
      </div>
      <div>
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
        </dd>
      </div>
      <div>
        <dt>Location</dt>
        <dd>{profile.contact.location}</dd>
      </div>
      <div>
        <dt>Focus</dt>
        <dd>{profile.subtitle}</dd>
      </div>
    </dl>
  );
}

export default function Home() {
  return (
    <div className="page page--home">
      <SectionCard label="ABOUT_ME" title={profile.name} className="hero-card">
        <div className="hero-card__top">
          <div className="hero-card__copy">
            <p className="hero-card__role">{profile.title}</p>
            <p className="hero-card__subtitle">{profile.subtitle}</p>
            <div className="hero-card__summary">
              {profile.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="cta-row">
              <Link to="/resume" className="cta">
                <span className="material-symbols-outlined" aria-hidden="true">
                  description
                </span>
                VIEW_RESUME
              </Link>
              <a href={`mailto:${profile.contact.email}`} className="cta cta--secondary">
                <span className="material-symbols-outlined" aria-hidden="true">
                  mail
                </span>
                CONTACT
              </a>
            </div>
          </div>

          <div className="hero-card__panel">
            <ContactFacts />
            <div className="chip-row chip-row--wrap hero-card__chips">
              {profile.heroHighlights.map((highlight) => (
                <span key={highlight} className="chip chip--ghost">
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="info-grid info-grid--home">
        <SectionCard label="CORE_COMPETENCIES" title="Core Competencies" className="skills-card">
          <div className="competency-grid">
            {profile.competencyGroups.map((group) => (
              <div key={group.title} className="competency-card">
                <h3 className="competency-card__title">{group.title}</h3>
                <div className="competency-card__list">
                  {group.items.map((item) => (
                    <div key={item} className="competency-card__item">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard label="EDUCATION_PERSONAL" title="Education & Personal Details">
          <div className="detail-stack">
            <div className="detail-panel">
              <h3 className="detail-panel__title">Education</h3>
              <div className="detail-panel__body">
                <p className="detail-panel__headline">{profile.education.degree}</p>
                <p className="detail-panel__meta">{profile.education.university}</p>
                <p className="detail-panel__meta">{profile.education.year}</p>
              </div>
            </div>

            <div className="detail-panel">
              <h3 className="detail-panel__title">Personal Details</h3>
              <dl className="details-list details-list--tight">
                {profile.personalDetails.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </SectionCard>
      </div>

      <PageFooter
        leftLabel="26+ YEARS | PROCUREMENT & SUPPLY CHAIN"
        links={[
          { label: 'Resume', href: resumeHref },
          { label: 'Email', href: `mailto:${profile.contact.email}` },
        ]}
      />
    </div>
  );
}
