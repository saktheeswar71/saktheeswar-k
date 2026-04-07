import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useJolpicaData } from '@/hooks/useJolpicaData';
import F1Hero from '@/components/playground/F1Hero';
import NextRaceCountdown from '@/components/playground/NextRaceCountdown';
import KPICards from '@/components/playground/KPICards';
import DriverStandingsChart from '@/components/playground/DriverStandingsChart';
import ConstructorStandingsChart from '@/components/playground/ConstructorStandingsChart';
import PointsProgression from '@/components/playground/PointsProgression';
import RaceResultsTable from '@/components/playground/RaceResultsTable';
import LapTimeChart from '@/components/playground/LapTimeChart';
import TyreStrategyChart from '@/components/playground/TyreStrategyChart';
import F1Insights from '@/components/playground/F1Insights';
import { COUNTRY_FLAGS } from '@/utils/teamColors';

const tabs = [
  { id: 'standings', label: '🏆 Standings' },
  { id: 'race', label: '🏁 Race Results' },
  { id: 'laptimes', label: '⏱ Lap Analysis' },
  { id: 'tyres', label: '🔧 Strategy' },
];

const SEASON = '2026';

const Playground = () => {
  const [activeTab, setActiveTab] = useState('standings');
  const { standings, constructors, races, calendar, loading, error, lastUpdated, refetch, fetchRaceDetail } = useJolpicaData(SEASON);

  useEffect(() => {
    document.title = 'F1 Dashboard 🏎️ | Saktheeswar K';
    return () => { document.title = 'Saktheeswar K | Data Analyst & AI Graduate'; };
  }, []);

  const lastCompletedRace = races.length > 0 ? races[races.length - 1] : null;
  const racesCompleted = races.length;

  const nextRace = useMemo(() => {
    const now = new Date();
    return calendar.find(r => {
      const raceDate = new Date(r.date + 'T' + (r.time || '12:00:00Z'));
      return raceDate > now;
    });
  }, [calendar]);

  return (
    <div className="min-h-screen" style={{
      background: '#0a0a0a',
      fontFamily: "'Titillium Web', 'DM Sans', sans-serif",
      fontVariantNumeric: 'tabular-nums',
      color: '#f5f5f5',
    }}>
      {/* Minimal navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: '#0a0a0a', borderBottom: '1px solid #222222', height: 64 }}>
        <div className="fab-container flex items-center justify-between h-full px-5 md:px-10">
          <Link to="/" className="text-sm transition-colors hover:text-[#f5f5f5]" style={{ color: '#888888' }}>
            ← Back to Portfolio
          </Link>
          <span className="text-sm font-bold text-[#f5f5f5]">
            F1 2026 <span style={{ color: '#e8343a' }}>Live Dashboard</span>
          </span>
        </div>
      </nav>

      <F1Hero loading={loading} lastUpdated={lastUpdated} onRefresh={refetch} racesCompleted={racesCompleted} nextRaceName={nextRace?.raceName} standings={standings} />

      {/* Live Season Status Bar */}
      <div className="px-5 md:px-10 -mt-2 mb-4">
        <div className="fab-container">
          <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 px-4 text-xs" style={{ background: '#111111', border: '1px solid #222222' }}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#e8343a' }} />
              <span className="text-[#f5f5f5]">Live 2026 Season Data</span>
              {lastCompletedRace && (
                <span style={{ color: '#888888' }}>· Last updated: Monday after {lastCompletedRace.raceName}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span style={{ color: '#888888' }}>Round {racesCompleted} of {calendar.length || 22}</span>
              <div className="w-24 h-1.5 overflow-hidden" style={{ background: '#222222' }}>
                <div className="h-full transition-all duration-1000" style={{ width: `${(racesCompleted / (calendar.length || 22)) * 100}%`, background: '#e8343a' }} />
              </div>
              <button onClick={refetch} className="px-2 py-1 text-[10px] font-semibold transition-all hover:text-[#f5f5f5]" style={{ color: '#888888', border: '1px solid #222222' }}>
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <section className="px-5 md:px-10 py-12">
          <div className="fab-container">
            <div className="p-8 text-center" style={{ background: '#111111', border: '1px solid #222222', borderLeft: '4px solid #e8343a' }}>
              <p className="text-2xl mb-2">🚨</p>
              <p className="text-lg font-bold mb-2 text-[#f5f5f5]">Failed to load F1 data</p>
              <p className="text-sm mb-4" style={{ color: '#888888' }}>The Jolpica API updates Mondays after race weekends.</p>
              <button onClick={refetch} className="fab-btn text-sm">Retry</button>
            </div>
          </div>
        </section>
      ) : loading ? (
        <section className="px-5 md:px-10 py-8">
          <div className="fab-container">
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#e8343a', borderTopColor: 'transparent' }} />
              <p className="text-sm" style={{ color: '#888888' }}>Fetching 2026 F1 data...</p>
            </div>
          </div>
        </section>
      ) : (
        <>
          <NextRaceCountdown races={races} calendar={calendar} />
          <KPICards standings={standings} constructors={constructors} races={races} totalRaces={calendar.length || 22} />

          {/* Tab Navigation */}
          <section className="px-5 md:px-10 mb-6">
            <div className="fab-container">
              <div className="flex gap-0 overflow-x-auto" style={{ borderBottom: '1px solid #222222' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all"
                    style={{
                      background: activeTab === tab.id ? '#161616' : 'transparent',
                      color: activeTab === tab.id ? '#f5f5f5' : '#888888',
                      borderBottom: activeTab === tab.id ? '2px solid #e8343a' : '2px solid transparent',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Tab Content */}
          <section className="px-5 md:px-10 mb-12">
            <div className="fab-container">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  {activeTab === 'standings' && (
                    <div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ background: '#222222' }}>
                        <DriverStandingsChart standings={standings} />
                        <ConstructorStandingsChart constructors={constructors} />
                      </div>
                      <PointsProgression races={races} standings={standings} />
                    </div>
                  )}
                  {activeTab === 'race' && <RaceResultsTable races={races} fetchRaceDetail={fetchRaceDetail} />}
                  {activeTab === 'laptimes' && <LapTimeChart races={races} fetchRaceDetail={fetchRaceDetail} />}
                  {activeTab === 'tyres' && <TyreStrategyChart races={races} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          <F1Insights standings={standings} constructors={constructors} races={races} calendar={calendar} />

          {/* Season Calendar */}
          <section className="px-5 md:px-10 mb-12">
            <div className="fab-container">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-[#f5f5f5]">2026 Season Calendar</h3>
                <p className="text-xs" style={{ color: '#888888' }}>{calendar.length} races · {racesCompleted} completed · {calendar.length - racesCompleted} remaining</p>
              </div>
              <div className="flex gap-px overflow-x-auto pb-3" style={{ background: '#222222' }}>
                {calendar.map((race: any) => {
                  const round = parseInt(race.round);
                  const isCompleted = races.some(r => parseInt(r.round) === round);
                  const isNext = nextRace && parseInt(nextRace.round) === round;
                  const winner = isCompleted ? races.find(r => parseInt(r.round) === round)?.Results?.[0] : null;
                  const country = race.Circuit?.Location?.country || '';
                  const flag = COUNTRY_FLAGS[country] || '🏁';
                  return (
                    <div key={round} className="flex-shrink-0 p-2.5 flex flex-col items-center gap-1 min-w-[100px]" style={{
                      background: isNext ? '#e8343a' : isCompleted ? '#161616' : '#0a0a0a',
                    }}>
                      <span className="text-base">{flag}</span>
                      <span className="text-[9px] font-semibold" style={{ color: isNext ? '#fff' : '#888888' }}>R{round}</span>
                      <span className="text-[10px] font-semibold text-center leading-tight truncate max-w-[90px]" style={{ color: isNext ? '#fff' : isCompleted ? '#f5f5f5' : '#555555' }}>
                        {race.raceName?.replace(' Grand Prix', ' GP')}
                      </span>
                      <span className="text-[9px]" style={{ color: isNext ? 'rgba(255,255,255,0.8)' : '#555555' }}>{race.date?.slice(5)}</span>
                      {isCompleted && winner && <span className="text-[9px] font-semibold" style={{ color: '#e8343a' }}>✓ {winner.Driver?.familyName}</span>}
                      {isNext && <span className="text-[9px] font-bold px-1.5 py-0.5" style={{ background: '#fff', color: '#e8343a' }}>NEXT</span>}
                      {!isCompleted && !isNext && <span className="text-[9px]" style={{ color: '#555555' }}>TBD</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* About Data */}
          <section className="px-5 md:px-10 mb-12">
            <div className="fab-container">
              <details className="overflow-hidden" style={{ background: '#111111', border: '1px solid #222222' }}>
                <summary className="px-4 py-3 text-xs font-semibold cursor-pointer" style={{ color: '#888888' }}>ℹ️ About this data</summary>
                <div className="px-4 pb-4 text-xs leading-relaxed" style={{ color: '#888888' }}>
                  Data sourced from <a href="https://jolpica-f1.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#e8343a' }}>Jolpica F1 API</a> and <a href="https://openf1.org" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#e8343a' }}>OpenF1 API</a>. Updates every Monday after each 2026 F1 race weekend.
                </div>
              </details>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="px-5 md:px-10 pb-12 text-center" style={{ borderTop: '1px solid #222222', background: '#0a0a0a' }}>
        <div className="py-6">
          <p className="text-[10px] mb-3" style={{ color: '#555555' }}>
            📡 Data as of: {lastCompletedRace?.raceName || '—'} · Updates Monday after each race weekend
          </p>
          <Link to="/" className="text-sm transition-colors hover:text-[#f5f5f5]" style={{ color: '#888888' }}>
            ← Back to Saktheeswar K Portfolio
          </Link>
        </div>
      </footer>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default Playground;
