import { useState, useCallback } from 'react';
import { DATASETS } from '../data/datasets';
import { calculateScore, applyActions, ScoreResult } from '../utils/gameLogic';

export type Step = 'intro' | 'inspect' | 'act' | 'result' | 'explain';

interface GameState {
  step: Step;
  datasetIndex: number;
  selectedActions: string[];
  scoreResult: ScoreResult | null;
  streak: number;
  totalPlayed: number;
  hintsUsed: number;
  hintsVisible: boolean;
  timeStarted: number | null;
  cleanedRows: any[] | null;
}

export function useGameState() {
  const [state, setState] = useState<GameState>({
    step: 'intro',
    datasetIndex: 0,
    selectedActions: [],
    scoreResult: null,
    streak: 0,
    totalPlayed: 0,
    hintsUsed: 0,
    hintsVisible: false,
    timeStarted: null,
    cleanedRows: null,
  });

  const currentDataset = DATASETS[state.datasetIndex];

  const selectDataset = useCallback((index: number) => {
    setState(s => ({
      ...s,
      step: 'inspect',
      datasetIndex: index,
      selectedActions: [],
      scoreResult: null,
      cleanedRows: null,
      hintsUsed: 0,
      hintsVisible: false,
      timeStarted: Date.now(),
    }));
  }, []);

  const startGame = useCallback(() => {
    setState(s => ({
      ...s,
      step: 'inspect',
      timeStarted: Date.now(),
      selectedActions: [],
      hintsUsed: 0,
      hintsVisible: false,
    }));
  }, []);

  const goToAct = useCallback(() => {
    setState(s => ({ ...s, step: 'act' }));
  }, []);

  const goBackToInspect = useCallback(() => {
    setState(s => ({ ...s, step: 'inspect' }));
  }, []);

  const toggleAction = useCallback((action: string) => {
    setState(s => ({
      ...s,
      selectedActions: s.selectedActions.includes(action)
        ? s.selectedActions.filter(a => a !== action)
        : [...s.selectedActions, action],
    }));
  }, []);

  const submitActions = useCallback(() => {
    const timeMs = Date.now() - (state.timeStarted || Date.now());
    const scoreResult = calculateScore(
      state.selectedActions,
      currentDataset.correctActions,
      state.hintsUsed,
      timeMs
    );
    const cleanedRows = applyActions(
      currentDataset.rows,
      state.selectedActions
    );
    setState(s => ({
      ...s,
      step: 'result',
      scoreResult,
      cleanedRows,
    }));
  }, [state.timeStarted, state.selectedActions, state.hintsUsed, currentDataset]);

  const showExplanation = useCallback(() => {
    setState(s => ({ ...s, step: 'explain' }));
  }, []);

  const nextDataset = useCallback(() => {
    setState(s => ({
      ...s,
      step: 'inspect',
      datasetIndex: (s.datasetIndex + 1) % DATASETS.length,
      selectedActions: [],
      scoreResult: null,
      cleanedRows: null,
      hintsUsed: 0,
      hintsVisible: false,
      streak: s.scoreResult?.grade === 'S' ? s.streak + 1 : 0,
      totalPlayed: s.totalPlayed + 1,
      timeStarted: Date.now(),
    }));
  }, []);

  const useHint = useCallback(() => {
    setState(s => ({
      ...s,
      hintsVisible: true,
      hintsUsed: s.hintsUsed + 1,
    }));
  }, []);

  const restart = useCallback(() => {
    setState({
      step: 'intro',
      datasetIndex: 0,
      selectedActions: [],
      scoreResult: null,
      streak: 0,
      totalPlayed: 0,
      hintsUsed: 0,
      hintsVisible: false,
      timeStarted: null,
      cleanedRows: null,
    });
  }, []);

  const playAgain = useCallback(() => {
    setState(s => ({
      ...s,
      step: 'inspect',
      selectedActions: [],
      scoreResult: null,
      cleanedRows: null,
      hintsUsed: 0,
      hintsVisible: false,
      timeStarted: Date.now(),
    }));
  }, []);

  return {
    state,
    currentDataset,
    selectDataset,
    startGame,
    goToAct,
    goBackToInspect,
    toggleAction,
    submitActions,
    showExplanation,
    nextDataset,
    useHint,
    restart,
    playAgain,
  };
}
