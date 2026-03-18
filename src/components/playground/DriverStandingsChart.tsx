import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { getConstructorColor } from '@/utils/teamColors';

interface DriverStandingsChartProps {
  standings: any[];
}

const DriverStandingsChart = ({ standings }: DriverStandingsChartProps) => {
  const data = standings.slice(0, 20).map((d: any) => ({
    name: `${d.Driver.givenName.charAt(0)}. ${d.Driver.familyName}`,
    points: parseInt(d.points),
    wins: parseInt(d.wins),
    position: parseInt(d.position),
    team: d.Constructors?.[0]?.name || '',
    teamId: d.Constructors?.[0]?.constructorId || '',
    fullName: `${d.Driver.givenName} ${d.Driver.familyName}`,
  })).reverse();

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.[0]) return null;
    const d = payload[0].payload;
    return (
      <div className="rounded-lg p-3 text-xs" style={{ background: 'var(--f1-surface2)', border: '1px solid var(--f1-border)', color: 'var(--f1-text)' }}>
        <p className="font-bold">{d.fullName}</p>
        <p style={{ color: getConstructorColor(d.teamId) }}>{d.team}</p>
        <p>Points: {d.points}</p>
        <p>Wins: {d.wins}</p>
      </div>
    );
  };

  return (
    <div className="rounded-xl p-4 sm:p-5" style={{ background: 'var(--f1-surface)', border: '1px solid var(--f1-border)' }}>
      <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--f1-text)', fontFamily: "'Titillium Web', sans-serif" }}>
        Driver Championship Standings
      </h3>
      <ResponsiveContainer width="100%" height={Math.max(400, data.length * 28)}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 0 }}>
          <XAxis type="number" tick={{ fill: 'var(--f1-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fill: 'var(--f1-muted)', fontSize: 10 }} width={80} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar dataKey="points" radius={[0, 4, 4, 0]} animationDuration={800}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getConstructorColor(entry.teamId)} />
            ))}
            <LabelList dataKey="points" position="right" style={{ fill: 'var(--f1-muted)', fontSize: 10 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DriverStandingsChart;
