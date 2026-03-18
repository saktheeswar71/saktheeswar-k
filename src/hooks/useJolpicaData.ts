import { useState, useEffect, useCallback } from 'react';

const JOLPICA = 'https://api.jolpi.ca/ergast/f1';

export function useJolpicaData(season = '2026') {
  const [standings, setStandings] = useState<any[]>([]);
  const [constructors, setConstructors] = useState<any[]>([]);
  const [races, setRaces] = useState<any[]>([]);
  const [calendar, setCalendar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [driverRes, constRes, raceRes, calRes] = await Promise.all([
        fetch(`${JOLPICA}/${season}/driverstandings.json`),
        fetch(`${JOLPICA}/${season}/constructorstandings.json`),
        fetch(`${JOLPICA}/${season}/results.json?limit=500`),
        fetch(`${JOLPICA}/${season}.json`),
      ]);

      if (!driverRes.ok || !constRes.ok || !raceRes.ok) {
        throw new Error('API request failed');
      }

      const [driverData, constData, raceData, calData] = await Promise.all([
        driverRes.json(), constRes.json(), raceRes.json(), calRes.ok ? calRes.json() : { MRData: { RaceTable: { Races: [] } } },
      ]);

      const driverStandings = driverData.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
      const constructorStandings = constData.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? [];
      const raceResults = raceData.MRData?.RaceTable?.Races ?? [];
      const calendarRaces = calData.MRData?.RaceTable?.Races ?? [];

      // If current season data is empty, try previous year fallback
      if (driverStandings.length === 0) {
        const fallbackSeason = String(parseInt(season) - 1);
        const [fb1, fb2, fb3] = await Promise.all([
          fetch(`${JOLPICA}/${fallbackSeason}/driverstandings.json`).then(r => r.json()),
          fetch(`${JOLPICA}/${fallbackSeason}/constructorstandings.json`).then(r => r.json()),
          fetch(`${JOLPICA}/${fallbackSeason}/results.json?limit=500`).then(r => r.json()),
        ]);
        setStandings(fb1.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? []);
        setConstructors(fb2.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? []);
        setRaces(fb3.MRData?.RaceTable?.Races ?? []);
      } else {
        setStandings(driverStandings);
        setConstructors(constructorStandings);
        setRaces(raceResults);
      }
      setCalendar(calendarRaces);
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

  return { standings, constructors, races, calendar, loading, error, lastUpdated, refetch: fetchAll, fetchRaceDetail };
}
