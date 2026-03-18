import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TYRE_COLORS } from '@/utils/teamColors';
import { useOpenF1Data } from '@/hooks/useOpenF1Data';

interface TyreStrategyChartProps {
  races: any[];
}

const TyreStrategyChart = ({ races }: TyreStrategyChartProps) => {
  const { fetchSessions, fetchStints, fetchPits } = useOpenF1Data();
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>('');
  const [stints, setStints] = useState<any[]>([]);
  const [pits, setPits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchSessions(2025).then((data: any[]) => {
      // Also try 2024 if empty
      if (!data || data.length === 0) {
        fetchSessions(2024).then((data2: any[]) => {
          const raceSessions = (data2 || []).filter((s: any) => s.session_type === 'Race');
          setSessions(raceSessions);
          if (raceSessions.length > 0) setSelectedSession(raceSessions[raceSessions.length - 1].session_key?.toString());
        });
      } else {
        const raceSessions = data.filter((s: any) => s.session_type === 'Race');
        setSessions(raceSessions);
        if (raceSessions.length > 0) setSelectedSession(raceSessions[raceSessions.length - 1].session_key?.toString());
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedSession) return;
    setLoading(true);
    Promise.all([
      fetchStints(selectedSession),
      fetchPits(selectedSession),
      fetch(`https://api.openf1.org/v1/drivers?session_key=${selectedSession}`).then(r => r.json()).catch(() => []),
    ]).then(([stintData, pitData, driverData]) => {
      setStints(stintData || []);
      setPits(pitData || []);
      const driverMap: Record<number, string> = {};
      (driverData || []).forEach((d: any) => {
        driverMap[d.driver_number] = d.name_acronym || `#${d.driver_number}`;
      });
      setDrivers(driverMap);
    }).finally(() => setLoading(false));
  }, [selectedSession]);

  const maxLap = useMemo(() => {
    if (stints.length === 0) return 60;
    return Math.max(...stints.map((s: any) => s.lap_end || 0), 60);
  }, [stints]);

  const driverNumbers = useMemo(() => {
    const nums = [...new Set(stints.map((s: any) => s.driver_number))];
    return nums.sort((a, b) => a - b);
  }, [stints]);

  const currentSessionInfo = sessions.find(s => s.session_key?.toString() === selectedSession);

  return (
    <div>
      {/* Session Selector */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--f1-muted)' }}>
          Session
        </label>
        <select
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm outline-none"
          style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)', color: 'var(--f1-text)' }}
        >
          {sessions.map(s => (
            <option key={s.session_key} value={s.session_key?.toString()}>
              {s.circuit_short_name || 'Circuit'} — {s.session_name}
            </option>
          ))}
        </select>
        {currentSessionInfo && (
          <span className="text-[10px]" style={{ color: 'var(--f1-muted)' }}>
            {currentSessionInfo.date_start?.split('T')[0]}
          </span>
        )}
      </div>

      {loading ? (
        <div className="h-[500px] rounded-xl animate-pulse" style={{ background: 'var(--f1-surface)' }} />
      ) : stints.length > 0 ? (
        <>
          {/* Tyre Timeline SVG */}
          <div className="rounded-xl p-4 overflow-x-auto" style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)' }}>
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--f1-text)', fontFamily: "'Titillium Web', sans-serif" }}>
              Tyre Strategy Timeline
            </h3>
            <svg width={Math.max(700, maxLap * 10 + 120)} height={driverNumbers.length * 28 + 40} className="min-w-[700px]">
              {/* X-axis labels */}
              {Array.from({ length: Math.ceil(maxLap / 10) + 1 }, (_, i) => i * 10).map(lap => (
                <text key={lap} x={100 + lap * ((Math.max(700, maxLap * 10) - 120) / maxLap)} y={driverNumbers.length * 28 + 30} fill="var(--f1-muted)" fontSize={9} textAnchor="middle">
                  L{lap}
                </text>
              ))}

              {driverNumbers.map((num, idx) => {
                const driverStints = stints.filter((s: any) => s.driver_number === num);
                const y = idx * 28 + 10;
                const barWidth = (Math.max(700, maxLap * 10) - 120) / maxLap;

                return (
                  <g key={num}>
                    <text x={0} y={y + 15} fill="var(--f1-muted)" fontSize={10} fontWeight={600}>
                      {drivers[num] || `#${num}`}
                    </text>
                    {driverStints.map((stint: any, si: number) => {
                      const x1 = 100 + (stint.lap_start - 1) * barWidth;
                      const width = ((stint.lap_end || stint.lap_start) - stint.lap_start + 1) * barWidth;
                      const compound = stint.compound || 'UNKNOWN';
                      const color = TYRE_COLORS[compound] || TYRE_COLORS.UNKNOWN;

                      return (
                        <g key={si}>
                          <rect
                            x={x1}
                            y={y + 2}
                            width={Math.max(width, 2)}
                            height={18}
                            rx={3}
                            fill={color}
                            opacity={0.85}
                          >
                            <title>
                              {drivers[num]} | {compound} | Laps {stint.lap_start}–{stint.lap_end || '?'} | {(stint.lap_end || stint.lap_start) - stint.lap_start + 1} laps
                            </title>
                          </rect>
                          {width > 20 && (
                            <text x={x1 + width / 2} y={y + 14} fill={compound === 'HARD' ? '#333' : '#fff'} fontSize={8} textAnchor="middle" fontWeight={600}>
                              {compound.charAt(0)}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-4">
              {Object.entries(TYRE_COLORS).filter(([k]) => k !== 'UNKNOWN').map(([compound, color]) => (
                <div key={compound} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm" style={{ background: color }} />
                  <span className="text-[10px] font-semibold" style={{ color: 'var(--f1-muted)' }}>{compound}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pit Stop Summary Table */}
          {pits.length > 0 && (
            <div className="rounded-xl overflow-hidden mt-4" style={{ border: '1px solid var(--f1-border)' }}>
              <div className="p-4 pb-2" style={{ background: 'var(--f1-surface)' }}>
                <h3 className="text-sm font-bold" style={{ color: 'var(--f1-text)', fontFamily: "'Titillium Web', sans-serif" }}>
                  Pit Stop Summary
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs" style={{ color: 'var(--f1-text)' }}>
                  <thead>
                    <tr style={{ background: 'var(--f1-surface2)' }}>
                      {['Driver', 'Lap', 'Duration'].map(h => (
                        <th key={h} className="px-3 py-2 text-left font-semibold" style={{ color: 'var(--f1-muted)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pits
                      .sort((a: any, b: any) => (a.lap_number || 0) - (b.lap_number || 0))
                      .map((pit: any, i: number) => {
                        const duration = pit.pit_duration || pit.stop_duration || 0;
                        const fastestDuration = Math.min(...pits.map((p: any) => p.pit_duration || p.stop_duration || 99));
                        const isFastest = duration > 0 && duration === fastestDuration;

                        return (
                          <tr key={i} style={{ background: i % 2 === 0 ? 'var(--f1-surface)' : 'var(--f1-bg)' }}>
                            <td className="px-3 py-2 font-semibold">{drivers[pit.driver_number] || `#${pit.driver_number}`}</td>
                            <td className="px-3 py-2">{pit.lap_number || '--'}</td>
                            <td className="px-3 py-2 tabular-nums">
                              <span style={{
                                color: duration < 2.5 ? '#39B54A' : duration < 3.5 ? '#FFD700' : duration < 99 ? 'var(--f1-accent)' : 'var(--f1-muted)',
                              }}>
                                {duration > 0 ? `${duration.toFixed(1)}s` : '--'}
                              </span>
                              {isFastest && (
                                <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: 'rgba(57,181,74,0.15)', color: '#39B54A' }}>
                                  ⚡ Fastest
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
          )}
        </>
      ) : (
        <div className="h-[300px] rounded-xl flex items-center justify-center" style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)' }}>
          <p className="text-sm" style={{ color: 'var(--f1-muted)' }}>No tyre strategy data available for this session</p>
        </div>
      )}
    </div>
  );
};

export default TyreStrategyChart;
