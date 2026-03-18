import { useCallback } from 'react';

const OPENF1 = 'https://api.openf1.org/v1';

export function useOpenF1Data() {
  const fetchDrivers = useCallback((sessionKey = 'latest') =>
    fetch(`${OPENF1}/drivers?session_key=${sessionKey}`)
      .then(r => r.ok ? r.json() : [])
      .catch(() => []),
  []);

  const fetchLaps = useCallback((sessionKey: string, driverNumber?: number) => {
    const driverParam = driverNumber ? `&driver_number=${driverNumber}` : '';
    return fetch(`${OPENF1}/laps?session_key=${sessionKey}${driverParam}`)
      .then(r => r.ok ? r.json() : [])
      .catch(() => []);
  }, []);

  const fetchStints = useCallback((sessionKey: string) =>
    fetch(`${OPENF1}/stints?session_key=${sessionKey}`)
      .then(r => r.ok ? r.json() : [])
      .catch(() => []),
  []);

  const fetchPits = useCallback((sessionKey: string) =>
    fetch(`${OPENF1}/pit?session_key=${sessionKey}`)
      .then(r => r.ok ? r.json() : [])
      .catch(() => []),
  []);

  const fetchSessions = useCallback((year = 2025) =>
    fetch(`${OPENF1}/sessions?year=${year}`)
      .then(r => r.ok ? r.json() : [])
      .catch(() => []),
  []);

  const fetchPositions = useCallback((sessionKey: string, driverNumber?: number) => {
    const driverParam = driverNumber ? `&driver_number=${driverNumber}` : '';
    return fetch(`${OPENF1}/position?session_key=${sessionKey}${driverParam}`)
      .then(r => r.ok ? r.json() : [])
      .catch(() => []);
  }, []);

  return { fetchDrivers, fetchLaps, fetchStints, fetchPits, fetchSessions, fetchPositions };
}
