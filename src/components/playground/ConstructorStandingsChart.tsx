import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, CartesianGrid } from 'recharts';

const CHART_COLORS = ['#F2811D', '#FF9A40', '#3A3A3A', '#E5E5E5', '#333333'];

interface ConstructorStandingsChartProps {
  constructors: any[];
}

const ConstructorStandingsChart = ({ constructors }: ConstructorStandingsChartProps) => {
  const data = constructors.map((c: any, i: number) => ({
    name: c.Constructor.name,
    points: parseInt(c.points),
    wins: parseInt(c.wins),
    position: parseInt(c.position),
    teamId: c.Constructor.constructorId,
    colorIdx: i % CHART_COLORS.length,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.[0]) return null;
    const d = payload[0].payload;
    return (
      <div className="rounded-xl p-3 text-xs" style={{ background: '#2E2E2E', border: '1px solid #3A3A3A', color: '#E5E5E5', boxShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
        <p className="font-bold">{d.name}</p>
        <p>Points: {d.points}</p>
        <p>Wins: {d.wins}</p>
      </div>
    );
  };

  return (
    <div className="rounded-2xl p-4 sm:p-5" style={{ background: '#2E2E2E', border: '1px solid #3A3A3A', boxShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
      <h3 className="text-sm font-bold mb-4" style={{ color: '#E5E5E5', fontFamily: "'Titillium Web', sans-serif" }}>
        Constructor Championship Standings
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" opacity={0.6} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#A0A0A0', fontSize: 9 }} angle={-30} textAnchor="end" height={60} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#A0A0A0', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar dataKey="points" radius={[6, 6, 0, 0]} animationDuration={800}>
            {data.map((entry, index) => (
              <Cell key={index} fill={CHART_COLORS[entry.colorIdx]} />
            ))}
            <LabelList dataKey="points" position="top" style={{ fill: '#A0A0A0', fontSize: 10 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConstructorStandingsChart;
