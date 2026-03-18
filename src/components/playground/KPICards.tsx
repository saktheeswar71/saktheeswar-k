import { motion } from 'framer-motion';

interface KPICardsProps {
  standings: any[];
  constructors: any[];
  races: any[];
  totalRaces: number;
}

const KPI_ACCENTS = ['#99CDD8', '#F3C3B2', '#CFD6C4', '#657166'];

const KPICards = ({ standings, constructors, races, totalRaces }: KPICardsProps) => {
  const leader = standings[0];
  const second = standings[1];
  const pointsGap = leader && second ? parseInt(leader.points) - parseInt(second.points) : 0;
  const topConstructor = constructors[0];
  const racesCompleted = races.length;
  const lastRace = races[races.length - 1];
  const lastRaceWinner = lastRace?.Results?.[0];

  const cards = [
    {
      icon: '🏆',
      label: "DRIVERS' LEADER",
      value: leader ? `${leader.Driver.givenName} ${leader.Driver.familyName}` : '--',
      sub: leader ? `${leader.points} pts · ${leader.wins} wins · ${leader.Constructors?.[0]?.name || ''}` : '',
    },
    {
      icon: '📊',
      label: 'CHAMPIONSHIP GAP',
      value: `${pointsGap} points`,
      sub: leader && second ? `${leader.Driver.familyName} leads ${second.Driver.familyName}` : '',
      barPct: leader && parseInt(leader.points) > 0 ? (parseInt(second?.points || '0') / parseInt(leader.points)) * 100 : 0,
    },
    {
      icon: '🔧',
      label: "CONSTRUCTORS' LEADER",
      value: topConstructor?.Constructor?.name || '--',
      sub: topConstructor ? `${topConstructor.points} pts · ${topConstructor.wins} wins` : '',
    },
    {
      icon: '🏁',
      label: 'LAST RACE WINNER',
      value: lastRaceWinner ? `${lastRaceWinner.Driver.givenName} ${lastRaceWinner.Driver.familyName}` : '--',
      sub: lastRace ? `${lastRace.raceName} · ${lastRace.date}` : '',
      extra: lastRaceWinner ? `Starting grid: P${lastRaceWinner.grid}` : undefined,
    },
  ];

  return (
    <section className="px-4 md:px-8 mb-8">
      <div className="container mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="rounded-2xl p-4 relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#fff',
                border: '1px solid #CFD6C4',
                borderTopWidth: '3px',
                borderTopColor: KPI_ACCENTS[i],
                boxShadow: '0 2px 16px rgba(101,113,102,0.08)',
              }}
            >
              <p className="text-[11px] font-semibold mb-2" style={{ color: '#8a9e8f' }}>
                {card.icon} {card.label}
              </p>
              <p className="text-xl sm:text-2xl font-bold truncate" style={{
                color: '#657166',
                fontFamily: "'Titillium Web', sans-serif",
              }}>
                {card.value}
              </p>
              <p className="text-xs mt-1" style={{ color: '#8a9e8f' }}>
                {card.sub}
              </p>
              {card.extra && (
                <p className="text-[10px] mt-0.5" style={{ color: '#8a9e8f' }}>{card.extra}</p>
              )}
              {card.barPct !== undefined && card.barPct > 0 && (
                <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: '#CFD6C4' }}>
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${card.barPct}%`, background: '#99CDD8' }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KPICards;
