import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { calculateCountdown } from '@/utils/f1Helpers';
import { getCountryFlag } from '@/utils/teamColors';

interface NextRaceCountdownProps {
  races: any[];
  calendar: any[];
}

const NextRaceCountdown = ({ races, calendar }: NextRaceCountdownProps) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const now = new Date();
  const completedRounds = races.map(r => parseInt(r.round));

  const nextRace = useMemo(() => {
    return calendar.find(r => {
      const raceDate = new Date(r.date + 'T' + (r.time || '12:00:00Z'));
      return raceDate > now;
    });
  }, [calendar]);

  const nextRaceDate = nextRace ? new Date(nextRace.date + 'T' + (nextRace.time || '12:00:00Z')) : null;

  useEffect(() => {
    if (!nextRaceDate) return;
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(nextRaceDate));
    }, 1000);
    setCountdown(calculateCountdown(nextRaceDate));
    return () => clearInterval(interval);
  }, [nextRaceDate?.getTime()]);

  const isRaceDay = nextRaceDate && countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0;
  const isRaceWeekend = nextRaceDate && countdown.days <= 3 && countdown.days >= 0;

  const country = nextRace?.Circuit?.Location?.country || '';
  const totalRounds = calendar.length || 22;

  // Determine local race time for the visitor
  const localRaceTime = nextRaceDate ? nextRaceDate.toLocaleString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
  }) : '';

  return (
    <section className="px-4 md:px-8 mb-6">
      <div className="container mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{
            background: 'var(--f1-surface)',
            border: '1px solid var(--f1-border)',
            borderLeftWidth: '5px',
            borderLeftColor: 'var(--f1-accent)',
          }}
        >
          {/* Left: Race info */}
          <div className="flex-1 min-w-0">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ background: 'rgba(232,0,45,0.15)', color: 'var(--f1-accent)' }}>
              NEXT RACE
            </span>
            <h3 className="text-lg sm:text-xl font-bold mt-1 truncate" style={{ color: 'var(--f1-text)', fontFamily: "'Titillium Web', sans-serif" }}>
              {getCountryFlag(country)} {nextRace?.raceName || 'TBD'}
            </h3>
            <p className="text-xs mt-1" style={{ color: 'var(--f1-muted)' }}>
              {nextRace?.Circuit?.circuitName || ''} · {nextRace?.Circuit?.Location?.locality || ''}, {country}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--f1-muted)' }}>
              Round {nextRace?.round || '?'} of {totalRounds} · 2026 Season
            </p>
            {localRaceTime && (
              <p className="text-xs mt-1" style={{ color: 'var(--f1-blue)' }}>
                Race: {localRaceTime}
              </p>
            )}
          </div>

          {/* Right: Countdown */}
          <div className="flex items-center gap-3">
            {isRaceDay ? (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'var(--f1-accent)' }} />
                <span className="text-lg font-bold" style={{ color: 'var(--f1-accent)', fontFamily: "'Titillium Web', sans-serif" }}>
                  🔴 RACE IS LIVE
                </span>
              </div>
            ) : isRaceWeekend && countdown.days <= 0 ? (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#FFD700' }} />
                <span className="text-lg font-bold" style={{ color: '#FFD700', fontFamily: "'Titillium Web', sans-serif" }}>
                  🟡 RACE WEEKEND
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
                    style={{ background: 'var(--f1-bg)', border: '1px solid var(--f1-border)' }}>
                    <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--f1-accent)', fontFamily: "'DM Mono', monospace" }}>
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
      </div>
    </section>
  );
};

export default NextRaceCountdown;
