export interface ScoreResult {
  finalScore: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  hits: string[];
  missed: string[];
  extras: string[];
  hintPenalty: number;
  timeBonus: number;
  message: string;
  emoji: string;
}

export function calculateScore(
  selected: string[],
  correct: string[],
  hintsUsed: number,
  timeMs: number
): ScoreResult {
  const correctSet = new Set(correct);
  const selectedSet = new Set(selected);

  const hits = selected.filter(a => correctSet.has(a));
  const extras = selected.filter(a => !correctSet.has(a));
  const missed = correct.filter(a => !selectedSet.has(a));

  const baseScore = Math.round((hits.length / correct.length) * 100);
  const hintPenalty = hintsUsed * 10;
  const extraPenalty = extras.length * 5;
  const timeBonus = timeMs < 30000 ? 10 : timeMs < 60000 ? 5 : 0;

  const finalScore = Math.max(0, Math.min(100,
    baseScore - hintPenalty - extraPenalty + timeBonus
  ));

  const grade: ScoreResult['grade'] =
    finalScore === 100 ? 'S'
      : finalScore >= 80 ? 'A'
        : finalScore >= 60 ? 'B'
          : finalScore >= 40 ? 'C'
            : 'D';

  const messages: Record<ScoreResult['grade'], { text: string; emoji: string }> = {
    S: { text: "Perfect clean! You're a data analyst pro!", emoji: "🏆" },
    A: { text: "Great work! Almost flawless!", emoji: "🎯" },
    B: { text: "Solid effort! A few things to polish.", emoji: "💪" },
    C: { text: "Getting there! Review the explanation.", emoji: "📊" },
    D: { text: "Keep practicing — every analyst starts here!", emoji: "🌱" },
  };

  return {
    finalScore,
    grade,
    hits,
    missed,
    extras,
    hintPenalty,
    timeBonus,
    message: messages[grade].text,
    emoji: messages[grade].emoji,
  };
}

export const ACTION_CONFIG: Record<string, {
  id: string;
  label: string;
  icon: string;
  description: string;
}> = {
  remove_duplicates: {
    id: 'remove_duplicates',
    label: 'Remove Duplicates',
    icon: '🔁',
    description: 'Delete rows that appear more than once in the dataset',
  },
  fill_missing: {
    id: 'fill_missing',
    label: 'Fill Missing Values',
    icon: '🔲',
    description: 'Replace NULL cells with column mean/median/mode',
  },
  standardize_formats: {
    id: 'standardize_formats',
    label: 'Standardize Formats',
    icon: '🔤',
    description: 'Fix inconsistent casing, date formats, abbreviations',
  },
  remove_outliers: {
    id: 'remove_outliers',
    label: 'Remove Outliers',
    icon: '📉',
    description: 'Remove statistically extreme values (3σ rule)',
  },
};

export function applyActions(rows: any[], actions: string[]) {
  let result = rows.map(r => ({ ...r }));

  if (actions.includes('remove_duplicates')) {
    const seen = new Set<string>();
    result = result.filter(row => {
      const { id, _issues, ...rest } = row;
      const key = JSON.stringify(rest);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  if (actions.includes('fill_missing')) {
    const numericCols = Object.keys(result[0] || {})
      .filter(k => !k.startsWith('_') && k !== 'id'
        && typeof result.find(r => r[k] !== null)?.[k] === 'number');

    numericCols.forEach(col => {
      const vals = result.filter(r => r[col] !== null).map(r => r[col]);
      if (!vals.length) return;
      const avg = vals.reduce((a: number, b: number) => a + b, 0) / vals.length;
      result = result.map(r => ({
        ...r,
        [col]: r[col] === null ? Math.round(avg * 100) / 100 : r[col],
      }));
    });
  }

  if (actions.includes('standardize_formats')) {
    const formatMap: Record<string, string> = {
      'NY': 'New York', 'ny': 'New York', 'new york': 'New York',
      'LA': 'Los Angeles', 'la': 'Los Angeles',
      'chicago': 'Chicago', 'engineering': 'Engineering',
      'mktg': 'Marketing', 'yes': 'Yes', 'YES': 'Yes',
      'no': 'No', 'NO': 'No', 'N': 'No', 'Y': 'Yes',
    };

    result = result.map(r => {
      const cleaned = { ...r };
      Object.keys(cleaned).forEach(k => {
        if (k.startsWith('_')) return;
        if (typeof cleaned[k] === 'string') {
          if (formatMap[cleaned[k]]) {
            cleaned[k] = formatMap[cleaned[k]];
          }
          if (k === 'name' && cleaned[k]) {
            cleaned[k] = cleaned[k].charAt(0).toUpperCase() + cleaned[k].slice(1);
          }
          if (k === 'joined' || k === 'date') {
            cleaned[k] = cleaned[k]
              .replace(/\//g, '-')
              .replace(/^(\d{2})-(\d{2})-(\d{4})$/, '$3-$2-$1')
              .replace(/^([A-Za-z]{3})\s+(\d{1,2})\s+(\d{4})$/,
                (_: string, m: string, d: string, y: string) => {
                  const months: Record<string, string> = {
                    Jan: '01', Feb: '02', Mar: '03', Apr: '04',
                    May: '05', Jun: '06', Jul: '07', Aug: '08',
                    Sep: '09', Oct: '10', Nov: '11', Dec: '12',
                  };
                  return `${y}-${months[m]}-${d.padStart(2, '0')}`;
                });
          }
          if (k === 'product' && cleaned[k]) {
            cleaned[k] = cleaned[k].charAt(0).toUpperCase() + cleaned[k].slice(1);
          }
        }
      });
      return cleaned;
    });
  }

  if (actions.includes('remove_outliers')) {
    const numericCols = Object.keys(result[0] || {})
      .filter(k => !k.startsWith('_') && k !== 'id'
        && typeof result.find(r => r[k] !== null)?.[k] === 'number');

    numericCols.forEach(col => {
      const vals = result.filter(r => r[col] !== null).map(r => r[col]);
      if (vals.length < 3) return;
      const mean = vals.reduce((a: number, b: number) => a + b, 0) / vals.length;
      const std = Math.sqrt(
        vals.reduce((s: number, v: number) => s + (v - mean) ** 2, 0) / vals.length
      );
      result = result.filter(r =>
        r[col] === null ||
        (r[col] >= 0 && Math.abs(r[col] - mean) <= 3 * std)
      );
    });
  }

  return result.map(({ _issues, ...rest }) => rest);
}
