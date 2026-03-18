export function formatLapTime(seconds: number | string | undefined): string {
  if (!seconds) return '--';
  const s = typeof seconds === 'string' ? parseFloat(seconds) : seconds;
  if (isNaN(s)) return typeof seconds === 'string' ? seconds : '--';
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  if (mins > 0) {
    return `${mins}:${secs.toFixed(3).padStart(6, '0')}`;
  }
  return secs.toFixed(3);
}

export function parseTimeToSeconds(time: string): number {
  if (!time) return 0;
  const parts = time.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseFloat(parts[1]);
  }
  return parseFloat(time) || 0;
}

export function getNextRace(races: any[], season: string): any | null {
  const now = new Date();
  // For completed races, find the last one; for upcoming, find the next
  // The calendar endpoint doesn't exist separately, so we use race results
  // If all races have results, there's no "next" race
  return null;
}

export function calculateCountdown(targetDate: Date): {
  days: number; hours: number; minutes: number; seconds: number;
} {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function getPositionSuffix(pos: number): string {
  if (pos >= 11 && pos <= 13) return `${pos}th`;
  switch (pos % 10) {
    case 1: return `${pos}st`;
    case 2: return `${pos}nd`;
    case 3: return `${pos}rd`;
    default: return `${pos}th`;
  }
}

export function getPositionChange(grid: number | string, finish: number | string): number {
  const g = typeof grid === 'string' ? parseInt(grid) : grid;
  const f = typeof finish === 'string' ? parseInt(finish) : finish;
  if (isNaN(g) || isNaN(f)) return 0;
  return g - f; // positive = gained positions
}

export function getDriverShortName(givenName: string, familyName: string): string {
  return `${givenName.charAt(0)}. ${familyName}`;
}
