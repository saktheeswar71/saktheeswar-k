import { useState } from 'react';
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
  { id: 'championship', label: '🏆 Championship' },
  { id: 'race', label: '🏁 Race Analysis' },
  { id: 'laptimes', label: '⏱ Lap Times' },
  { id: 'tyres', label: '🔧 Tyre Strategy' },
];

const Playground = () => {
  const [season, setSeason] = useState('2025');
  const [activeTab, setActiveTab] = useState('championship');
  const { standings, constructors, races, loading, error, lastUpdated, refetch, fetchRaceDetail } = useJolpicaData(season);

  return (
    <div className="min-h-screen f1-dark" style={{
      '--f1-bg': '#0f0f0f',
      '--f1-surface': '#1a1a1a',
      '--f1-surface2': '#242424',
      '--f1-border': '#2e2e2e',
      '--f1-text': '#f0f0f0',
      '--f1-muted': '#888888',
      '--f1-accent': '#e8343a',
      '--f1-blue': '#99CDD8',
      '--f1-gold': '#f5c842',
      '--f1-silver': '#c0c0c0',
      '--f1-bronze': '#cd7f32',
      background: 'var(--f1-bg)',
      fontFamily: "'Titillium Web', 'DM Sans', sans-serif",
      fontVariantNumeric: 'tabular-nums',
    } as React.CSSProperties}>

      {/* Minimal navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: 'rgba(15,15,15,0.9)', borderBottom: '1px solid var(--f1-border)' }}>
        <div className="container mx-auto max-w-[1200px] flex items-center justify-between py-3 px-4 md:px-8">
          <Link to="/" className="text-sm font-semibold transition-colors hover:opacity-80" style={{ color: 'var(--f1-muted)' }}>
            ← Back to Portfolio
          </Link>
          <span className="text-sm font-bold" style={{ color: 'var(--f1-text)', fontFamily: "'Titillium Web', sans-serif" }}>
            F1 Analytics <span style={{ color: 'var(--f1-accent)' }}>Playground</span>
          </span>
        </div>
      </nav>

      <F1Hero season={season} onSeasonChange={setSeason} loading={loading} lastUpdated={lastUpdated} onRefresh={refetch} />

      {error ? (
        <section className="px-4 md:px-8 py-12">
          <div className="container mx-auto max-w-[1200px]">
            <div className="rounded-xl p-8 text-center" style={{ background: 'var(--f1-surface)', border: '2px solid var(--f1-accent)' }}>
              <p className="text-2xl mb-2">🚨</p>
              <p className="text-lg font-bold mb-2" style={{ color: 'var(--f1-text)' }}>Failed to load F1 data</p>
              <p className="text-sm mb-4" style={{ color: 'var(--f1-muted)' }}>The API may be rate-limited or unavailable.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={refetch} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--f1-accent)', color: '#fff' }}>
                  Try Again
                </button>
                <button onClick={() => setSeason('2024')} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ border: '1px solid var(--f1-border)', color: 'var(--f1-text)' }}>
                  View 2024 data instead
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : loading ? (
        <section className="px-4 md:px-8 py-8">
          <div className="container mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 rounded-xl animate-pulse" style={{ background: 'var(--f1-surface)' }} />
              ))}
            </div>
            <div className="h-96 rounded-xl animate-pulse" style={{ background: 'var(--f1-surface)' }} />
          </div>
        </section>
      ) : (
        <>
          <NextRaceCountdown races={races} />
          <KPICards standings={standings} constructors={constructors} races={races} />

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
                  {activeTab === 'championship' && (
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

          <F1Insights standings={standings} constructors={constructors} races={races} />
        </>
      )}

      {/* Footer link */}
      <footer className="px-4 md:px-8 pb-12 text-center">
        <Link to="/" className="text-sm font-semibold transition-colors hover:underline" style={{ color: 'var(--f1-blue)' }}>
          ← Back to Saktheeswar K Portfolio
        </Link>
      </footer>
    </div>
  );
};

export default Playground;
