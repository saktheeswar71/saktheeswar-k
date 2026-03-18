import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getConstructorColor } from '@/utils/teamColors';
import { getPositionChange } from '@/utils/f1Helpers';

interface RaceResultsTableProps {
  races: any[];
  fetchRaceDetail: (round: string) => Promise<any>;
}

const RaceResultsTable = ({ races, fetchRaceDetail }: RaceResultsTableProps) => {
  const [selectedRound, setSelectedRound] = useState(races.length > 0 ? races[races.length - 1].round : '');
  const [raceDetail, setRaceDetail] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const selectedRace = races.find(r => r.round === selectedRound);
  const results = selectedRace?.Results || [];

  useEffect(() => {
    if (selectedRound) {
      setLoading(true);
      fetchRaceDetail(selectedRound)
        .then(setRaceDetail)
        .finally(() => setLoading(false));
    }
  }, [selectedRound]);

  const podium = results.slice(0, 3);
  const podiumOrder = podium.length >= 3 ? [podium[1], podium[0], podium[2]] : podium;
  const podiumColors = ['var(--f1-silver)', 'var(--f1-gold)', 'var(--f1-bronze)'];
  const podiumHeights = ['h-24', 'h-32', 'h-20'];

  return (
    <div>
      {/* Race Selector */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--f1-muted)' }}>
          Select Race
        </label>
        <select
          value={selectedRound}
          onChange={(e) => setSelectedRound(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm outline-none"
          style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)', color: 'var(--f1-text)' }}
        >
          {races.map(race => (
            <option key={race.round} value={race.round}>
              R{race.round} — {race.raceName}
            </option>
          ))}
        </select>
      </div>

      {/* Podium Visual */}
      {podium.length >= 3 && (
        <div className="flex items-end justify-center gap-3 mb-8">
          {podiumOrder.map((driver: any, i: number) => {
            const pos = parseInt(driver.position);
            const color = getConstructorColor(driver.Constructor?.constructorId);
            const borderColor = pos === 1 ? 'var(--f1-gold)' : pos === 2 ? 'var(--f1-silver)' : 'var(--f1-bronze)';
            return (
              <motion.div
                key={driver.Driver.driverId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`flex flex-col items-center rounded-t-xl px-4 sm:px-6 pt-4 pb-2 ${podiumHeights[i]}`}
                style={{
                  background: 'var(--f1-surface)',
                  borderTop: `3px solid ${borderColor}`,
                  borderLeft: `1px solid var(--f1-border)`,
                  borderRight: `1px solid var(--f1-border)`,
                  minWidth: 100,
                }}
              >
                <span className="text-2xl font-bold" style={{ color: borderColor, fontFamily: "'Titillium Web', sans-serif" }}>
                  P{pos}
                </span>
                <span className="text-xs font-bold mt-1 truncate max-w-[90px]" style={{ color: 'var(--f1-text)' }}>
                  {driver.Driver.familyName}
                </span>
                <span className="text-[10px] mt-0.5" style={{ color }}>
                  {driver.Constructor?.name}
                </span>
                <span className="text-[10px] mt-0.5" style={{ color: 'var(--f1-muted)' }}>
                  +{[25, 18, 15][pos - 1]} pts
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Full Results Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--f1-border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ color: 'var(--f1-text)' }}>
            <thead>
              <tr style={{ background: 'var(--f1-surface2)' }}>
                {['Pos', 'Driver', 'Team', 'Grid', 'Laps', 'Time/Gap', 'Points', 'Status'].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left font-semibold whitespace-nowrap" style={{ color: 'var(--f1-muted)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r: any, i: number) => {
                const pos = parseInt(r.position);
                const posChange = getPositionChange(r.grid, r.position);
                const isDNF = r.status !== 'Finished' && !r.status?.includes('Lap');
                const borderColor = pos === 1 ? 'var(--f1-gold)' : pos === 2 ? 'var(--f1-silver)' : pos === 3 ? 'var(--f1-bronze)' : 'transparent';

                return (
                  <tr
                    key={r.Driver.driverId}
                    className="transition-colors"
                    style={{
                      background: pos <= 10 ? 'var(--f1-surface)' : 'var(--f1-bg)',
                      borderLeft: `3px solid ${borderColor}`,
                      opacity: isDNF ? 0.5 : 1,
                    }}
                  >
                    <td className="px-3 py-2 font-bold">{pos}</td>
                    <td className="px-3 py-2 font-semibold whitespace-nowrap">
                      {r.Driver.givenName} {r.Driver.familyName}
                      <span className="ml-1.5 text-[10px] font-normal" style={{ color: 'var(--f1-muted)' }}>#{r.number}</span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap" style={{ color: getConstructorColor(r.Constructor?.constructorId) }}>
                      {r.Constructor?.name}
                    </td>
                    <td className="px-3 py-2">{r.grid}</td>
                    <td className="px-3 py-2">{r.laps}</td>
                    <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                      {pos === 1 ? r.Time?.time || '--' : r.Time?.time || r.status}
                    </td>
                    <td className="px-3 py-2 font-semibold">{r.points}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {isDNF ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: 'rgba(232,52,58,0.15)', color: 'var(--f1-accent)' }}>
                          DNF
                        </span>
                      ) : (
                        <span className={`text-[10px] font-semibold ${posChange > 0 ? 'text-green-400' : posChange < 0 ? 'text-red-400' : ''}`}
                          style={posChange === 0 ? { color: 'var(--f1-muted)' } : {}}>
                          {posChange > 0 ? `↑${posChange}` : posChange < 0 ? `↓${Math.abs(posChange)}` : '–'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RaceResultsTable;
