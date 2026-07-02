



import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Zap, 
  TrendingUp, 
  Layers3, 
  Laptop, 
  ShieldCheck,
  Eye,
  
} from 'lucide-react';
import styles from './QuoteFlowApp.module.css';

interface TemplateItem {
  id: number;
  title: string;
  cost: string;
  color: string;
}

interface TargetUserItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const TEMPLATES: TemplateItem[] = [
  { id: 1, title: 'SaaS Platform Pitch', cost: '$12,500', color: 'linear-gradient(135deg, #a855f7 0%, #4f46e5 100%)' },
  { id: 2, title: 'UI/UX Design Retainer', cost: '$4,800', color: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' },
  { id: 3, title: 'AI Automation Scope', cost: '$24,000', color: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' },
];

const TARGET_USERS: TargetUserItem[] = [
  { title: 'Software & Web Agencies', desc: 'Standardize engineering sprints and architecture pricing tiers.', icon: <Laptop size={20} /> },
  { title: 'UI/UX Design Studios', desc: 'Package design discoveries, wireframing, and interactive prototype sprints.', icon: <Sparkles size={20} /> },
  { title: 'Digital Marketing Teams', desc: 'Deploy monthly ad-spend retainers and SEO packages in seconds.', icon: <TrendingUp size={20} /> },
  { title: 'Freelancers & Startups', desc: 'Protect margins with automatic tax calculations and fixed timeline guards.', icon: <ShieldCheck size={20} /> },
];

export function QuoteFlowApp(): React.JSX.Element {
  const [activeDeckIndex, setActiveDeckIndex] = useState<number>(0);
  
  const [selectedServicePrice] = useState<number>(5000);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const [rotateX, setRotateX] = useState<number>(10);
  const [rotateY, setRotateY] = useState<number>(-6);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 15);
    setRotateY(x / 20);
  };

  const handleMouseLeave = (): void => {
    setRotateX(10);
    setRotateY(-6);
  };

  const rotateDeck = (): void => {
    setActiveDeckIndex((prev) => (prev + 1) % TEMPLATES.length);
  };


  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.6 }
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <motion.div style={{ y: backgroundY }} className={styles.ambientSparkleOrb} />
      <motion.div style={{ y: backgroundY }} className={styles.lightningBlueOrb} />

      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={styles.globalHeader}
      >
        <div className={styles.headerInner}>
          <div className={styles.brandContainer}>
            <div className={styles.logoIcon}>
              <div className={styles.logoInnerDot} />
            </div>
            <span className={styles.logoText}>quoteflow</span>
          </div>
          
          <nav className={styles.centerNavLinks}>
            <a href="#hero" className={styles.navLinkItem}>Overview</a>
            <a href="#showcase" className={styles.navLinkItem}>App Preview</a>
            <a href="#engine" className={styles.navLinkItem}>Live Engine</a>
            <a href="#solutions" className={styles.navLinkItem}>Matrix</a>
          </nav>

          <div className={styles.headerActions}>
            <button className={styles.clientLoginBtn}>Client Login</button>
          </div>
        </div>
      </motion.header>

      <main className={styles.mainContent}>
        
        {/* SECTION 1: HERO CANVAS */}
        <motion.section 
          id="hero" 
          style={{ scale: heroScale }}
          className={styles.heroSection}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={revealVariants} className={styles.pillBadge}>
            <Sparkles size={12} />
            <span>A Premium SaaS Engine by Revaya Digital</span>
          </motion.div>

          <motion.h1 variants={revealVariants} className={styles.heroHeading}>
            Expanding the <br />
            <span className={styles.glowText}>proposal frontier</span> <br />
            with builders.
          </motion.h1>

          <motion.p variants={revealVariants} className={styles.heroParagraph}>
            QuoteFlow is an elegant document generation suite built for modern digital agencies. 
            Turn pricing rules into catalog presets, configure custom client options, and deploy beautiful quotes instantly.
          </motion.p>

          <motion.div variants={revealVariants} className={styles.actionRow}>
            <motion.a 
              href="#engine" 
              className={styles.primaryPill}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Live Engine <ArrowRight size={16} />
            </motion.a>
          </motion.div>

          <motion.div variants={revealVariants} className={styles.deckVisualizer}>
            <div className={styles.cardTrack} onClick={rotateDeck}>
              {TEMPLATES.map((item, index) => {
                const positionIndex = (index - activeDeckIndex + TEMPLATES.length) % TEMPLATES.length;
                const isFrontCard = positionIndex === 0;

                return (
                  <motion.div
                    key={item.id}
                    className={styles.proposalVisualCard}
                    style={{ 
                      background: item.color, 
                      zIndex: TEMPLATES.length - positionIndex 
                    }}
                    animate={{
                      x: positionIndex * 50 - (TEMPLATES.length * 25),
                      y: positionIndex * -24,
                      scale: 1 - positionIndex * 0.08,
                      rotate: positionIndex * 3,
                      opacity: positionIndex === 0 ? 1 : positionIndex === 1 ? 0.7 : 0.25,
                      filter: `blur(${positionIndex * 1.5}px)`,
                    }}
                    whileHover={isFrontCard ? {
                      y: -35,
                      scale: 1.04,
                      boxShadow: "0 40px 80px rgba(168, 85, 247, 0.35)"
                    } : {}}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 260, 
                      damping: 22
                    }}
                  >
                    <div className={styles.cardInnerContent}>
                      <div className={styles.cardTopBar}>
                        <div className={styles.cardTopLeft}>
                          <FileText size={22} />
                          <span className={styles.cardBrandTitle}>REVAYA PROPOSAL</span>
                        </div>
                        <span className={styles.cardBadge}>
                          {isFrontCard ? "⚡ Interactive Template" : "Preset"}
                        </span>
                      </div>
                      
                      <div className={styles.cardBottomMeta}>
                        <h3>{item.title}</h3>
                        <div className={styles.priceContainer}>
                          <p className={styles.cardCost}>{item.cost}</p>
                          {isFrontCard && (
                            <span className={styles.clickHintTag}>Click to Swap Layer</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.section>

        {/* SECTION 2: PRODUCT SCREENSHOT PREVIEW */}
        <motion.section 
          id="showcase" 
          className={styles.centerSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
        >
          <div className={styles.sectionMeta}>
            <Eye size={16} />
            <span>IMMERSIVE DASHBOARD PREVIEW</span>
          </div>
          <h2 className={styles.sectionHeading}>Engineered for absolute clarity.</h2>
          <p className={styles.sectionDesc}>
            A design ecosystem structured to drop complex deal variables into unified, modern transaction templates.
          </p>

          <div className={styles.perspectiveStage}>
            <div className={styles.glowUnderlay} />
            
            <motion.div 
              className={styles.threeDContainer}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ rotateX, rotateY }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            >
              <div className={styles.mainAppScreenshotFrame}>
                <div className={styles.appWindowHeader}>
                  <div className={styles.windowDotsRow}>
                    <span className={`${styles.dot} ${styles.redDot}`} />
                    <span className={`${styles.dot} ${styles.yellowDot}`} />
                    <span className={`${styles.dot} ${styles.greenDot}`} />
                  </div>
                  <div className={styles.appWindowAddress}>app.quoteflow.io/workspace</div>
                </div>
                
                <div className={styles.screenshotImageWrapper}>
                  <img 
                    src="/dashboard-screenshot.png" 
                    alt="QuoteFlow Interface" 
                    className={styles.realScreenshotImage}
                    onError={(e) => { 
                      e.currentTarget.style.display = 'none';
                      const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                      if(sibling) sibling.style.display = 'grid';
                    }}
                  />
                  <div className={styles.simulatedUiGrid} style={{ display: 'none' }}>
                    <div className={styles.simSidebar} />
                    <div className={styles.simMain}>
                      <div className={styles.simHeaderLine} />
                      <div className={styles.simCardsRow}>
                        <div className={styles.simMiniCard} />
                        <div className={styles.simMiniCard} />
                        <div className={styles.simMiniCard} />
                      </div>
                      <div className={styles.simChartBox} />
                    </div>
                  </div>
                </div>
              </div>

              <motion.div 
                className={styles.floatingGlassBadge}
                animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <TrendingUp size={16} className={styles.metricIcon} />
                <div>
                  <span className={styles.badgeLabel}>Conversion Acceleration</span>
                  <strong className={styles.badgeVal}>+38.2%</strong>
                </div>
              </motion.div>

              <motion.div 
                className={styles.floatingGlassCardRight}
                animate={{ y: [0, 10, 0], rotate: [0, -1, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.2 }}
              >
                <div className={styles.miniCardIndicator} />
                <span>Enterprise Module Active</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* SECTION 3: LIVE PREVIEW ENGINE */}
        <motion.section 
          id="engine" 
          className={styles.centerSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
        >
          <div className={styles.sectionMeta}>
            <Zap size={16} />
            <span>INTEGRATED WORKSPACE</span>
          </div>
          <h2 className={styles.sectionHeading}>The live-preview engine layout.</h2>
          <p className={styles.sectionDesc}>
            Test the mechanics. Toggle configurations below to see how our micro-pricing logic formats branded agency documentation dynamically.
          </p>

          <div className={styles.interactiveSandbox}>
            <video className={styles.promoVideo} src="/video.mp4" autoPlay loop muted playsInline />
          </div>
        </motion.section>

        {/* SECTION 4: MATRIX GRID */}
        <motion.section 
          id="solutions" 
          className={styles.centerSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
        >
          <div className={styles.sectionMeta}>
            <Layers3 size={16} />
            <span>SUPPORT MATRIX</span>
          </div>
          <h2 className={styles.sectionHeading}>Built for scaling studios.</h2>
          <p className={styles.sectionDesc}>Unified tools carefully calibrated for modern workspace performance.</p>
          
          <div className={styles.marqueeViewport}>
            <div className={styles.marqueeTrack}>
              {TARGET_USERS.map((user, idx) => (
                <div key={`orig-${idx}`} className={styles.matrixCard}>
                  <div className={styles.matrixIconWrap}>{user.icon}</div>
                  <h3>{user.title}</h3>
                  <p>{user.desc}</p>
                </div>
              ))}
              {TARGET_USERS.map((user, idx) => (
                <div key={`dup-${idx}`} className={styles.matrixCard} aria-hidden="true">
                  <div className={styles.matrixIconWrap}>{user.icon}</div>
                  <h3>{user.title}</h3>
                  <p>{user.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* MEGA CTA FOOTER CONTAINER */}
<motion.footer 
  className={styles.megaFooterContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-50px" }}
  variants={revealVariants}
>
  <div className={styles.footerCtaCard}>
    <div className={styles.ctaCardLeft}>
      <h2 className={styles.ctaHeading}>
        Ready to standardize your <br /> transaction flow?
      </h2>
      {/* Updated Action Link */}
      <a 
        href="https://quoteflow-1shs.vercel.app?_vercel_share=KiRnoIz32KulA60DN2XFNr8vQ3g8KnAl" 
        style={{ textDecoration: 'none' }}
      >
        <motion.button 
          className={styles.primaryPill}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          Create a Quote <ArrowRight size={16} />
        </motion.button>
      </a>
    </div>

    <span className={styles.hugeFooterWatermark}>QuoteFlow</span>
  </div>
  {/* ... remainder of footer */}
</motion.footer>

      </main>
    </div>
  );
}

export default QuoteFlowApp;