import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const podiumBgs = ['#333333', '#333333', '#FF9A40'];
  const podiumBorders = ['#3A3A3A', '#F2811D', '#3A3A3A'];
  const podiumHeights = ['h-24', 'h-32', 'h-20'];

  return (
    <div>
      {/* Race Selector */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#A0A0A0' }}>
          Select Race
        </label>
        <select
          value={selectedRound}
          onChange={(e) => setSelectedRound(e.target.value)}
          className="px-3 py-2 rounded-xl text-sm outline-none focus:ring-2"
          style={{ background: '#2E2E2E', border: '1px solid #3A3A3A', color: '#E5E5E5' }}
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
            return (
              <motion.div
                key={driver.Driver.driverId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`flex flex-col items-center rounded-t-2xl px-4 sm:px-6 pt-4 pb-2 ${podiumHeights[i]}`}
                style={{
                  background: podiumBgs[i],
                  borderTop: `3px solid ${podiumBorders[i]}`,
                  border: '1px solid #3A3A3A',
                  minWidth: 100,
                }}
              >
                <span className="text-2xl font-bold" style={{ color: '#E5E5E5', fontFamily: "'Titillium Web', sans-serif" }}>
                  P{pos}
                </span>
                <span className="text-xs font-bold mt-1 truncate max-w-[90px]" style={{ color: '#E5E5E5' }}>
                  {driver.Driver.familyName}
                </span>
                <span className="text-[10px] mt-0.5" style={{ color: '#A0A0A0' }}>
                  {driver.Constructor?.name}
                </span>
                <span className="text-[10px] mt-0.5" style={{ color: '#F2811D' }}>
                  +{[25, 18, 15][pos - 1]} pts
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Full Results Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #3A3A3A', boxShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ color: '#E5E5E5' }}>
            <thead>
              <tr style={{ background: '#333333' }}>
                {['Pos', 'Driver', 'Team', 'Grid', 'Laps', 'Time/Gap', 'Points', 'Status'].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left font-semibold whitespace-nowrap" style={{ color: '#A0A0A0' }}>
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
                const borderColor = pos === 1 ? '#F2811D' : pos === 2 ? '#3A3A3A' : pos === 3 ? '#FF9A40' : 'transparent';

                return (
                  <tr
                    key={r.Driver.driverId}
                    className="transition-colors"
                    style={{
                      background: i % 2 === 0 ? '#2E2E2E' : '#262626',
                      borderLeft: `3px solid ${borderColor}`,
                      opacity: isDNF ? 0.5 : 1,
                    }}
                  >
                    <td className="px-3 py-2 font-bold">{pos}</td>
                    <td className="px-3 py-2 font-semibold whitespace-nowrap">
                      {r.Driver.givenName} {r.Driver.familyName}
                      <span className="ml-1.5 text-[10px] font-normal" style={{ color: '#A0A0A0' }}>#{r.number}</span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap" style={{ color: '#A0A0A0' }}>
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
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: '#333333', color: '#FF9A40' }}>
                          DNF
                        </span>
                      ) : (
                        <span className={`text-[10px] font-semibold`}
                          style={{ color: posChange > 0 ? '#F2811D' : posChange < 0 ? '#FF9A40' : '#A0A0A0' }}>
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
