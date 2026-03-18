import { motion } from 'framer-motion';

interface F1HeroProps {
  season: string;
  onSeasonChange: (s: string) => void;
  loading: boolean;
  lastUpdated: Date | null;
  onRefresh: () => void;
}

const F1Hero = ({ season, onSeasonChange, loading, lastUpdated, onRefresh }: F1HeroProps) => {
  return (
    <section
      className="relative w-full pt-24 pb-16 px-4 md:px-8 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at top left, rgba(232,52,58,0.12) 0%, transparent 60%), var(--f1-bg)',
      }}
    >
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(232,52,58,0.15)', color: 'var(--f1-accent)' }}>
              🏎️ Live F1 Data Dashboard
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ fontFamily: "'Titillium Web', sans-serif" }}>
              <span style={{ color: 'var(--f1-text)' }}>Formula 1</span>
              <br />
              <span style={{ color: 'var(--f1-accent)' }}>Analytics</span>
              <br />
              <span style={{ color: 'var(--f1-text)' }}>Playground</span>
            </h1>

            <p className="text-sm sm:text-base max-w-lg mb-6" style={{ color: 'var(--f1-muted)' }}>
              Real race data. Real lap times. Real strategy.
              Powered by OpenF1 + Jolpica APIs — zero API keys,
              fully open-source, running live in your browser.
            </p>

            <div className="flex flex-wrap gap-3">
              {['📡 OpenF1 API', '📊 Jolpica API', '🏁 2025 Season'].map((badge) => (
                <span key={badge} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)', color: 'var(--f1-text)' }}>
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start lg:items-end gap-4"
          >
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--f1-muted)' }}>
                Season
              </label>
              <select
                value={season}
                onChange={(e) => onSeasonChange(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer outline-none"
                style={{
                  background: 'var(--f1-surface)',
                  border: '1px solid var(--f1-border)',
                  color: 'var(--f1-text)',
                }}
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--f1-muted)' }}>
              {loading ? (
                <>
                  <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--f1-accent)' }} />
                  Fetching live data...
                </>
              ) : (
                <>
                  <span>✅ Data loaded</span>
                  {lastUpdated && (
                    <span>· {lastUpdated.toLocaleTimeString()}</span>
                  )}
                </>
              )}
            </div>

            <button
              onClick={onRefresh}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{
                border: '1px solid var(--f1-accent)',
                color: 'var(--f1-accent)',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--f1-accent)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--f1-accent)';
              }}
            >
              🔄 Refresh
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default F1Hero;
