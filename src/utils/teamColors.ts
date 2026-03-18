export const TEAM_COLORS: Record<string, string> = {
  'red_bull': '#3671C6',
  'mercedes': '#27F4D2',
  'ferrari': '#E8002D',
  'mclaren': '#FF8000',
  'aston_martin': '#229971',
  'alpine': '#FF87BC',
  'williams': '#64C4FF',
  'haas': '#B6BABD',
  'rb': '#6692FF',
  'sauber': '#52E252',
  // Aliases for API variations
  'red bull': '#3671C6',
  'Red Bull': '#3671C6',
  'red bull racing': '#3671C6',
  'Mercedes': '#27F4D2',
  'Ferrari': '#E8002D',
  'McLaren': '#FF8000',
  'mclaren racing': '#FF8000',
  'Aston Martin': '#229971',
  'Alpine': '#FF87BC',
  'alpine f1 team': '#FF87BC',
  'Williams': '#64C4FF',
  'Haas': '#B6BABD',
  'haas f1 team': '#B6BABD',
  'RB': '#6692FF',
  'rb f1 team': '#6692FF',
  'racing bulls': '#6692FF',
  'Sauber': '#52E252',
  'kick sauber': '#52E252',
  'stake f1 team kick sauber': '#52E252',
};

export const TYRE_COLORS: Record<string, string> = {
  SOFT: '#FF3333',
  MEDIUM: '#FFD700',
  HARD: '#EEEEEE',
  INTERMEDIATE: '#39B54A',
  INTER: '#39B54A',
  WET: '#0067FF',
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
    mercedes: '#27F4D2',
    ferrari: '#E8002D',
    mclaren: '#FF8000',
    aston_martin: '#229971',
    alpine: '#FF87BC',
    williams: '#64C4FF',
    haas: '#B6BABD',
    rb: '#6692FF',
    sauber: '#52E252',
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
