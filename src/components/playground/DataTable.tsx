import { useState } from "react";
import { motion } from "framer-motion";
import { Dataset, DataRow } from "@/data/datasets";

interface Props {
  dataset: Dataset;
}

const issueBg: Record<string, string> = {
  missing: "#FDE8D3",
  duplicate: "rgba(243,195,178,0.5)",
  format: "#DAEBE3",
  outlier: "#CFD6C4",
};

const issueIcons: Record<string, string> = {
  missing: "❓",
  duplicate: "🔁",
  format: "🔤",
  outlier: "⚠️",
};

const issueLabels: Record<string, string> = {
  missing: "Missing Value",
  duplicate: "Duplicate",
  format: "Format Issue",
  outlier: "Outlier",
};

const DataTable = ({ dataset }: Props) => {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const getCellIssue = (row: DataRow, col: string) => row._issues?.[col];

  return (
    <div>
      <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid #CFD6C4" }}>
        <table className="w-full text-sm" style={{ minWidth: 500 }}>
          <thead>
            <tr style={{ background: "#DAEBE3" }}>
              {dataset.columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                  style={{ color: "#657166" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataset.rows.map((row, ri) => {
              const isDuplicateRow = row._issues && Object.values(row._issues).some(iss => iss.type === 'duplicate');
              return (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: ri * 0.04, duration: 0.25 }}
                  style={{
                    background: ri % 2 === 0 ? "#FFFFFF" : "#FAFAF8",
                    borderBottom: "1px solid #CFD6C4",
                  }}
                >
                  {dataset.columns.map((col) => {
                    const issue = getCellIssue(row, col);
                    const cellKey = `${row.id}-${col}`;
                    const value = row[col];

                    return (
                      <td
                        key={col}
                        className="px-4 py-3 relative"
                        style={{
                          background: issue ? issueBg[issue.type] : undefined,
                          color: "#4a5568",
                        }}
                        onMouseEnter={() => issue && setHoveredCell(cellKey)}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        {value === null ? (
                          <span
                            className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                            style={{ background: "#CFD6C4", color: "#657166" }}
                          >
                            NULL
                          </span>
                        ) : (
                          <span>{String(value)}</span>
                        )}
                        {issue && col === dataset.columns[0] && isDuplicateRow && issue.type === 'duplicate' && (
                          <span
                            className="ml-1 inline-block px-1.5 py-0.5 rounded text-[10px] font-bold"
                            style={{ background: "#F3C3B2", color: "#657166" }}
                          >
                            DUPE
                          </span>
                        )}

                        {/* Tooltip */}
                        {hoveredCell === cellKey && issue && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute z-20 left-0 bottom-full mb-2 w-56 p-3 rounded-xl text-xs"
                            style={{
                              background: "#FFFFFF",
                              border: `1px solid ${issueBg[issue.type]}`,
                              boxShadow: "0 4px 16px rgba(101,113,102,0.12)",
                              color: "#657166",
                            }}
                          >
                            <span className="font-bold">
                              {issueIcons[issue.type]} {issueLabels[issue.type]}:
                            </span>{" "}
                            {issue.tooltip}
                          </motion.div>
                        )}
                      </td>
                    );
                  })}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4">
        {Object.entries(issueLabels).map(([type, label]) => (
          <div key={type} className="flex items-center gap-1.5 text-xs" style={{ color: "#8a9e8f" }}>
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ background: issueBg[type] }}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
