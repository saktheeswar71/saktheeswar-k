import { motion, AnimatePresence } from "framer-motion";
import { useGameState } from "@/hooks/useGameState";
import ProgressBar from "./ProgressBar";
import DataTable from "./DataTable";
import HintPanel from "./HintPanel";
import ActionPanel from "./ActionPanel";
import ResultView from "./ResultView";
import ExplanationView from "./ExplanationView";

interface Props {
  gameHook: ReturnType<typeof useGameState>;
}

const GameContainer = ({ gameHook }: Props) => {
  const {
    state,
    currentDataset,
    goToAct,
    goBackToInspect,
    toggleAction,
    submitActions,
    showExplanation,
    nextDataset,
    useHint,
    restart,
    playAgain,
  } = gameHook;

  if (state.step === "intro") return null;

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-[1200px]">
        <ProgressBar currentStep={state.step} />

        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "#FFFFFF",
            border: "1px solid #CFD6C4",
            boxShadow: "0 2px 16px rgba(101,113,102,0.08)",
          }}
        >
          <AnimatePresence mode="wait">
            {state.step === "inspect" && (
              <motion.div
                key="inspect"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-1" style={{ color: "#657166" }}>
                  Step 1: Inspect the Data
                </h2>
                <p className="text-sm mb-5" style={{ color: "#8a9e8f" }}>
                  Study this dataset carefully. Can you spot what's wrong?
                </p>
                <DataTable dataset={currentDataset} />
                <HintPanel
                  visible={state.hintsVisible}
                  onUseHint={useHint}
                  hintsUsed={state.hintsUsed}
                  datasetId={currentDataset.id}
                />
                <div className="mt-6">
                  <button
                    onClick={goToAct}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:shadow-md"
                    style={{ background: "#99CDD8" }}
                  >
                    I've spotted the issues → Choose Actions
                  </button>
                </div>
              </motion.div>
            )}

            {state.step === "act" && (
              <motion.div
                key="act"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ActionPanel
                  selectedActions={state.selectedActions}
                  onToggle={toggleAction}
                  onSubmit={submitActions}
                  onBack={goBackToInspect}
                />
              </motion.div>
            )}

            {state.step === "result" && state.scoreResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ResultView
                  result={state.scoreResult}
                  dataset={currentDataset}
                  cleanedRows={state.cleanedRows || []}
                  streak={state.streak}
                  onExplain={showExplanation}
                  onNext={nextDataset}
                />
              </motion.div>
            )}

            {state.step === "explain" && (
              <motion.div
                key="explain"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ExplanationView
                  dataset={currentDataset}
                  onPlayAgain={playAgain}
                  onNext={nextDataset}
                  onRestart={restart}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GameContainer;
