import { motion } from 'framer-motion';
import { getConstructorColor } from '@/utils/teamColors';

interface F1InsightsProps {
  standings: any[];
  constructors: any[];
  races: any[];
}

const F1Insights = ({ standings, constructors, races }: F1InsightsProps) => {
  if (standings.length === 0) return null;

  const leader = standings[0];
  const second = standings[1];
  const gap = leader && second ? parseInt(leader.points) - parseInt(second.points) : 0;
  const racesCompleted = races.length;
  const racesRemaining = 24 - racesCompleted;
  const titleOpen = racesRemaining * 25 > gap;

  const topConstructor = constructors[0];
  const secondConstructor = constructors[1];
  const constGap = topConstructor && secondConstructor ? parseInt(topConstructor.points) - parseInt(secondConstructor.points) : 0;

  const lastRace = races[races.length - 1];
  const lastRaceWinner = lastRace?.Results?.[0];

  const insights = [
    {
      borderColor: 'var(--f1-gold)',
      text: leader ? `🏆 ${leader.Driver.givenName} ${leader.Driver.familyName} leads the championship with ${leader.points} points, holding a ${gap}-point advantage over ${second?.Driver?.familyName || 'P2'}. With ${racesRemaining} races left, the title is ${titleOpen ? 'still wide open' : 'mathematically decided'}.` : 'Championship data loading...',
    },
    {
      borderColor: topConstructor ? getConstructorColor(topConstructor.Constructor?.constructorId) : 'var(--f1-muted)',
      text: topConstructor ? `🔧 ${topConstructor.Constructor.name} has been the most dominant constructor this season, taking ${topConstructor.wins} wins from ${racesCompleted} races and scoring ${topConstructor.points} points — ${constGap} ahead of ${secondConstructor?.Constructor?.name || 'P2'} in the constructors' table.` : 'Constructor data loading...',
    },
    {
      borderColor: 'var(--f1-blue)',
      text: lastRace ? `⏱ In the ${lastRace.raceName}, the race was won by ${lastRaceWinner?.Driver?.givenName} ${lastRaceWinner?.Driver?.familyName} with a finishing time of ${lastRaceWinner?.Time?.time || 'N/A'}.` : 'No race data available yet.',
    },
    {
      borderColor: 'var(--f1-accent)',
      text: lastRace ? (() => {
        const results = lastRace.Results || [];
        let bestGain = { name: '', gain: 0 };
        let worstDrop = { name: '', drop: 0 };
        results.forEach((r: any) => {
          const gridPos = parseInt(r.grid);
          const finishPos = parseInt(r.position);
          if (isNaN(gridPos) || isNaN(finishPos)) return;
          const change = gridPos - finishPos;
          if (change > bestGain.gain) bestGain = { name: `${r.Driver.givenName} ${r.Driver.familyName}`, gain: change };
          if (change < worstDrop.drop) worstDrop = { name: `${r.Driver.givenName} ${r.Driver.familyName}`, drop: change };
        });
        return `📊 ${bestGain.name || 'A driver'} showed the biggest improvement, gaining ${bestGain.gain} positions. Meanwhile ${worstDrop.name || 'another driver'} had the biggest drop, falling ${Math.abs(worstDrop.drop)} positions.`;
      })() : 'Race analysis requires completed race data.',
    },
  ];

  return (
    <section className="px-4 md:px-8 mb-12">
      <div className="container mx-auto max-w-[1200px]">
        <div className="mb-6">
          <span className="text-[10px] font-mono tracking-widest" style={{ color: 'var(--f1-muted)' }}>
            // ANALYTICS INSIGHTS
          </span>
          <h2 className="text-xl sm:text-2xl font-bold mt-1" style={{ color: 'var(--f1-text)', fontFamily: "'Titillium Web', sans-serif" }}>
            What the data is telling us
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--f1-muted)' }}>
            Auto-generated from live race data. Recalculates every time you change the race.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="rounded-xl p-4"
              style={{
                background: 'var(--f1-surface)',
                borderLeft: `4px solid ${insight.borderColor}`,
                border: '1px solid var(--f1-border)',
                borderLeftWidth: '4px',
                borderLeftColor: insight.borderColor,
              }}
            >
              <p className="text-sm leading-relaxed" style={{ color: 'var(--f1-text)' }}>
                {insight.text}
              </p>
              <p className="text-[10px] mt-2" style={{ color: 'var(--f1-muted)' }}>
                Calculated from OpenF1 + Jolpica live data
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default F1Insights;
