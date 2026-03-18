import { useState, useEffect, useCallback } from 'react';

const JOLPICA = 'https://api.jolpi.ca/ergast/f1';

export function useJolpicaData(season = '2025') {
  const [standings, setStandings] = useState<any[]>([]);
  const [constructors, setConstructors] = useState<any[]>([]);
  const [races, setRaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [driverRes, constRes, raceRes] = await Promise.all([
        fetch(`${JOLPICA}/${season}/driverstandings.json`),
        fetch(`${JOLPICA}/${season}/constructorstandings.json`),
        fetch(`${JOLPICA}/${season}/results.json?limit=500`),
      ]);

      if (!driverRes.ok || !constRes.ok || !raceRes.ok) {
        throw new Error('API request failed');
      }

      const [driverData, constData, raceData] = await Promise.all([
        driverRes.json(), constRes.json(), raceRes.json()
      ]);

      const driverStandings = driverData.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
      const constructorStandings = constData.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? [];
      const raceResults = raceData.MRData?.RaceTable?.Races ?? [];

      // If 2025 data is empty, try 2024 fallback
      if (driverStandings.length === 0 && season === '2025') {
        const [fb1, fb2, fb3] = await Promise.all([
          fetch(`${JOLPICA}/2024/driverstandings.json`).then(r => r.json()),
          fetch(`${JOLPICA}/2024/constructorstandings.json`).then(r => r.json()),
          fetch(`${JOLPICA}/2024/results.json?limit=500`).then(r => r.json()),
        ]);
        setStandings(fb1.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? []);
        setConstructors(fb2.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? []);
        setRaces(fb3.MRData?.RaceTable?.Races ?? []);
      } else {
        setStandings(driverStandings);
        setConstructors(constructorStandings);
        setRaces(raceResults);
      }
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message || 'Failed to fetch F1 data');
    } finally {
      setLoading(false);
    }
  }, [season]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const fetchRaceDetail = useCallback(async (round: string) => {
    const s = season;
    const [lapsRes, pitRes, qualRes] = await Promise.all([
      fetch(`${JOLPICA}/${s}/${round}/laps.json?limit=2000`),
      fetch(`${JOLPICA}/${s}/${round}/pitstops.json?limit=200`),
      fetch(`${JOLPICA}/${s}/${round}/qualifying.json`),
    ]);
    const [laps, pits, qual] = await Promise.all([
      lapsRes.json(), pitRes.json(), qualRes.json()
    ]);
    return {
      laps: laps.MRData?.RaceTable?.Races?.[0]?.Laps ?? [],
      pits: pits.MRData?.RaceTable?.Races?.[0]?.PitStops ?? [],
      qualifying: qual.MRData?.RaceTable?.Races?.[0]?.QualifyingResults ?? [],
    };
  }, [season]);

  return { standings, constructors, races, loading, error, lastUpdated, refetch: fetchAll, fetchRaceDetail };
}
