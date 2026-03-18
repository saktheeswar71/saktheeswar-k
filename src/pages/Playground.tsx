import { useState, useMemo } from 'react';
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
    <div className="min-h-screen f1-playground" style={{
      '--f1-bg': '#0a0a0a',
      '--f1-surface': '#141414',
      '--f1-surface2': '#1e1e1e',
      '--f1-border': '#2a2a2a',
      '--f1-text': '#f5f5f5',
      '--f1-muted': '#777777',
      '--f1-accent': '#e8002d',
      '--f1-blue': '#99CDD8',
      '--f1-gold': '#ffd700',
      '--f1-silver': '#c0c0c0',
      '--f1-bronze': '#cd7f32',
      '--f1-green': '#00d2be',
      background: 'var(--f1-bg)',
      fontFamily: "'Titillium Web', 'DM Sans', sans-serif",
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--f1-text)',
    } as React.CSSProperties}>

      {/* Minimal navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: 'rgba(10,10,10,0.92)', borderBottom: '1px solid var(--f1-border)' }}>
        <div className="container mx-auto max-w-[1200px] flex items-center justify-between py-3 px-4 md:px-8">
          <Link to="/" className="text-sm font-semibold transition-colors hover:opacity-80" style={{ color: 'var(--f1-muted)' }}>
            ← Back to Portfolio
          </Link>
          <span className="text-sm font-bold" style={{ color: 'var(--f1-text)', fontFamily: "'Titillium Web', sans-serif" }}>
            F1 2026 <span style={{ color: 'var(--f1-accent)' }}>Live Dashboard</span>
          </span>
        </div>
      </nav>

      <F1Hero loading={loading} lastUpdated={lastUpdated} onRefresh={refetch} racesCompleted={racesCompleted} nextRaceName={nextRace?.raceName} standings={standings} />

      {/* Live Season Status Bar */}
      <div className="px-4 md:px-8 -mt-2 mb-4">
        <div className="container mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 px-4 rounded-lg text-xs" style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)' }}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#39B54A' }} />
              <span style={{ color: 'var(--f1-text)' }}>Live 2026 Season Data</span>
              {lastCompletedRace && (
                <span style={{ color: 'var(--f1-muted)' }}>· Last updated: Monday after {lastCompletedRace.raceName}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span style={{ color: 'var(--f1-muted)' }}>Round {racesCompleted} of {calendar.length || 22}</span>
              <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--f1-bg)' }}>
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(racesCompleted / (calendar.length || 22)) * 100}%`, background: 'var(--f1-accent)' }} />
              </div>
              <button onClick={refetch} className="px-2 py-1 rounded text-[10px] font-semibold transition-colors hover:opacity-80" style={{ color: 'var(--f1-muted)', border: '1px solid var(--f1-border)' }}>
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <section className="px-4 md:px-8 py-12">
          <div className="container mx-auto max-w-[1200px]">
            <div className="rounded-xl p-8 text-center" style={{ background: 'var(--f1-surface)', border: '2px solid var(--f1-accent)' }}>
              <p className="text-2xl mb-2">🚨</p>
              <p className="text-lg font-bold mb-2" style={{ color: 'var(--f1-text)' }}>Failed to load F1 data</p>
              <p className="text-sm mb-4" style={{ color: 'var(--f1-muted)' }}>The Jolpica API updates Mondays after race weekends. Data may be temporarily unavailable.</p>
              <button onClick={refetch} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--f1-accent)', color: '#fff' }}>
                Retry
              </button>
            </div>
          </div>
        </section>
      ) : loading ? (
        <section className="px-4 md:px-8 py-8">
          <div className="container mx-auto max-w-[1200px]">
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--f1-accent)', borderTopColor: 'transparent' }} />
              <p className="text-sm" style={{ color: 'var(--f1-muted)' }}>Fetching 2026 F1 data from Jolpica API...</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 rounded-xl" style={{ background: 'linear-gradient(90deg, var(--f1-surface) 25%, var(--f1-surface2) 50%, var(--f1-surface) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          <NextRaceCountdown races={races} calendar={calendar} />
          <KPICards standings={standings} constructors={constructors} races={races} totalRaces={calendar.length || 22} />

          {/* Tab Navigation */}
          <section className="px-4 md:px-8 mb-6">
            <div className="container mx-auto max-w-[1200px]">
              <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin rounded-xl p-1" style={{ background: 'var(--f1-surface)' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all"
                    style={{
                      background: activeTab === tab.id ? 'var(--f1-surface2)' : 'transparent',
                      color: activeTab === tab.id ? 'var(--f1-text)' : 'var(--f1-muted)',
                      borderBottom: activeTab === tab.id ? '2px solid var(--f1-accent)' : '2px solid transparent',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Tab Content */}
          <section className="px-4 md:px-8 mb-12">
            <div className="container mx-auto max-w-[1200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeTab === 'standings' && (
                    <div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <DriverStandingsChart standings={standings} />
                        <ConstructorStandingsChart constructors={constructors} />
                      </div>
                      <PointsProgression races={races} standings={standings} />
                    </div>
                  )}
                  {activeTab === 'race' && (
                    <RaceResultsTable races={races} fetchRaceDetail={fetchRaceDetail} />
                  )}
                  {activeTab === 'laptimes' && (
                    <LapTimeChart races={races} fetchRaceDetail={fetchRaceDetail} />
                  )}
                  {activeTab === 'tyres' && (
                    <TyreStrategyChart races={races} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          <F1Insights standings={standings} constructors={constructors} races={races} calendar={calendar} />

          {/* Season Calendar Strip */}
          <section className="px-4 md:px-8 mb-12">
            <div className="container mx-auto max-w-[1200px]">
              <div className="mb-4">
                <h3 className="text-sm font-bold" style={{ color: 'var(--f1-text)', fontFamily: "'Titillium Web', sans-serif" }}>
                  2026 Season Calendar
                </h3>
                <p className="text-xs" style={{ color: 'var(--f1-muted)' }}>
                  {calendar.length} races · {racesCompleted} completed · {calendar.length - racesCompleted} remaining
                </p>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin">
                {calendar.map((race: any) => {
                  const round = parseInt(race.round);
                  const isCompleted = races.some(r => parseInt(r.round) === round);
                  const isNext = nextRace && parseInt(nextRace.round) === round;
                  const winner = isCompleted ? races.find(r => parseInt(r.round) === round)?.Results?.[0] : null;
                  const country = race.Circuit?.Location?.country || '';
                  const flag = COUNTRY_FLAGS[country] || '🏁';

                  return (
                    <div
                      key={round}
                      className="flex-shrink-0 rounded-lg p-2.5 flex flex-col items-center gap-1 min-w-[100px]"
                      style={{
                        background: isNext ? 'rgba(232,0,45,0.12)' : 'var(--f1-surface)',
                        border: `1px solid ${isNext ? 'var(--f1-accent)' : 'var(--f1-border)'}`,
                      }}
                    >
                      <span className="text-base">{flag}</span>
                      <span className="text-[9px] font-semibold" style={{ color: 'var(--f1-muted)' }}>R{round}</span>
                      <span className="text-[10px] font-semibold text-center leading-tight truncate max-w-[90px]" style={{ color: isCompleted ? 'var(--f1-text)' : 'var(--f1-muted)' }}>
                        {race.raceName?.replace(' Grand Prix', ' GP')}
                      </span>
                      <span className="text-[9px]" style={{ color: 'var(--f1-muted)' }}>{race.date?.slice(5)}</span>
                      {isCompleted && winner && (
                        <span className="text-[9px] font-semibold" style={{ color: getConstructorColorFromRace(winner) }}>
                          ✓ {winner.Driver?.familyName}
                        </span>
                      )}
                      {isNext && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'var(--f1-accent)', color: '#fff' }}>NEXT</span>
                      )}
                      {!isCompleted && !isNext && (
                        <span className="text-[9px]" style={{ color: 'var(--f1-muted)' }}>TBD</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* About Data */}
          <section className="px-4 md:px-8 mb-12">
            <div className="container mx-auto max-w-[1200px]">
              <details className="rounded-xl overflow-hidden" style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)' }}>
                <summary className="px-4 py-3 text-xs font-semibold cursor-pointer" style={{ color: 'var(--f1-muted)' }}>
                  ℹ️ About this data
                </summary>
                <div className="px-4 pb-4 text-xs leading-relaxed" style={{ color: 'var(--f1-muted)' }}>
                  Data sourced from <a href="https://jolpica-f1.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--f1-blue)' }}>Jolpica F1 API</a> and <a href="https://openf1.org" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--f1-blue)' }}>OpenF1 API</a>. Both are free, open-source, and require no API keys. Standings and results update every Monday after each 2026 F1 race weekend automatically.
                </div>
              </details>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="px-4 md:px-8 pb-12 text-center">
        <p className="text-[10px] mb-3" style={{ color: 'var(--f1-muted)' }}>
          📡 Data as of: {lastCompletedRace?.raceName || '—'} · Updates Monday after each race weekend
        </p>
        <Link to="/" className="text-sm font-semibold transition-colors hover:underline" style={{ color: 'var(--f1-blue)' }}>
          ← Back to Saktheeswar K Portfolio
        </Link>
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

function getConstructorColorFromRace(result: any): string {
  const id = result?.Constructor?.constructorId;
  const mapping: Record<string, string> = {
    red_bull: '#3671C6', mercedes: '#00d2be', ferrari: '#e8002d',
    mclaren: '#ff8000', aston_martin: '#006f62', alpine: '#0093cc',
    williams: '#005aff', haas: '#b6babd', rb: '#6692ff',
    sauber: '#52e252', cadillac: '#dc143c', audi: '#52e252',
  };
  return mapping[id] || '#777';
}

import { COUNTRY_FLAGS } from '@/utils/teamColors';

export default Playground;
