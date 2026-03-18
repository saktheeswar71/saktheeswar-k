import { motion } from 'framer-motion';
import { getConstructorColor } from '@/utils/teamColors';

interface KPICardsProps {
  standings: any[];
  constructors: any[];
  races: any[];
}

const KPICards = ({ standings, constructors, races }: KPICardsProps) => {
  const leader = standings[0];
  const second = standings[1];
  const pointsGap = leader && second ? parseInt(leader.points) - parseInt(second.points) : 0;
  const topConstructor = constructors[0];
  const racesCompleted = races.length;
  const totalRaces = 24;

  const cards = [
    {
      borderColor: 'var(--f1-accent)',
      label: '🏆 Championship Leader',
      value: leader ? `${leader.Driver.givenName} ${leader.Driver.familyName}` : '--',
      valueColor: 'var(--f1-gold)',
      sub: leader ? `${leader.points} points · ${leader.wins} wins` : '',
      badge: leader?.Constructors?.[0]?.name || '',
      badgeColor: leader ? getConstructorColor(leader.Constructors[0]?.constructorId) : undefined,
    },
    {
      borderColor: 'var(--f1-blue)',
      label: '📊 Gap to P2',
      value: `${pointsGap} points`,
      valueColor: 'var(--f1-text)',
      sub: leader && second ? `${leader.Driver.familyName} vs ${second.Driver.familyName}` : '',
      barPct: leader ? (parseInt(second?.points || '0') / parseInt(leader.points)) * 100 : 0,
    },
    {
      borderColor: '#39B54A',
      label: '🏁 Races Completed',
      value: `${racesCompleted} / ${totalRaces}`,
      valueColor: 'var(--f1-text)',
      sub: `${totalRaces - racesCompleted} races remaining`,
      progressPct: (racesCompleted / totalRaces) * 100,
    },
    {
      borderColor: topConstructor ? getConstructorColor(topConstructor.constructorId) : 'var(--f1-muted)',
      label: '🔧 Leading Constructor',
      value: topConstructor?.Constructor?.name || '--',
      valueColor: topConstructor ? getConstructorColor(topConstructor.constructorId) : 'var(--f1-text)',
      sub: topConstructor ? `${topConstructor.points} points · ${topConstructor.wins} wins` : '',
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
              className="rounded-xl p-4 relative overflow-hidden"
              style={{
                background: 'var(--f1-surface)',
                border: '1px solid var(--f1-border)',
                borderTopWidth: '3px',
                borderTopColor: card.borderColor,
              }}
            >
              <p className="text-[11px] font-semibold mb-2" style={{ color: 'var(--f1-muted)' }}>
                {card.label}
              </p>
              <p className="text-xl sm:text-2xl font-bold truncate" style={{
                color: card.valueColor,
                fontFamily: "'Titillium Web', sans-serif",
                fontVariantNumeric: 'tabular-nums',
              }}>
                {card.value}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--f1-muted)' }}>
                {card.sub}
              </p>
              {card.badge && (
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold"
                  style={{ color: card.badgeColor, background: `${card.badgeColor}20` }}>
                  {card.badge}
                </span>
              )}
              {card.barPct !== undefined && card.barPct > 0 && (
                <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--f1-bg)' }}>
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${card.barPct}%`, background: 'var(--f1-blue)' }} />
                </div>
              )}
              {card.progressPct !== undefined && (
                <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--f1-bg)' }}>
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${card.progressPct}%`, background: '#39B54A' }} />
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
