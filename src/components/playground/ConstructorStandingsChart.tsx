import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { getConstructorColor } from '@/utils/teamColors';

interface ConstructorStandingsChartProps {
  constructors: any[];
}

const ConstructorStandingsChart = ({ constructors }: ConstructorStandingsChartProps) => {
  const data = constructors.map((c: any) => ({
    name: c.Constructor.name,
    points: parseInt(c.points),
    wins: parseInt(c.wins),
    position: parseInt(c.position),
    teamId: c.Constructor.constructorId,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.[0]) return null;
    const d = payload[0].payload;
    return (
      <div className="rounded-lg p-3 text-xs" style={{ background: 'var(--f1-surface2)', border: '1px solid var(--f1-border)', color: 'var(--f1-text)' }}>
        <p className="font-bold" style={{ color: getConstructorColor(d.teamId) }}>{d.name}</p>
        <p>Points: {d.points}</p>
        <p>Wins: {d.wins}</p>
      </div>
    );
  };

  return (
    <div className="rounded-xl p-4 sm:p-5" style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)' }}>
      <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--f1-text)', fontFamily: "'Titillium Web', sans-serif" }}>
        Constructor Championship Standings
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
          <XAxis dataKey="name" tick={{ fill: 'var(--f1-muted)', fontSize: 9 }} angle={-30} textAnchor="end" height={60} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--f1-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar dataKey="points" radius={[4, 4, 0, 0]} animationDuration={800}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getConstructorColor(entry.teamId)} />
            ))}
            <LabelList dataKey="points" position="top" style={{ fill: 'var(--f1-muted)', fontSize: 10 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConstructorStandingsChart;
