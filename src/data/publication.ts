export interface PublicationDetail {
  slug: string;
  title: string;
  authors: string;
  conference: string;
  date: string;
  tags: string[];
  badge: string;
  abstract: string;
  problem: string;
  dataset: { property: string; detail: string }[];
  methodology: { icon: string; title: string; description: string }[];
  results: {
    metrics: { icon: string; value: string; label: string }[];
    comparisonHeaders: string[];
    comparisonRows: { metric: string; values: string[] }[];
  };
  visualizations: string[];
  findings: string[];
  futureResearch: { icon: string; text: string }[];
  citation: string;
}

export const publication: PublicationDetail = {
  slug: "liver-disease-tabnet",
  title: "Liver Disease Prediction using Deep Learning: TabNet vs XGBoost",
  authors: "Saktheeswar K, Venkatesan S",
  conference: "ICASET-2025",
  date: "March 2025",
  tags: ["TabNet", "XGBoost", "Healthcare AI", "Deep Learning", "ILPD Dataset"],
  badge: "🏆 Conference Paper — ICASET 2025",
  abstract:
    "Early detection of liver disease is critical for effective treatment. This study applied TabNet — a deep learning model with built-in feature selection — on the Indian Liver Patient Dataset (ILPD, 583 records) and compared it against the widely used XGBoost classifier. TabNet achieved 5–8% higher accuracy while also providing better interpretability through its attention mechanism, making it a more suitable model for healthcare analytics where explainability matters.",
  problem:
    "Liver disease affects millions globally. Early-stage prediction using patient data (blood tests, demographics) can save lives. However, most ML models used in healthcare are black boxes — they predict but don't explain WHY. This research addresses that gap by using TabNet, which shows exactly which features influenced each prediction.",
  dataset: [
    { property: "Dataset", detail: "ILPD (Indian Liver Patient Dataset)" },
    { property: "Records", detail: "583 patient records" },
    { property: "Features", detail: "Age, Gender, Bilirubin, Albumin, Enzymes, etc." },
    { property: "Target", detail: "Liver disease: Yes / No (binary classification)" },
    { property: "Split", detail: "Train / Validation / Test" },
    { property: "Source", detail: "UCI Machine Learning Repository" },
  ],
  methodology: [
    {
      icon: "🧹",
      title: "Data Preprocessing",
      description:
        "Handled missing values, encoded categorical variables (Gender), normalized numerical features, and split data into train/validation/test sets.",
    },
    {
      icon: "🌲",
      title: "XGBoost Baseline",
      description:
        "Trained XGBoost as the baseline classifier. Tuned hyperparameters using GridSearchCV. Evaluated using accuracy, precision, recall, and AUC-ROC.",
    },
    {
      icon: "🧠",
      title: "TabNet Model",
      description:
        "Implemented TabNet using the pytorch-tabnet library. TabNet uses sequential attention to select relevant features at each decision step — making it both powerful and interpretable. Trained with early stopping and learning rate scheduling.",
    },
    {
      icon: "⚖️",
      title: "Model Comparison",
      description:
        "Compared both models on the same test set using identical evaluation metrics. Analyzed feature importance from both models and TabNet's attention masks.",
    },
  ],
  results: {
    metrics: [
      { icon: "🎯", value: "5–8%", label: "Higher Accuracy than XGBoost" },
      { icon: "🔍", value: "Better", label: "Interpretability via Attention" },
      { icon: "📋", value: "583", label: "Patient Records Used" },
      { icon: "🏥", value: "Healthcare AI", label: "Application Domain" },
    ],
    comparisonHeaders: ["XGBoost", "TabNet"],
    comparisonRows: [
      { metric: "Accuracy", values: ["—", "—"] },
      { metric: "Precision", values: ["—", "—"] },
      { metric: "Recall", values: ["—", "—"] },
      { metric: "F1-Score", values: ["—", "—"] },
      { metric: "AUC-ROC", values: ["—", "—"] },
    ],
  },
  visualizations: [
    "Feature Importance — XGBoost",
    "TabNet Attention Mask Visualization",
    "ROC Curve Comparison",
    "Confusion Matrix — TabNet",
    "Confusion Matrix — XGBoost",
  ],
  findings: [
    "TabNet outperforms XGBoost by 5–8% accuracy",
    "TabNet's attention mechanism provides clinical interpretability",
    "Feature attention reveals Bilirubin and Albumin as top predictors",
    "TabNet is viable for real-world healthcare decision support",
  ],
  futureResearch: [
    { icon: "🔬", text: "Test on larger, multi-hospital datasets" },
    { icon: "🌐", text: "Deploy as a clinical decision support web tool" },
    { icon: "🧬", text: "Integrate with electronic health records (EHR) systems" },
    { icon: "📊", text: "Explore ensemble: TabNet + XGBoost hybrid" },
  ],
  citation:
    'Saktheeswar K, Venkatesan S. "Liver Disease Prediction using Deep Learning: TabNet vs XGBoost." Presented at ICASET-2025, March 2025.',
};
