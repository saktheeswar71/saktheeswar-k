import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CHART_COLORS = ['#99CDD8', '#F3C3B2', '#CFD6C4', '#657166', '#DAEBE3'];

interface PointsProgressionProps {
  races: any[];
  standings: any[];
}

const POINTS_MAP: Record<string, number> = {
  '1': 25, '2': 18, '3': 15, '4': 12, '5': 10,
  '6': 8, '7': 6, '8': 4, '9': 2, '10': 1,
};

const PointsProgression = ({ races, standings }: PointsProgressionProps) => {
  const top5 = standings.slice(0, 5);
  const driverIds = top5.map(d => d.Driver.driverId);
  const [activeDrivers, setActiveDrivers] = useState<string[]>(driverIds);

  const data = useMemo(() => {
    if (races.length === 0) return [];

    const cumulative: Record<string, number> = {};
    driverIds.forEach(id => { cumulative[id] = 0; });

    return races.map((race) => {
      const round: Record<string, any> = {
        round: race.raceName?.replace(' Grand Prix', ' GP')?.split(' ').map((w: string) => w[0]).join('') || `R${race.round}`,
        raceName: race.raceName,
      };
      race.Results?.forEach((result: any) => {
        const id = result.Driver.driverId;
        if (driverIds.includes(id)) {
          cumulative[id] = (cumulative[id] || 0) + (POINTS_MAP[result.position] || 0);
          if (result.FastestLap?.rank === '1' && parseInt(result.position) <= 10) {
            cumulative[id] += 1;
          }
        }
      });
      driverIds.forEach(id => { round[id] = cumulative[id] || 0; });
      return round;
    });
  }, [races, driverIds]);

  const toggleDriver = (id: string) => {
    setActiveDrivers(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const raceName = payload[0]?.payload?.raceName || label;
    return (
      <div className="rounded-xl p-3 text-xs" style={{ background: '#fff', border: '1px solid #CFD6C4', color: '#657166', boxShadow: '0 2px 16px rgba(101,113,102,0.08)' }}>
        <p className="font-bold mb-1">After {raceName}</p>
        {payload.sort((a: any, b: any) => b.value - a.value).map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }}>
            {top5.find(d => d.Driver.driverId === p.dataKey)?.Driver.familyName}: {p.value} pts
          </p>
        ))}
      </div>
    );
  };

  if (data.length === 0) return null;

  return (
    <div className="rounded-2xl p-4 sm:p-5 mt-4" style={{ background: '#fff', border: '1px solid #CFD6C4', boxShadow: '0 2px 16px rgba(101,113,102,0.08)' }}>
      <h3 className="text-sm font-bold mb-1" style={{ color: '#657166', fontFamily: "'Titillium Web', sans-serif" }}>
        Championship Battle — Points After Each Race
      </h3>
      <p className="text-xs mb-4" style={{ color: '#8a9e8f' }}>
        Auto-updates after every race weekend
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#CFD6C4" opacity={0.6} />
          <XAxis dataKey="round" tick={{ fill: '#8a9e8f', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#8a9e8f', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          {top5.map((driver, idx) => {
            const id = driver.Driver.driverId;
            const color = CHART_COLORS[idx % CHART_COLORS.length];
            return (
              <Line
                key={id}
                type="monotone"
                dataKey={id}
                stroke={color}
                strokeWidth={activeDrivers.includes(id) ? 2.5 : 0}
                dot={{ r: 3, fill: color, stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 5, fill: color, stroke: '#fff', strokeWidth: 2 }}
                animationDuration={1200}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-2 mt-4">
        {top5.map((driver, idx) => {
          const id = driver.Driver.driverId;
          const color = CHART_COLORS[idx % CHART_COLORS.length];
          const active = activeDrivers.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggleDriver(id)}
              className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: active ? color : '#fff',
                color: active ? '#fff' : '#657166',
                border: `1px solid ${active ? color : '#CFD6C4'}`,
              }}
            >
              {driver.Driver.familyName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PointsProgression;
