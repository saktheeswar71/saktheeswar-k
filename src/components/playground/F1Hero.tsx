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
        background: 'linear-gradient(135deg, #FDE8D3, #DAEBE3)',
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
              style={{ background: '#DAEBE3', color: '#657166' }}>
              🏎️ 2026 Season · Live Data
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ fontFamily: "'Titillium Web', sans-serif" }}>
              <span style={{ color: '#657166' }}>F1 2026</span>
              <br />
              <span style={{ color: '#99CDD8' }}>Live Analytics</span>
              <br />
              <span style={{ color: '#657166' }}>Dashboard</span>
            </h1>

            <p className="text-sm sm:text-base max-w-lg mb-6" style={{ color: '#8a9e8f' }}>
              Real-time 2026 Formula 1 data — standings, race results, lap times and tyre strategy. Auto-updates every Monday after each race weekend. Powered by Jolpica API + OpenF1. Zero API keys.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: '#DAEBE3', border: '1px solid #CFD6C4', color: '#657166' }}>
                🏆 Lando Norris · 2025 Champion
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: '#DAEBE3', border: '1px solid #CFD6C4', color: '#657166' }}>
                📡 {racesCompleted} race{racesCompleted !== 1 ? 's' : ''} complete
              </span>
              {nextRaceName && (
                <span className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: '#DAEBE3', border: '1px solid #CFD6C4', color: '#657166' }}>
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
            <div className="rounded-2xl p-5 min-w-[260px]" style={{
              background: '#fff',
              border: '1px solid #CFD6C4',
              borderTopWidth: '3px',
              borderTopColor: '#99CDD8',
              boxShadow: '0 2px 16px rgba(101,113,102,0.08)',
            }}>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#99CDD8' }}>
                CHAMPIONSHIP LEADER
              </span>
              <p className="text-2xl sm:text-3xl font-bold mt-2" style={{ color: '#657166', fontFamily: "'Titillium Web', sans-serif" }}>
                {loading ? '...' : leaderName}
              </p>
              <p className="text-3xl font-bold mt-1" style={{ color: '#F3C3B2', fontFamily: "'DM Mono', monospace" }}>
                {loading ? '--' : leaderPoints} <span className="text-sm font-normal" style={{ color: '#8a9e8f' }}>pts</span>
              </p>
              <p className="text-xs mt-1" style={{ color: '#8a9e8f' }}>
                from {racesCompleted} race{racesCompleted !== 1 ? 's' : ''} · {leaderWins} win{leaderWins !== '1' ? 's' : ''}
              </p>
              {leaderTeam && (
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ color: '#657166', background: '#DAEBE3' }}>
                  {leaderTeam}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs mt-3" style={{ color: '#8a9e8f' }}>
              {loading ? (
                <>
                  <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: '#99CDD8' }} />
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
              className="mt-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                border: '1px solid #99CDD8',
                color: '#99CDD8',
                background: '#fff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#99CDD8';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#99CDD8';
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
