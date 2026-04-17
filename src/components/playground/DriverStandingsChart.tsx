import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, CartesianGrid } from 'recharts';

const CHART_COLORS = ['#F2811D', '#FF9A40', '#3A3A3A', '#E5E5E5', '#333333'];

interface DriverStandingsChartProps {
  standings: any[];
}

const DriverStandingsChart = ({ standings }: DriverStandingsChartProps) => {
  const data = standings.slice(0, 20).map((d: any, i: number) => ({
    name: `${d.Driver.givenName.charAt(0)}. ${d.Driver.familyName}`,
    points: parseInt(d.points),
    wins: parseInt(d.wins),
    position: parseInt(d.position),
    team: d.Constructors?.[0]?.name || '',
    teamId: d.Constructors?.[0]?.constructorId || '',
    fullName: `${d.Driver.givenName} ${d.Driver.familyName}`,
    colorIdx: i % CHART_COLORS.length,
  })).reverse();

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.[0]) return null;
    const d = payload[0].payload;
    return (
      <div className="rounded-xl p-3 text-xs" style={{ background: '#2E2E2E', border: '1px solid #3A3A3A', color: '#E5E5E5', boxShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
        <p className="font-bold">{d.fullName}</p>
        <p style={{ color: '#A0A0A0' }}>{d.team}</p>
        <p>Points: {d.points}</p>
        <p>Wins: {d.wins}</p>
      </div>
    );
  };

  return (
    <div className="rounded-2xl p-4 sm:p-5" style={{ background: '#2E2E2E', border: '1px solid #3A3A3A', boxShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
      <h3 className="text-sm font-bold mb-4" style={{ color: '#E5E5E5', fontFamily: "'Titillium Web', sans-serif" }}>
        Driver Championship Standings
      </h3>
      <ResponsiveContainer width="100%" height={Math.max(400, data.length * 28)}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" opacity={0.6} horizontal={false} />
          <XAxis type="number" tick={{ fill: '#A0A0A0', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fill: '#A0A0A0', fontSize: 10 }} width={80} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar dataKey="points" radius={[0, 6, 6, 0]} animationDuration={800}>
            {data.map((entry, index) => (
              <Cell key={index} fill={CHART_COLORS[entry.colorIdx]} />
            ))}
            <LabelList dataKey="points" position="right" style={{ fill: '#A0A0A0', fontSize: 10 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DriverStandingsChart;
