import { motion } from 'framer-motion';
import { getConstructorColor } from '@/utils/teamColors';

interface F1HeroProps {
  loading: boolean;
  lastUpdated: Date | null;
  onRefresh: () => void;
  racesCompleted: number;
  nextRaceName?: string;
  standings: any[];
}

const F1Hero = ({ loading, lastUpdated, onRefresh, racesCompleted, nextRaceName, standings }: F1HeroProps) => {
  const leader = standings?.[0];
  const leaderName = leader ? `${leader.Driver?.givenName} ${leader.Driver?.familyName}` : '--';
  const leaderTeam = leader?.Constructors?.[0]?.name || '';
  const leaderTeamId = leader?.Constructors?.[0]?.constructorId || '';
  const leaderPoints = leader?.points || '0';
  const leaderWins = leader?.wins || '0';

  return (
    <section
      className="relative w-full pt-24 pb-12 px-4 md:px-8 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 600px 400px at -100px -100px, rgba(232,0,45,0.15) 0%, transparent 70%), var(--f1-bg)',
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
              style={{ background: 'rgba(232,0,45,0.15)', color: 'var(--f1-accent)' }}>
              🏎️ 2026 Season · Live Data
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ fontFamily: "'Titillium Web', sans-serif" }}>
              <span style={{ color: 'var(--f1-text)' }}>F1 2026</span>
              <br />
              <span style={{ color: 'var(--f1-accent)' }}>Live Analytics</span>
              <br />
              <span style={{ color: 'var(--f1-text)' }}>Dashboard</span>
            </h1>

            <p className="text-sm sm:text-base max-w-lg mb-6" style={{ color: 'var(--f1-muted)' }}>
              Real-time 2026 Formula 1 data — standings, race results, lap times and tyre strategy. Auto-updates every Monday after each race weekend. Powered by Jolpica API + OpenF1. Zero API keys.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)', color: 'var(--f1-text)' }}>
                🏆 Lando Norris · 2025 Champion
              </span>
              <span className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)', color: 'var(--f1-text)' }}>
                📡 {racesCompleted} race{racesCompleted !== 1 ? 's' : ''} complete
              </span>
              {nextRaceName && (
                <span className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)', color: 'var(--f1-text)' }}>
                  🔜 Next: {nextRaceName.replace(' Grand Prix', ' GP')}
                </span>
              )}
            </div>
          </motion.div>

          {/* Right — Championship Leader Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-auto"
          >
            <div className="rounded-xl p-5 min-w-[260px]" style={{
              background: 'var(--f1-surface)',
              border: '1px solid var(--f1-border)',
              borderTopWidth: '3px',
              borderTopColor: 'var(--f1-accent)',
            }}>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--f1-accent)' }}>
                CHAMPIONSHIP LEADER
              </span>
              <p className="text-2xl sm:text-3xl font-bold mt-2" style={{ color: 'var(--f1-text)', fontFamily: "'Titillium Web', sans-serif" }}>
                {loading ? '...' : leaderName}
              </p>
              <p className="text-3xl font-bold mt-1" style={{ color: 'var(--f1-gold)', fontFamily: "'DM Mono', monospace" }}>
                {loading ? '--' : leaderPoints} <span className="text-sm font-normal" style={{ color: 'var(--f1-muted)' }}>pts</span>
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--f1-muted)' }}>
                from {racesCompleted} race{racesCompleted !== 1 ? 's' : ''} · {leaderWins} win{leaderWins !== '1' ? 's' : ''}
              </p>
              {leaderTeam && (
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold"
                  style={{ color: getConstructorColor(leaderTeamId), background: `${getConstructorColor(leaderTeamId)}20` }}>
                  {leaderTeam}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs mt-3" style={{ color: 'var(--f1-muted)' }}>
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
              className="mt-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
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
