import Image from "next/image";
import Link from "next/link";

import {
  marketingContent,
  type MarketingAction,
  type MarketingIconLink,
  type MarketingLink,
} from "./content";
import { MarketingMotion } from "./marketing-motion";
import styles from "./marketing.module.css";

const visibilityStats = [
  { label: "Tracking mode", value: "Automatic" },
  { label: "Data layer", value: "Local-first" },
  { label: "Views", value: "CLI + desktop" },
  { label: "Team layer", value: "Opt-in sync" },
];

const visibilityUseCases = [
  "Feature cost attribution",
  "Prompt quality coaching",
  "Provider comparison",
  "Team efficiency review",
];

const privacyBadges = ["Local-first", "Opt-in sync", "Private coaching", "Raw prompts stay on-device"];

const privacyRows = [
  {
    title: "Encryption and storage boundaries",
    body: "Session intelligence is stored locally by default, with cloud sync only when the user explicitly enables team features.",
    meta: "local · encrypted",
  },
  {
    title: "Team visibility without session exposure",
    body: "Admins and members can see shared performance metrics, but not private coaching notes or raw session content.",
    meta: "metrics only",
  },
  {
    title: "Auditability when it matters",
    body: "Projects, cost, commits, model usage, and trends stay structured enough for team reporting without turning the product into surveillance.",
    meta: "roles · reports",
  },
];

function AppleLogo() {
  return (
    <svg
      aria-hidden="true"
      className={styles.appleLogo}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M16.721 12.771c.022 2.43 2.132 3.239 2.155 3.25-.018.057-.337 1.156-1.109 2.291-.668.98-1.36 1.956-2.452 1.977-1.072.02-1.417-.636-2.644-.636-1.227 0-1.61.616-2.606.656-1.056.04-1.861-1.055-2.535-2.032-1.377-1.992-2.427-5.626-1.015-8.079.702-1.218 1.956-1.99 3.317-2.01 1.036-.02 2.014.697 2.644.697.63 0 1.81-.862 3.05-.735.519.021 1.977.21 2.914 1.58-.076.047-1.74 1.016-1.719 3.041Zm-2.286-5.394c.56-.679.937-1.622.834-2.563-.807.032-1.783.537-2.362 1.216-.519.597-.976 1.56-.854 2.48.896.071 1.802-.454 2.382-1.133Z" />
    </svg>
  );
}

function FooterSocialLink({ link }: { link: MarketingIconLink }) {
  return (
    <a className={styles.footerSocialLink} href={link.href} aria-label={link.label}>
      {link.icon === "x" ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M17.78 3H20.7l-6.38 7.3L21.82 21h-5.88l-4.6-6.02L5.96 21H3.04l6.82-7.8L2.66 3h6.03l4.15 5.5L17.78 3Zm-1.03 16.24h1.61L7.81 4.67H6.08l10.67 14.57Z" />
        </svg>
      ) : null}
      {link.icon === "github" ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.31 6.84 9.66.5.09.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.53 1.05 1.53 1.05.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.05 0-1.11.39-2.01 1.03-2.72-.1-.26-.45-1.31.1-2.74 0 0 .84-.27 2.75 1.04A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.36 1.91-1.31 2.75-1.04 2.75-1.04.55 1.43.2 2.48.1 2.74.64.71 1.03 1.61 1.03 2.72 0 3.92-2.34 4.79-4.57 5.04.36.31.68.92.68 1.86 0 1.35-.01 2.44-.01 2.77 0 .27.18.59.69.49A10.24 10.24 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
        </svg>
      ) : null}
      {link.icon === "instagram" ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </svg>
      ) : null}
    </a>
  );
}

function ActionLink({
  action,
  className,
}: {
  action: MarketingAction;
  className: string;
}) {
  if (action.href.startsWith("mailto:")) {
    return (
      <a className={className} href={action.href}>
        {action.label}
      </a>
    );
  }

  return (
    <Link className={className} href={action.href}>
      {action.label}
    </Link>
  );
}

function FooterLink({ link }: { link: MarketingLink }) {
  if (link.href.startsWith("mailto:")) {
    return <a href={link.href}>{link.label}</a>;
  }

  return <Link href={link.href}>{link.label}</Link>;
}

