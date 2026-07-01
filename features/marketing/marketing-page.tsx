import Image from "next/image";
import Link from "next/link";

import {
  marketingContent,
  type MarketingAction,
  type MarketingIconLink,
  type MarketingLink,
  type PlaceholderSuggestion,
} from "./content";
import { MarketingMotion } from "./marketing-motion";
import styles from "./marketing.module.css";

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
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
        <span className={`${styles.sectionRailLine} ${styles.sectionRailLineLead}`} aria-hidden="true" />
        <span className={styles.sectionRailLabel}>{label}</span>
        <span className={`${styles.sectionRailLine} ${styles.sectionRailLineTrail}`} aria-hidden="true" />
      </div>
      <div className={styles.sectionRailMeta}>{meta}</div>
    </div>
  );
}

function MediaPlaceholder({
  suggestion,
  theme = "light",
  mode = "instructional",
}: {
  suggestion: PlaceholderSuggestion;
  theme?: "light" | "dark";
  mode?: "instructional" | "presentation";
}) {
  const isPresentation = mode === "presentation";

  return (
    <div
      className={`${styles.mediaPlaceholder} ${
        theme === "dark" ? styles.mediaPlaceholderDark : styles.mediaPlaceholderLight
      }`}
      data-card-pop
    >
      <div className={`${styles.mediaPlaceholderHead} ${isPresentation ? styles.mediaPlaceholderHeadClean : ""}`}>
        <span />
        <span />
        <span />
        {isPresentation ? null : <strong>{suggestion.label}</strong>}
      </div>
      <div className={`${styles.mediaPlaceholderBody} ${isPresentation ? styles.mediaPlaceholderBodyClean : ""}`}>
        <div className={styles.mediaPlaceholderCanvas}>
          {isPresentation ? null : <span className={styles.mediaPlaceholderFormat}>{suggestion.format}</span>}
          <div className={styles.mediaPlaceholderGrid} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        {isPresentation ? null : <p>{suggestion.recommendation}</p>}
      </div>
    </div>
  );
}

