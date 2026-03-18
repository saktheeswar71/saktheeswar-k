import { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Brush } from 'recharts';
import { getConstructorColor } from '@/utils/teamColors';
import { formatLapTime, parseTimeToSeconds } from '@/utils/f1Helpers';
import { useOpenF1Data } from '@/hooks/useOpenF1Data';

interface LapTimeChartProps {
  races: any[];
  fetchRaceDetail: (round: string) => Promise<any>;
}

const LapTimeChart = ({ races, fetchRaceDetail }: LapTimeChartProps) => {
  const [selectedRound, setSelectedRound] = useState(races.length > 0 ? races[races.length - 1].round : '');
  const [lapData, setLapData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);

  const selectedRace = races.find(r => r.round === selectedRound);
  const results = selectedRace?.Results || [];
  const allDrivers = results.map((r: any) => ({
    id: r.Driver.driverId,
    name: r.Driver.familyName,
    teamId: r.Constructor?.constructorId,
  }));

  useEffect(() => {
    if (selectedRound) {
      setLoading(true);
      fetchRaceDetail(selectedRound)
        .then((detail) => {
          setLapData(detail);
          // Auto-select top 3 drivers
          const top3 = results.slice(0, 3).map((r: any) => r.Driver.driverId);
          setSelectedDrivers(top3);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedRound]);

  const chartData = useMemo(() => {
    if (!lapData?.laps) return [];
    return lapData.laps.map((lap: any) => {
      const point: Record<string, any> = { lap: parseInt(lap.number) };
      lap.Timings?.forEach((t: any) => {
        if (selectedDrivers.includes(t.driverId)) {
          point[t.driverId] = parseTimeToSeconds(t.time);
        }
      });
      return point;
    });
  }, [lapData, selectedDrivers]);

  const pitStopLaps = useMemo(() => {
    if (!lapData?.pits) return {};
    const map: Record<string, number[]> = {};
    lapData.pits.forEach((p: any) => {
      const id = p.driverId;
      if (!map[id]) map[id] = [];
      map[id].push(parseInt(p.lap));
    });
    return map;
  }, [lapData]);

  const toggleDriver = (id: string) => {
    setSelectedDrivers(prev => {
      if (prev.includes(id)) return prev.filter(d => d !== id);
      if (prev.length >= 5) return prev;
      return [...prev, id];
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-lg p-3 text-xs" style={{ background: 'var(--f1-surface2)', border: '1px solid var(--f1-border)', color: 'var(--f1-text)' }}>
        <p className="font-bold mb-1">Lap {label}</p>
        {payload.map((p: any) => {
          const driver = allDrivers.find((d: any) => d.id === p.dataKey);
          return (
            <p key={p.dataKey} style={{ color: p.color }}>
              {driver?.name}: {formatLapTime(p.value)}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <select
          value={selectedRound}
          onChange={(e) => setSelectedRound(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm outline-none"
          style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)', color: 'var(--f1-text)' }}
        >
          {races.map(race => (
            <option key={race.round} value={race.round}>R{race.round} — {race.raceName}</option>
          ))}
        </select>
        <span className="text-[10px]" style={{ color: 'var(--f1-muted)' }}>Select up to 5 drivers</span>
      </div>

      {/* Driver chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {allDrivers.map((driver: any) => {
          const active = selectedDrivers.includes(driver.id);
          const color = getConstructorColor(driver.teamId);
          return (
            <button
              key={driver.id}
              onClick={() => toggleDriver(driver.id)}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all"
              style={{
                background: active ? color : 'transparent',
                color: active ? '#fff' : 'var(--f1-muted)',
                border: `1px solid ${active ? color : 'var(--f1-border)'}`,
              }}
            >
              {driver.name}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      {loading ? (
        <div className="h-[350px] rounded-xl animate-pulse" style={{ background: 'var(--f1-surface)' }} />
      ) : chartData.length > 0 ? (
        <div className="rounded-xl p-4" style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)' }}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
              <XAxis dataKey="lap" tick={{ fill: 'var(--f1-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: 'var(--f1-muted)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                domain={['auto', 'auto']}
                tickFormatter={(v) => formatLapTime(v)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Brush dataKey="lap" height={20} stroke="var(--f1-border)" fill="var(--f1-bg)" />
              {/* Pit stop reference lines */}
              {selectedDrivers.flatMap(id =>
                (pitStopLaps[id] || []).map(lap => (
                  <ReferenceLine key={`${id}-${lap}`} x={lap} stroke="var(--f1-muted)" strokeDasharray="3 3" strokeOpacity={0.4} />
                ))
              )}
              {selectedDrivers.map(id => {
                const driver = allDrivers.find((d: any) => d.id === id);
                const color = getConstructorColor(driver?.teamId);
                return (
                  <Line
                    key={id}
                    type="monotone"
                    dataKey={id}
                    stroke={color}
                    strokeWidth={1.5}
                    dot={false}
                    activeDot={{ r: 3, fill: color }}
                    connectNulls
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[350px] rounded-xl flex items-center justify-center" style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)' }}>
          <p className="text-sm" style={{ color: 'var(--f1-muted)' }}>
            {races.length === 0 ? 'No race data available' : 'Select drivers to view lap times'}
          </p>
        </div>
      )}
    </div>
  );
};

export default LapTimeChart;
