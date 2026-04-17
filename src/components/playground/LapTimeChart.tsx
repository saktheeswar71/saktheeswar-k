import { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Brush, CartesianGrid } from 'recharts';
import { formatLapTime, parseTimeToSeconds } from '@/utils/f1Helpers';

const CHART_COLORS = ['#F2811D', '#FF9A40', '#3A3A3A', '#E5E5E5', '#333333'];

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
      <div className="rounded-xl p-3 text-xs" style={{ background: '#2E2E2E', border: '1px solid #3A3A3A', color: '#E5E5E5', boxShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
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
          className="px-3 py-2 rounded-xl text-sm outline-none focus:ring-2"
          style={{ background: '#2E2E2E', border: '1px solid #3A3A3A', color: '#E5E5E5' }}
        >
          {races.map(race => (
            <option key={race.round} value={race.round}>R{race.round} — {race.raceName}</option>
          ))}
        </select>
        <span className="text-[10px]" style={{ color: '#A0A0A0' }}>Select up to 5 drivers</span>
      </div>

      {/* Driver chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {allDrivers.map((driver: any, idx: number) => {
          const active = selectedDrivers.includes(driver.id);
          const color = CHART_COLORS[idx % CHART_COLORS.length];
          return (
            <button
              key={driver.id}
              onClick={() => toggleDriver(driver.id)}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all hover:-translate-y-0.5"
              style={{
                background: active ? color : '#2E2E2E',
                color: active ? '#2E2E2E' : '#E5E5E5',
                border: `1px solid ${active ? color : '#3A3A3A'}`,
              }}
            >
              {driver.name}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      {loading ? (
        <div className="h-[350px] rounded-2xl" style={{ background: 'linear-gradient(90deg, #2E2E2E 25%, #333333 50%, #2E2E2E 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      ) : chartData.length > 0 ? (
        <div className="rounded-2xl p-4" style={{ background: '#2E2E2E', border: '1px solid #3A3A3A', boxShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" opacity={0.6} />
              <XAxis dataKey="lap" tick={{ fill: '#A0A0A0', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: '#A0A0A0', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                domain={['auto', 'auto']}
                tickFormatter={(v) => formatLapTime(v)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Brush dataKey="lap" height={20} stroke="#3A3A3A" fill="#262626" />
              {selectedDrivers.flatMap(id =>
                (pitStopLaps[id] || []).map(lap => (
                  <ReferenceLine key={`${id}-${lap}`} x={lap} stroke="#3A3A3A" strokeDasharray="3 3" strokeOpacity={0.6} />
                ))
              )}
              {selectedDrivers.map((id, idx) => {
                const color = CHART_COLORS[idx % CHART_COLORS.length];
                return (
                  <Line
                    key={id}
                    type="monotone"
                    dataKey={id}
                    stroke={color}
                    strokeWidth={1.5}
                    dot={false}
                    activeDot={{ r: 4, fill: color, stroke: '#2E2E2E', strokeWidth: 2 }}
                    connectNulls
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[350px] rounded-2xl flex items-center justify-center" style={{ background: '#2E2E2E', border: '1px solid #3A3A3A' }}>
          <p className="text-sm" style={{ color: '#A0A0A0' }}>
            {races.length === 0 ? 'No race data available' : 'Select drivers to view lap times'}
          </p>
        </div>
      )}
    </div>
  );
};

export default LapTimeChart;
