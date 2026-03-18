export const TEAM_COLORS: Record<string, string> = {
  // 2026 teams
  'red_bull': '#3671C6',
  'mercedes': '#00d2be',
  'ferrari': '#e8002d',
  'mclaren': '#ff8000',
  'aston_martin': '#006f62',
  'alpine': '#0093cc',
  'williams': '#005aff',
  'haas': '#b6babd',
  'rb': '#6692ff',
  'sauber': '#52e252',
  'cadillac': '#dc143c',
  'audi': '#52e252',
  // Aliases
  'red bull': '#3671C6',
  'Red Bull': '#3671C6',
  'red bull racing': '#3671C6',
  'Mercedes': '#00d2be',
  'Ferrari': '#e8002d',
  'McLaren': '#ff8000',
  'mclaren racing': '#ff8000',
  'Aston Martin': '#006f62',
  'Alpine': '#0093cc',
  'alpine f1 team': '#0093cc',
  'Williams': '#005aff',
  'williams racing': '#005aff',
  'Haas': '#b6babd',
  'haas f1 team': '#b6babd',
  'RB': '#6692ff',
  'rb f1 team': '#6692ff',
  'racing bulls': '#6692ff',
  'Sauber': '#52e252',
  'kick sauber': '#52e252',
  'stake f1 team kick sauber': '#52e252',
  'Cadillac': '#dc143c',
  'cadillac f1': '#dc143c',
  'Audi': '#52e252',
  'audi f1': '#52e252',
};

export const TYRE_COLORS: Record<string, string> = {
  SOFT: '#FF3333',
  MEDIUM: '#FFD700',
  HARD: '#EEEEEE',
  INTERMEDIATE: '#39B54A',
  INTER: '#39B54A',
  WET: '#0077FF',
  UNKNOWN: '#888888',
};

export function getTeamColor(teamName: string): string {
  if (!teamName) return '#888888';
  const lower = teamName.toLowerCase();
  for (const [key, color] of Object.entries(TEAM_COLORS)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return color;
    }
  }
  return '#888888';
}

export function getConstructorColor(constructorId: string): string {
  const mapping: Record<string, string> = {
    red_bull: '#3671C6',
    mercedes: '#00d2be',
    ferrari: '#e8002d',
    mclaren: '#ff8000',
    aston_martin: '#006f62',
    alpine: '#0093cc',
    williams: '#005aff',
    haas: '#b6babd',
    rb: '#6692ff',
    sauber: '#52e252',
    cadillac: '#dc143c',
    audi: '#52e252',
  };
  return mapping[constructorId] || '#888888';
}

export const COUNTRY_FLAGS: Record<string, string> = {
  'Australia': '🇦🇺', 'Bahrain': '🇧🇭', 'Saudi Arabia': '🇸🇦',
  'Japan': '🇯🇵', 'China': '🇨🇳', 'USA': '🇺🇸', 'Italy': '🇮🇹',
  'Monaco': '🇲🇨', 'Canada': '🇨🇦', 'Spain': '🇪🇸', 'Austria': '🇦🇹',
  'UK': '🇬🇧', 'Hungary': '🇭🇺', 'Belgium': '🇧🇪', 'Netherlands': '🇳🇱',
  'Singapore': '🇸🇬', 'Azerbaijan': '🇦🇿', 'Mexico': '🇲🇽', 'Brazil': '🇧🇷',
  'UAE': '🇦🇪', 'Qatar': '🇶🇦', 'United States': '🇺🇸',
  'Great Britain': '🇬🇧', 'Miami': '🇺🇸', 'Las Vegas': '🇺🇸',
  'Emilia Romagna': '🇮🇹', 'São Paulo': '🇧🇷',
  'Abu Dhabi': '🇦🇪',
};

export function getCountryFlag(country: string): string {
  return COUNTRY_FLAGS[country] || '🏁';
}
