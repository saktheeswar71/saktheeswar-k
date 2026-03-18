import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getConstructorColor } from '@/utils/teamColors';

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
      const round: Record<string, any> = { round: `R${race.round}`, raceName: race.raceName };
      race.Results?.forEach((result: any) => {
        const id = result.Driver.driverId;
        if (driverIds.includes(id)) {
          cumulative[id] = (cumulative[id] || 0) + (POINTS_MAP[result.position] || 0);
          // Add fastest lap point
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
      <div className="rounded-lg p-3 text-xs" style={{ background: 'var(--f1-surface2)', border: '1px solid var(--f1-border)', color: 'var(--f1-text)' }}>
        <p className="font-bold mb-1">{raceName}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }}>
            {top5.find(d => d.Driver.driverId === p.dataKey)?.Driver.familyName}: {p.value} pts
          </p>
        ))}
      </div>
    );
  };

  if (data.length === 0) return null;

  return (
    <div className="rounded-xl p-4 sm:p-5 mt-4" style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)' }}>
      <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--f1-text)', fontFamily: "'Titillium Web', sans-serif" }}>
        Championship Points Race — Round by Round
      </h3>
      <p className="text-xs mb-4" style={{ color: 'var(--f1-muted)' }}>
        How the top 5 drivers' points evolved across the season
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <XAxis dataKey="round" tick={{ fill: 'var(--f1-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--f1-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          {top5.map((driver) => {
            const id = driver.Driver.driverId;
            const color = getConstructorColor(driver.Constructors?.[0]?.constructorId);
            return (
              <Line
                key={id}
                type="monotone"
                dataKey={id}
                stroke={color}
                strokeWidth={activeDrivers.includes(id) ? 2.5 : 0}
                dot={false}
                activeDot={{ r: 4, fill: color }}
                animationDuration={1200}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>

      {/* Driver toggle pills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {top5.map((driver) => {
          const id = driver.Driver.driverId;
          const color = getConstructorColor(driver.Constructors?.[0]?.constructorId);
          const active = activeDrivers.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggleDriver(id)}
              className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: active ? color : 'transparent',
                color: active ? '#fff' : 'var(--f1-muted)',
                border: `1px solid ${active ? color : 'var(--f1-border)'}`,
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