function WorkflowVisual({ stepIndex }: { stepIndex: string }) {
  if (stepIndex === "01") {
    return (
      <div className={`${styles.workflowVisualFrame} ${styles.workflowVisualFrameInstall}`} aria-hidden="true">
        <div className={styles.workflowVisualChrome}>
          <span />
          <span />
          <span />
          <strong>desktop install + agent ready</strong>
        </div>
        <div className={styles.workflowVisualCanvas}>
          <div className={styles.workflowInstallDock}>
            <div className={styles.workflowInstallApp}>
              <span className={styles.workflowInstallPulse} />
              <span>tokeIT.app</span>
            </div>
            <div className={styles.workflowInstallStatus}>tracking automatically</div>
          </div>
          <div className={styles.workflowInstallProviders}>
            {["Claude Code", "Cursor", "Copilot", "Codex", "Gemini"].map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <div className={styles.workflowInstallBars}>
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  if (stepIndex === "02") {
    return (
      <div className={`${styles.workflowVisualFrame} ${styles.workflowVisualFrameMeasured}`} aria-hidden="true">
        <div className={styles.workflowVisualChrome}>
          <span />
          <span />
          <span />
          <strong>session measured automatically</strong>
        </div>
        <div className={styles.workflowVisualCanvas}>
          <div className={styles.workflowMetricGrid}>
            <div className={styles.workflowMetricTile}>
              <small>tokens</small>
              <strong>42.8k</strong>
            </div>
            <div className={styles.workflowMetricTile}>
              <small>cost</small>
              <strong>$12.84</strong>
            </div>
            <div className={styles.workflowMetricTile}>
              <small>commits</small>
              <strong>3</strong>
            </div>
            <div className={styles.workflowMetricTile}>
              <small>score</small>
              <strong>82</strong>
            </div>
          </div>
          <div className={styles.workflowOutcomeRail}>
            <span>git activity linked</span>
            <span>lines changed +418 / -96</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.workflowVisualFrame} ${styles.workflowVisualFrameDashboard}`} aria-hidden="true">
      <div className={styles.workflowVisualChrome}>
        <span />
        <span />
        <span />
        <strong>dashboard + coaching view</strong>
      </div>
      <div className={styles.workflowVisualCanvas}>
        <div className={styles.workflowHeatmap}>
          {Array.from({ length: 35 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.workflowInsightStack}>
          <div className={styles.workflowInsightCard}>
            <small>insight</small>
            <strong>Retry rate is costing you spend.</strong>
          </div>
          <div className={styles.workflowInsightCardMuted}>
            <small>next move</small>
            <span>Tighten prompts and reuse context windows.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarketingPage() {
  const {
    brand,
    nav,
    headerActions,
    hero,
    story,
    providerView,
    showcase,
    bridge,
    teamIntel,
    privacy,
    workflow,
    footer,
  } = marketingContent;

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
              <a className={styles.navActionLink} href={headerActions.contact.href}>
                {headerActions.contact.label}
              </a>
              <ActionLink action={headerActions.signup} className={styles.navActionLink} />
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
              {hero.title}
            </p>
          </div>
          <div className={styles.heroActionsWrap}>
            <div className={styles.heroActions} data-hero-actions>
              <ActionLink action={hero.primaryAction} className={`${styles.button} ${styles.heroButtonLight}`} />
              <ActionLink action={hero.secondaryAction} className={`${styles.button} ${styles.heroButtonDark}`} />
            </div>
          </div>
          <div className={styles.heroMeta}>
            <p className={styles.heroSubtitle}>{hero.subtitle}</p>
            <div className={styles.trustStrip}>
              <span className={styles.trustLabel}>Trusted by</span>
              <div className={styles.trustItems}>
                {hero.trustItems.map((item) => (
                  <span key={item} className={styles.trustItem}>
                    {item}
                  </span>
                ))}
              </div>
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
                <h1 className={styles.storyTitle}>{story.title}</h1>
                <p className={styles.storyText}>{story.description}</p>

                <div className={styles.storyActions}>
                  <ActionLink
                    action={story.primaryAction}
                    className={`${styles.storyActionLink} ${styles.storyActionLinkSolid}`}
                  />
                  <ActionLink
                    action={story.secondaryAction}
                    className={`${styles.storyActionLink} ${styles.storyActionLinkOutline}`}
                  />
                </div>

                <div className={styles.storyMetricRow}>
                  {story.metrics.map((item) => (
                    <div key={item.label} className={styles.storyMetric}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
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
                    </div>
                  </div>

                  <div className={styles.storyPanelVisual}>
                    <MediaPlaceholder suggestion={story.videoSuggestion} mode="presentation" />
                  </div>

                  <div className={styles.storyPanelStats}>
                    {story.panelStats.map((item) => (
                      <div key={item.label} className={styles.storyPanelStat}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                    ))}
                  </div>

                  <div className={styles.storyPanelFooter}>
                    {story.panelFooter.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.providerSection}`} id="platform">
          <div className={styles.container}>
            <SectionRail
              index="02"
              label="platform"
              meta="developer-ready · team-ready"
            />

            <div className={styles.providerGrid}>
              <div className={styles.providerCopy} data-reveal>
                <h2 className={styles.sectionTitleWide}>{providerView.title}</h2>
                <p className={styles.sectionText}>{providerView.description}</p>
                <div className={styles.providerBadgeRow}>
                  {providerView.callouts.map((callout) => (
                    <div key={callout.title} className={styles.providerBadge}>
                      <strong>{callout.title}</strong>
                      <p>{callout.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.providerVisual} data-reveal>
                <MediaPlaceholder suggestion={providerView.mediaSuggestion} />
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.workflowSection}`} id="workflow">
          <div className={styles.container}>
            <SectionRail
              index="03"
              label="how it works"
              meta="install · measure · improve"
            />

            <div className={styles.workflowIntro}>
              <div className={styles.workflowIntroLead} data-reveal>
                <h2 className={styles.sectionTitleWide}>{workflow.title}</h2>
              </div>

              <div className={styles.workflowIntroSupport} data-reveal>
                <p className={styles.sectionText}>{workflow.description}</p>
                <div className={styles.workflowProofRow}>
                  {workflow.proof.map((item) => (
                    <span key={item} className={styles.workflowProofBadge}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.workflowShell} data-reveal>
              {workflow.steps.map((step) => (
                <article key={step.index} className={styles.workflowMoment} data-card-pop>
                  <div className={styles.workflowMomentMarker} aria-hidden="true">
                    <span className={styles.workflowMomentDot} />
                  </div>

                  <div className={styles.workflowMomentCopy}>
                    <div className={styles.workflowMomentMeta}>
                      <span className={styles.workflowStepIndex}>{step.index}</span>
                      <code className={styles.workflowCommand}>{step.command}</code>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <ul className={styles.workflowPointList}>
                      {step.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.workflowMomentVisual}>
                    <WorkflowVisual stepIndex={step.index} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.showcaseSection}`} data-showcase-section>
          <div className={styles.container}>
            <SectionRail
              index="04"
              label="product layers"
              meta="scroll-synced showcase · scrubbed"
            />
            <div className={styles.showcaseIntro} data-reveal>
              <h2 className={styles.sectionTitleWide}>{showcase.title}</h2>
              <p className={styles.sectionText}>{showcase.description}</p>
            </div>
          </div>

          <div className={styles.showcasePinnedScene} data-showcase-pin>
            <div className={styles.showcaseDepthBack} data-showcase-depth-back aria-hidden="true" />
            <div className={styles.showcaseDepthMid} data-showcase-depth-mid aria-hidden="true" />
            <div className={styles.showcaseDepthFront} data-showcase-depth-front aria-hidden="true" />

            <div className={styles.showcaseStageFrame}>
              <div className={styles.showcaseStage} data-showcase-stage>
                <div className={styles.showcaseSlides}>
                  {showcase.layers.map((layer, index) => (
                    <article key={layer.title} className={styles.showcaseSlide} data-showcase-slide>
                      <div className={styles.showcaseSlideSurface}>
                        <MediaPlaceholder suggestion={layer.suggestion} />
                      </div>
                      <div className={styles.showcaseSlideContent}>
                        <span className={styles.showcaseLayerLabel}>{`0${index + 1} · ${layer.label}`}</span>
                        <h3>{layer.title}</h3>
                        <p>{layer.body}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className={styles.showcaseLayerRail}>
                  {showcase.layers.map((layer, index) => (
                    <span key={layer.title} className={styles.showcaseLayerRailItem} data-showcase-rail-item>
                      {`0${index + 1} ${layer.label}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.bridgeSection}`}>
          <div className={styles.container}>
            <SectionRail
              index="05"
              label="individuals to teams"
              meta="start solo · scale later"
            />

            <div className={styles.bridgeIntro} data-reveal>
              <h2 className={styles.sectionTitleWide}>{bridge.title}</h2>
              <p className={styles.sectionText}>{bridge.description}</p>
            </div>

            <div className={styles.bridgeGrid}>
              <article className={styles.bridgeCard} data-card-pop>
                <span className={styles.bridgeCardLabel}>solo</span>
                <h3>{bridge.solo.title}</h3>
                <ul>
                  {bridge.solo.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>

              <article className={styles.bridgeCard} data-card-pop>
                <span className={styles.bridgeCardLabel}>team</span>
                <h3>{bridge.team.title}</h3>
                <ul>
                  {bridge.team.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.teamIntelSection}`}>
          <div className={styles.container}>
            <SectionRail
              index="06"
              label="team intelligence"
              meta="leaderboard · projects · trend analysis"
            />

            <div className={styles.teamIntelGrid}>
              <div className={styles.teamIntelVisual} data-reveal>
                <MediaPlaceholder suggestion={teamIntel.mediaSuggestion} />
              </div>

              <div className={styles.teamIntelCopy} data-reveal>
                <h2 className={styles.sectionTitleWide}>{teamIntel.title}</h2>
                <p className={styles.sectionText}>{teamIntel.description}</p>

                <div className={styles.teamIntelMetrics}>
                  {teamIntel.metrics.map((metric) => (
                    <div key={metric.label} className={styles.teamIntelMetric} data-card-pop>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.privacySection}`} id="privacy">
          <div className={styles.container}>
            <SectionRail
              index="07"
              label="local-first privacy"
              meta="raw prompts stay on-device"
            />

            <div className={styles.privacyShell}>
              <div className={styles.privacyIntro} data-reveal>
                <h2 className={styles.sectionTitleWide}>{privacy.title}</h2>
                <p className={styles.sectionText}>{privacy.description}</p>
              </div>

              <div className={styles.privacyBadgeRow}>
                {privacy.badges.map((badge) => (
                  <div key={badge} className={styles.privacyBadge}>
                    {badge}
                  </div>
                ))}
              </div>

              <div className={styles.privacyRows}>
                {privacy.rows.map((row) => (
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
