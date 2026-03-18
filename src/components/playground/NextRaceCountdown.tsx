import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateCountdown } from '@/utils/f1Helpers';
import { getCountryFlag } from '@/utils/teamColors';

interface NextRaceCountdownProps {
  races: any[];
}

const NextRaceCountdown = ({ races }: NextRaceCountdownProps) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Find next race (race without results or future date)
  const now = new Date();
  const completedRounds = races.map(r => parseInt(r.round));
  const totalRounds = 24;

  // Try to find the next upcoming race date from available data
  const lastRace = races.length > 0 ? races[races.length - 1] : null;
  const nextRaceDate = lastRace ? new Date(new Date(lastRace.date).getTime() + 14 * 24 * 60 * 60 * 1000) : null;

  useEffect(() => {
    if (!nextRaceDate) return;
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(nextRaceDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [nextRaceDate?.getTime()]);

  const isRaceDay = nextRaceDate && countdown.days === 0 && countdown.hours < 24;
  const lastRaceName = lastRace?.raceName || 'Season Race';
  const lastCircuit = lastRace?.Circuit?.circuitName || '';
  const lastCountry = lastRace?.Circuit?.Location?.country || '';

  return (
    <section className="px-4 md:px-8 -mt-4 mb-8">
      <div className="container mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{
            background: 'var(--f1-surface)',
            borderLeft: '4px solid var(--f1-accent)',
            border: '1px solid var(--f1-border)',
            borderLeftWidth: '4px',
            borderLeftColor: 'var(--f1-accent)',
          }}
        >
          {/* Left: Race info */}
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--f1-accent)' }}>
              {races.length > 0 ? 'LAST COMPLETED RACE' : 'NEXT RACE'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold mt-1 truncate" style={{ color: 'var(--f1-text)', fontFamily: "'Titillium Web', sans-serif" }}>
              {getCountryFlag(lastCountry)} {lastRaceName}
            </h3>
            <p className="text-xs mt-1" style={{ color: 'var(--f1-muted)' }}>
              {lastCircuit} · {lastCountry}
            </p>
            {lastRace && (
              <p className="text-xs mt-1" style={{ color: 'var(--f1-muted)' }}>
                {lastRace.date}
              </p>
            )}
            <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold"
              style={{ background: 'rgba(232,52,58,0.15)', color: 'var(--f1-accent)' }}>
              Round {lastRace?.round || '?'} of {totalRounds}
            </span>
          </div>

          {/* Right: Countdown or status */}
          <div className="flex items-center gap-3">
            {isRaceDay ? (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'var(--f1-accent)' }} />
                <span className="text-lg font-bold" style={{ color: 'var(--f1-accent)', fontFamily: "'Titillium Web', sans-serif" }}>
                  🔴 RACE DAY
                </span>
              </div>
            ) : (
              <>
                {[
                  { value: countdown.days, label: 'DAYS' },
                  { value: countdown.hours, label: 'HRS' },
                  { value: countdown.minutes, label: 'MIN' },
                  { value: countdown.seconds, label: 'SEC' },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col items-center rounded-lg px-3 py-2 min-w-[52px]"
                    style={{ background: 'var(--f1-bg)' }}>
                    <span className="text-xl sm:text-2xl font-bold tabular-nums" style={{ color: 'var(--f1-accent)', fontFamily: "'Titillium Web', sans-serif" }}>
                      {String(value).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-semibold tracking-wider" style={{ color: 'var(--f1-muted)' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </motion.div>

        {/* Season calendar pills */}
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {Array.from({ length: totalRounds }, (_, i) => {
            const round = i + 1;
            const race = races.find(r => parseInt(r.round) === round);
            const isCompleted = completedRounds.includes(round);
            const isNext = round === (completedRounds.length > 0 ? Math.max(...completedRounds) + 1 : 1);
            const country = race?.Circuit?.Location?.country || '';

            return (
              <span
                key={round}
                className="flex-shrink-0 px-2 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap"
                style={{
                  background: isNext ? 'var(--f1-accent)' : isCompleted ? 'var(--f1-surface2)' : 'transparent',
                  color: isNext ? '#fff' : isCompleted ? 'var(--f1-muted)' : 'var(--f1-muted)',
                  border: `1px solid ${isNext ? 'var(--f1-accent)' : 'var(--f1-border)'}`,
                }}
              >
                {isCompleted && '✓ '}{getCountryFlag(country)} R{round}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NextRaceCountdown;