function SectionRail({
  index,
  label,
  meta,
}: {
  index: string;
  label: string;
  meta: string;
}) {
  return (
    <div className={styles.sectionRail} data-reveal>
      <div className={styles.sectionRailLeft}>
        <span className={styles.sectionRailIndex}>{index}</span>
        <span className={styles.sectionRailLine} aria-hidden="true" />
        <span className={styles.sectionRailLabel}>{label}</span>
      </div>
      <div className={styles.sectionRailMeta}>{meta}</div>
    </div>
  );
}

export function MarketingPage() {
  const { brand, nav, headerActions, hero, product, workflow, score, teams, privacy, cta, footer } =
    marketingContent;

  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.page} data-marketing-root>
      <div className={styles.ambientGlowLeft} aria-hidden="true" />
      <div className={styles.ambientGlowRight} aria-hidden="true" />
      <div className={styles.gridField} aria-hidden="true" />

      <MarketingMotion scopeSelector="[data-marketing-root]" />

      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.navShell} data-nav-shell>
            <Link className={styles.brand} href="#top" aria-label={`${brand} home`}>
              <span className={styles.brandMark} aria-hidden="true" />
              <span>{brand}</span>
            </Link>

            <nav className={styles.nav} aria-label="Primary navigation">
              {nav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className={styles.navActions}>
              <a className={`${styles.button} ${styles.buttonGhost}`} href={headerActions.contact.href}>
                {headerActions.contact.label}
              </a>
              <ActionLink
                action={headerActions.signup}
                className={`${styles.button} ${styles.buttonSolid}`}
              />
            </div>
          </div>
        </div>
      </header>

      <main id="top">
        <section className={styles.hero} data-hero>
          <div className={styles.heroBackdrop} aria-hidden="true">
            <Image
              alt={hero.backdrop.alt}
              className={styles.heroBackdropImage}
              fill
              priority
              src={hero.backdrop.src}
              unoptimized
            />
          </div>
          <div className={styles.heroStatementWrap}>
            <p className={styles.heroStatement} data-hero-copy>
              Local-first AI coding performance intelligence for developers and teams.
            </p>
          </div>
          <div className={styles.heroActionsWrap}>
            <div className={styles.heroActions} data-hero-actions>
              <a
                className={`${styles.button} ${styles.heroButtonLight}`}
                href={hero.primaryAction.href}
              >
                <span>Download</span>
                <AppleLogo />
              </a>
              <ActionLink
                action={hero.secondaryAction}
                className={`${styles.button} ${styles.heroButtonDark}`}
              />
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.storySection}`} id="product">
          <div className={styles.container}>
            <SectionRail
              index="01"
              label="token intelligence"
              meta="available on · claude · codex · cursor · gemini"
            />

            <div className={styles.storyGrid}>
              <div className={styles.storyCopy} data-reveal>
                <h1 className={styles.storyTitle}>
                 tokeIT let you track your token usage and become 
                  <br />
                 <span className={styles.storyTitleFade}>more productive</span>
                </h1>
                <p className={styles.storyText}>
                  From solo developers to engineering teams, tokeIT tracks tokens, cost, time, commits,
                  and efficiency so your AI workflow becomes visible, measurable, and easier to improve.
                </p>

                <div className={styles.storyActions}>
                  <ActionLink
                    action={cta.primaryAction}
                    className={`${styles.button} ${styles.buttonSolid} ${styles.buttonLarge}`}
                  />
                  <ActionLink
                    action={cta.secondaryAction}
                    className={`${styles.button} ${styles.buttonOutline} ${styles.buttonLarge}`}
                  />
                </div>

                <div className={styles.storyMetricRow}>
                  <div className={styles.storyMetric}>
                    <span>tracked tools</span>
                    <strong>6+</strong>
                  </div>
                  <div className={styles.storyMetric}>
                    <span>session mode</span>
                    <strong>automatic</strong>
                  </div>
                  <div className={styles.storyMetric}>
                    <span>team view</span>
                    <strong>opt-in</strong>
                  </div>
                </div>
              </div>

              <div className={styles.storyPanel} data-reveal>
                <div className={styles.storyPanelHead}>
                  <span className={styles.storyPanelHeadLead}>
                    <span className={styles.storyPanelDot} />
                    <span>ready · product tour</span>
                  </span>
                  <span className={styles.storyPanelHeadClock}>-:- / 01:21</span>
                  <span className={styles.storyPanelMeta}>tk_01HAZ7K</span>
                </div>

                <div className={styles.storyPanelBody}>
                  <div className={styles.storyDemoHero}>
                    <div className={styles.storyDemoPlay}>
                      <span className={styles.storyDemoPlayRing} />
                      <span className={styles.storyDemoPlayButton}>▶</span>
                    </div>
                    <div className={styles.storyDemoCopy}>
                      <strong>PLAY PRODUCT TOUR · 01:21</strong>
                      <p>A real session shows how tokeIT tracks tokens, commits, and efficiency.</p>
                    </div>
                  </div>

                  <div className={styles.storyPanelVisual}>
                    <div className={styles.storyVideoFrame}>
                      <Image
                        alt={product.cards[0].media.alt}
                        fill
                        sizes="(max-width: 1100px) 100vw, 720px"
                        src={product.cards[0].media.src}
                      />
                    </div>
                  </div>

                  <div className={styles.storyPanelStats}>
                    <div className={styles.storyPanelStat}>
                      <span>commits</span>
                      <strong>3</strong>
                    </div>
                    <div className={styles.storyPanelStat}>
                      <span>model</span>
                      <strong>claude-3.7</strong>
                    </div>
                    <div className={styles.storyPanelStat}>
                      <span>status</span>
                      <strong>tracked</strong>
                    </div>
                  </div>

                  <div className={styles.storyPanelFooter}>
                    <span>tokens</span>
                    <span>commits</span>
                    <span>efficiency</span>
                    <span>insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.surfaceSection}`} id="workflow" data-workflow>
          <div className={styles.container}>
            <SectionRail index="02" label="two surfaces" meta="dashboard · terminal" />

            <div className={styles.surfaceGrid}>
              <div className={styles.surfaceIntro} data-reveal>
                <h2 className={styles.sectionTitle}>One product, two surfaces, zero friction.</h2>
                <p className={styles.sectionText}>
                  The desktop app gives developers and leads a clear visual dashboard. The CLI keeps
                  the workflow close to the terminal. Both run on the same session intelligence.
                </p>
              </div>

              <div className={styles.surfaceCards}>
                <article className={styles.surfaceCard} data-workflow-primary>
                  <div className={styles.surfaceCardHeader}>
                    <span>desktop app</span>
                    <span>analytics + coaching</span>
                  </div>
                  <div className={styles.surfaceCardMedia}>
                    <Image
                      alt={workflow.stack.primary.alt}
                      fill
                      sizes="(max-width: 1100px) 100vw, 48vw"
                      src={workflow.stack.primary.src}
                    />
                  </div>
                  <div className={styles.surfaceCardBody}>
                    <h3>See the full performance layer.</h3>
                    <p>
                      Time, tokens, cost, commits, score, heatmaps, and coaching are presented in one
                      view that feels operational instead of decorative.
                    </p>
                  </div>
                </article>

                <article className={styles.surfaceCard} data-workflow-secondary>
                  <div className={styles.surfaceCardHeader}>
                    <span>cli</span>
                    <span>install once</span>
                  </div>
                  <div className={styles.surfaceCardMedia}>
                    <Image
                      alt={workflow.stack.secondary.alt}
                      fill
                      sizes="(max-width: 1100px) 100vw, 48vw"
                      src={workflow.stack.secondary.src}
                    />
                  </div>
                  <div className={styles.surfaceCardBody}>
                    <h3>Keep the workflow exactly where you already work.</h3>
                    <ul className={styles.surfaceFeatureList}>
                      {workflow.steps.map((step) => (
                        <li key={step.index}>{step.title}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.visibilitySection}`}>
          <div className={styles.container}>
            <SectionRail index="03" label="visibility" meta="time · tokens · cost · commits" />

            <div className={styles.visibilityBoard} data-reveal>
              <div className={styles.visibilityBoardMain}>
                <span className={styles.visibilityDisplayLabel}>signature readout</span>
                <div className={styles.visibilityDisplay}>time + tokens + cost + commits</div>
                <p className={styles.visibilityText}>
                  The product connects effort to outcomes, which is what makes the data useful. You
                  can finally answer what a feature cost, which model was efficient, and whether the
                  work actually shipped.
                </p>
              </div>

              <div className={styles.visibilityBoardAside}>
                <div className={styles.visibilityBoardImage}>
                  <Image
                    alt={score.media.alt}
                    fill
                    sizes="(max-width: 1100px) 100vw, 560px"
                    src={score.media.src}
                  />
                </div>
              </div>

              <div className={styles.visibilityStats}>
                {visibilityStats.map((stat) => (
                  <div key={stat.label} className={styles.visibilityStat} data-card-pop>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.visibilityUseCases}>
                {visibilityUseCases.map((item) => (
                  <span key={item} className={styles.visibilityUseCase}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.teamSection}`} id="teams">
          <div className={styles.container}>
            <SectionRail index="04" label="scale" meta="individuals · teams" />

            <div className={styles.teamGrid}>
              <div className={styles.teamIntro} data-reveal>
                <h2 className={styles.sectionTitle}>Scale from solo improvement to team visibility.</h2>
                <p className={styles.sectionText}>
                  Start with personal measurement. Expand to team-level visibility only when you need
                  it. That keeps the product sharp for developers while still useful for engineering
                  leads.
                </p>
              </div>

              <div className={styles.teamPanel} data-reveal>
                <div className={styles.teamPanelImage}>
                  <Image
                    alt={teams.media.primary.alt}
                    fill
                    sizes="(max-width: 1100px) 100vw, 58vw"
                    src={teams.media.primary.src}
                  />
                </div>

                <div className={styles.teamPanelNotes}>
                  {teams.points.map((point) => (
                    <div key={point.title} className={styles.teamNoteCard} data-card-pop>
                      <strong>{point.title}</strong>
                      <p>{point.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.privacySection}`} id="privacy">
          <div className={styles.container}>
            <SectionRail index="05" label="privacy & trust" meta="local-first · private by default" />

            <div className={styles.privacyGrid}>
              <div className={styles.privacyIntro} data-reveal>
                <h2 className={styles.sectionTitle}>{privacy.title}</h2>
                <p className={styles.sectionText}>{privacy.description}</p>
              </div>

              <div className={styles.privacyPanel} data-reveal>
                <div className={styles.privacyBadgeRow}>
                  {privacyBadges.map((badge) => (
                    <div key={badge} className={styles.privacyBadge}>
                      {badge}
                    </div>
                  ))}
                </div>

                <div className={styles.privacyRows}>
                  {privacyRows.map((row) => (
                    <div key={row.title} className={styles.privacyRow} data-card-pop>
                      <div>
                        <strong>{row.title}</strong>
                        <p>{row.body}</p>
                      </div>
                      <span className={styles.privacyRowMeta}>{row.meta}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className={styles.footer}>
        <div className={styles.footerShell} data-reveal>
          <div className={`${styles.container} ${styles.footerContent}`}>
            <div className={styles.footerTop}>
              <div className={styles.footerTopCopy}>
                <h2 className={styles.footerHeroTitle}>
                  Measure AI that helps while
                  <br />
                  you build, <span className={styles.footerHeroFade}>not after.</span>
                </h2>
                <p className={styles.footerHeroSubtitle}>{footer.ctaSubtitle}</p>
                <a className={styles.footerHeroButton} href={footer.ctaAction.href}>
                  <AppleLogo />
                  <span>{footer.ctaAction.label}</span>
                </a>
              </div>

              <div className={styles.footerDecor} aria-hidden="true">
                <div className={`${styles.footerKeycap} ${styles.footerKeycapPrimary}`}>{">_"}</div>
                <div className={`${styles.footerKeycap} ${styles.footerKeycapSecondary}`}>{"{}"}</div>
              </div>
            </div>

            <div className={styles.footerDivider} aria-hidden="true" />

            <div className={styles.footerMain}>
              <div className={styles.footerBrandBlock}>
                <div className={styles.footerBrandRow}>
                  <span className={styles.footerBrandMark} aria-hidden="true" />
                  <strong className={styles.footerBrand}>{brand}</strong>
                </div>
                <div className={styles.footerStatus}>
                  <span className={styles.footerStatusDot} aria-hidden="true" />
                  <span>{footer.status}</span>
                </div>
              </div>

              <div className={styles.footerColumns}>
                {footer.columns.map((column) => (
                  <div key={column.title} className={styles.footerColumn}>
                    <span className={styles.footerColumnTitle}>{column.title}</span>
                    <div className={styles.footerLinks}>
                      {column.links.map((link) => (
                        <FooterLink key={link.href} link={link} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.footerMeta}>
              <span>© {currentYear} {brand}. All rights reserved.</span>
              <div className={styles.footerSocials}>
                {footer.socialLinks.map((link) => (
                  <FooterSocialLink key={link.href} link={link} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
