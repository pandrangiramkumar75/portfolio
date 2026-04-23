import PageFooter from '../components/PageFooter';
import SectionCard from '../components/SectionCard';
import { profile } from '../data/profile';

const resumeHref = `${import.meta.env.BASE_URL}${profile.resumeFile}`;

function BulletList({ items }) {
  return (
    <ul className="bullet-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ExperienceCard({ item }) {
  return (
    <SectionCard
      label="PROFESSIONAL_EXPERIENCE"
      title={item.company}
      description={`${item.role} | ${item.location} | ${item.dates}`}
      className="resume-card"
    >
      <p className="resume-card__summary">{item.summary}</p>
      <BulletList items={item.bullets} />
    </SectionCard>
  );
}

function ResumeSubsection({ section }) {
  return (
    <div className="resume-subsection">
      <h3 className="resume-subsection__title">{section.title}</h3>
      <BulletList items={section.items} />
    </div>
  );
}

export default function Resume() {
  const [firstExperience, secondExperience] = profile.experience;

  return (
    <div className="page page--resume">
      <section className="page-intro">
        <p className="eyebrow">RESUME_OVERVIEW</p>
        <h1 className="page-intro__title">Professional Experience</h1>
        <p className="page-intro__description">
          Procurement leadership across cables, polymers, defence, batteries, power systems, and
          AI-powered procurement automation.
        </p>
      </section>

      <div className="resume-stack">
        <ExperienceCard item={firstExperience} />

        <SectionCard
          label="PROFESSIONAL_EXPERIENCE"
          title={secondExperience.company}
          description={`${secondExperience.role} | ${secondExperience.location} | ${secondExperience.dates}`}
          className="resume-card"
        >
          <p className="resume-card__summary">{secondExperience.summary}</p>
          <div className="resume-subsection-grid">
            {secondExperience.sections.map((section) => (
              <ResumeSubsection key={section.title} section={section} />
            ))}
          </div>
        </SectionCard>

        <SectionCard
          label="KEY_ACHIEVEMENTS"
          title="Key Achievements at a Glance"
          className="resume-card"
        >
          <BulletList items={profile.achievements} />
        </SectionCard>

        <SectionCard
          label="INDUSTRY_DOMAIN_EXPERTISE"
          title="Industry & Domain Expertise"
          className="resume-card"
        >
          <div className="industry-grid">
            {profile.industryExpertise.map((group) => (
              <div key={group.title} className="industry-card">
                <h3 className="industry-card__title">{group.title}</h3>
                <BulletList items={group.items} />
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="resume-grid">
          <SectionCard label="EDUCATION" title="Education" className="resume-card">
            <div className="detail-panel__body">
              <p className="detail-panel__headline">{profile.education.degree}</p>
              <p className="detail-panel__meta">{profile.education.university}</p>
              <p className="detail-panel__meta">{profile.education.year}</p>
            </div>
          </SectionCard>

          <SectionCard label="PERSONAL_DETAILS" title="Personal Details" className="resume-card">
            <dl className="details-list details-list--tight">
              {profile.personalDetails.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>
        </div>

        <SectionCard
          label="TRAININGS"
          title="Trainings & Professional Development"
          className="resume-card"
        >
          <BulletList items={profile.trainings} />
        </SectionCard>

      </div>

      <PageFooter
        leftLabel="ALWAL, SECUNDERABAD - 500010"
        links={[
          { label: 'Resume', href: resumeHref },
          { label: 'Email', href: `mailto:${profile.contact.email}` },
          { label: 'Phone', href: `tel:${profile.contact.phones[0]}` },
        ]}
      />
    </div>
  );
}
