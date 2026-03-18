import { motion } from 'framer-motion';
import { getConstructorColor } from '@/utils/teamColors';

interface F1InsightsProps {
  standings: any[];
  constructors: any[];
  races: any[];
  calendar: any[];
}

const F1Insights = ({ standings, constructors, races, calendar }: F1InsightsProps) => {
  if (!standings || standings.length === 0) return null;

  const leader = standings[0];
  const second = standings[1];
  const gap = leader && second ? parseInt(leader.points) - parseInt(second.points) : 0;
  const racesCompleted = races.length;
  const totalRaces = calendar?.length || 22;
  const racesRemaining = totalRaces - racesCompleted;
  const pointsRemaining = racesRemaining * 26; // 25 + 1 fastest lap
  const titleOpen = pointsRemaining > gap;

  const topConstructor = constructors[0];
  const secondConstructor = constructors[1];
  const constGap = topConstructor && secondConstructor ? parseInt(topConstructor.points) - parseInt(secondConstructor.points) : 0;

  const lastRace = races[races.length - 1];
  const lastRaceWinner = lastRace?.Results?.[0];

  // Check if any team won all races
  const winsByTeam: Record<string, number> = {};
  races.forEach(race => {
    const winnerId = race.Results?.[0]?.Constructor?.constructorId;
    if (winnerId) winsByTeam[winnerId] = (winsByTeam[winnerId] || 0) + 1;
  });
  const dominantTeamId = Object.entries(winsByTeam).sort((a, b) => b[1] - a[1])[0];

  // Check biggest mover in last race
  let bestGain = { name: '', gain: 0, grid: 0, finish: 0 };
  let worstDrop = { name: '', drop: 0, grid: 0, finish: 0 };
  if (lastRace?.Results) {
    lastRace.Results.forEach((r: any) => {
      const gridPos = parseInt(r.grid);
      const finishPos = parseInt(r.position);
      if (isNaN(gridPos) || isNaN(finishPos)) return;
      const change = gridPos - finishPos;
      if (change > bestGain.gain) bestGain = { name: `${r.Driver.givenName} ${r.Driver.familyName}`, gain: change, grid: gridPos, finish: finishPos };
      if (change < worstDrop.drop) worstDrop = { name: `${r.Driver.givenName} ${r.Driver.familyName}`, drop: change, grid: gridPos, finish: finishPos };
    });
  }

  // Check unique winners
  const winners = new Set(races.map(r => r.Results?.[0]?.Driver?.driverId).filter(Boolean));

  const p5 = standings[4];

  const insights = [
    {
      borderColor: dominantTeamId ? getConstructorColor(dominantTeamId[0]) : 'var(--f1-green)',
      text: dominantTeamId
        ? `🥇 ${constructors.find(c => c.Constructor?.constructorId === dominantTeamId[0])?.Constructor?.name || dominantTeamId[0]} have taken ${dominantTeamId[1]} win${dominantTeamId[1] > 1 ? 's' : ''} from ${racesCompleted} race${racesCompleted > 1 ? 's' : ''} so far. ${leader.Driver.givenName} ${leader.Driver.familyName} leads with ${leader.points} pts, ${gap > 0 ? `${gap} ahead of ${second?.Driver?.familyName}` : 'tied at the top'}. With ${racesRemaining} races left, the title is ${titleOpen ? 'still wide open' : 'mathematically decided'}.`
        : 'Season data loading...',
    },
    {
      borderColor: topConstructor ? getConstructorColor(topConstructor.Constructor?.constructorId) : 'var(--f1-muted)',
      text: topConstructor ? `🔧 ${topConstructor.Constructor.name} leads the constructors' championship with ${topConstructor.points} points — ${constGap > 0 ? `${constGap} ahead of ${secondConstructor?.Constructor?.name || 'P2'}` : 'tied'} after ${racesCompleted} round${racesCompleted > 1 ? 's' : ''}.` : 'Constructor data loading...',
    },
    {
      borderColor: 'var(--f1-blue)',
      text: p5
        ? `📊 After ${racesCompleted} race${racesCompleted > 1 ? 's' : ''}, just ${parseInt(leader.points) - parseInt(p5.points)} points separate P1 (${leader.Driver.familyName}) from P5 (${p5.Driver.familyName}). With ${pointsRemaining} points still available this season, the championship is ${titleOpen ? 'wide open' : 'narrowing'}.`
        : `📊 Early days in the 2026 championship — the picture will become clearer as more races are completed.`,
    },
    {
      borderColor: 'var(--f1-accent)',
      text: winners.size > 0
        ? `🏁 So far in 2026, ${winners.size === 1 ? 'only 1 driver has won a race' : `${winners.size} different drivers have won races`}. ${lastRaceWinner ? `${lastRaceWinner.Driver.givenName} ${lastRaceWinner.Driver.familyName} won the ${lastRace.raceName}` : ''}.`
        : 'Race winner data loading...',
    },
    {
      borderColor: 'var(--f1-gold)',
      text: bestGain.name
        ? `📊 ${bestGain.name} showed the biggest improvement in the ${lastRace?.raceName || 'last race'}, starting P${bestGain.grid} and finishing P${bestGain.finish} — a gain of ${bestGain.gain} position${bestGain.gain > 1 ? 's' : ''}. Meanwhile ${worstDrop.name || 'another driver'} had the biggest drop, falling ${Math.abs(worstDrop.drop)} position${Math.abs(worstDrop.drop) > 1 ? 's' : ''}.`
        : 'Position change data will appear after races are completed.',
    },
  ];

  return (
    <section className="px-4 md:px-8 mb-12">
      <div className="container mx-auto max-w-[1200px]">
        <div className="mb-6">
          <span className="text-[10px] font-mono tracking-widest" style={{ color: 'var(--f1-accent)' }}>
            // AUTO ANALYTICS
          </span>
          <h2 className="text-xl sm:text-2xl font-bold mt-1" style={{ color: 'var(--f1-text)', fontFamily: "'Titillium Web', sans-serif" }}>
            What the 2026 data is telling us so far
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--f1-muted)' }}>
            Auto-generated from live race data. Recalculates every time new data loads.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.4 }}
              className="rounded-xl p-4"
              style={{
                background: 'var(--f1-surface)',
                border: '1px solid var(--f1-border)',
                borderLeftWidth: '4px',
                borderLeftColor: insight.borderColor,
              }}
            >
              <p className="text-sm leading-relaxed" style={{ color: 'var(--f1-text)' }}>
                {insight.text}
              </p>
              <p className="text-[10px] mt-2" style={{ color: 'var(--f1-muted)' }}>
                Computed from Jolpica API · {new Date().toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default F1Insights;
