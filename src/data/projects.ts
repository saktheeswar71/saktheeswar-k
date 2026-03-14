export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  tags: string[];
  github: string;
  heroGradient: string;
  stats: { icon: string; value: string; label: string }[];
  overview: string;
  problem: string;
  dataset: { property: string; detail: string }[];
  datasetNote: string;
  methodology: { icon: string; title: string; description: string }[];
  architectureCards: { title: string; details: string[] }[];
  results: {
    metrics: { icon: string; value: string; label: string }[];
    comparisonHeaders: string[];
    comparisonRows: { metric: string; values: string[] }[];
    note?: string;
  };
  visualizations: string[];
  learnings: { icon: string; title: string; description: string }[];
  codeSnippet: string;
  futureWork: { icon: string; text: string }[];
  relatedSlugs: string[];
}

export const projects: ProjectDetail[] = [
  {
    slug: "netflix-forecasting",
    title: "Netflix Subscriptions Forecasting",
    subtitle: "Predicting the future of streaming, one time-series at a time.",
    date: "Feb 2024",
    tags: ["Python", "ARIMA", "LSTM", "Time-Series", "Forecasting"],
    github: "https://github.com/saktheeswar71",
    heroGradient: "linear-gradient(135deg, hsl(28 93% 91%) 0%, hsl(193 46% 72%) 100%)",
    stats: [
      { icon: "📊", value: "40 Records", label: "Dataset Size" },
      { icon: "🎯", value: "10–15%", label: "Accuracy Improvement" },
      { icon: "⚙️", value: "40%", label: "Manual Effort Reduced" },
    ],
    overview:
      "This project involved analyzing Netflix subscription data to forecast future subscriber growth using classical and deep learning time-series models. The goal was to build a reliable, reusable forecasting pipeline that could be applied to real business decisions.",
    problem:
      "Netflix subscription data grows continuously, but predicting future subscriber trends accurately is challenging due to seasonality, noise, and non-linear patterns. Manual forecasting methods were slow, error-prone, and didn't scale. We needed an automated, accurate, and reproducible solution.",
    dataset: [
      { property: "Source", detail: "Netflix Subscription Dataset" },
      { property: "Records", detail: "40 data points" },
      { property: "Features", detail: "Date, Subscribers, Region, Plan Type" },
      { property: "Time Period", detail: "Multi-year subscription data" },
      { property: "Issues Found", detail: "Missing values, unscaled features" },
      { property: "Preprocessing", detail: "Null handling, feature scaling, date parsing" },
    ],
    datasetNote:
      "Data quality was improved by approximately 20% after preprocessing, fixing missing values, and scaling features — making the dataset ready for both ARIMA and LSTM model ingestion.",
    methodology: [
      {
        icon: "🧹",
        title: "Data Preprocessing",
        description:
          "Loaded raw subscription data, identified and filled missing values, parsed date columns, normalized features using MinMaxScaler. Result: ~20% improvement in data quality and model readiness.",
      },
      {
        icon: "🔍",
        title: "Exploratory Data Analysis",
        description:
          "Visualized subscription trends over time using Matplotlib and Seaborn. Identified seasonality patterns, growth plateaus, and anomalies. Used rolling averages and decomposition plots.",
      },
      {
        icon: "📐",
        title: "ARIMA Modelling",
        description:
          "Applied ARIMA (AutoRegressive Integrated Moving Average) for classical time-series forecasting. Tuned p, d, q parameters using AIC/BIC scores and ACF/PACF plots. Achieved stable short-term forecasting with interpretable outputs.",
      },
      {
        icon: "🧠",
        title: "LSTM Modelling",
        description:
          "Built a sequential LSTM neural network using Python to capture long-term dependencies in subscription data. Used a sliding window approach for input sequences, trained over multiple epochs with early stopping to prevent overfitting.",
      },
      {
        icon: "🔁",
        title: "Pipeline Design",
        description:
          "Designed a reusable, end-to-end ML pipeline that automates data ingestion → preprocessing → model training → forecasting → output visualization. Reduced manual steps by 30–40%.",
      },
      {
        icon: "📊",
        title: "Evaluation & Visualization",
        description:
          "Compared ARIMA vs LSTM outputs using MAE, RMSE, and MAPE metrics. Plotted actual vs predicted curves side by side for visual validation.",
      },
    ],
    architectureCards: [
      {
        title: "ARIMA",
        details: [
          "ARIMA(p,d,q)",
          "→ Stationarity check (ADF Test)",
          "→ ACF / PACF analysis",
          "→ Parameter tuning (Grid Search)",
          "→ Forecasting + Confidence Intervals",
        ],
      },
      {
        title: "LSTM",
        details: [
          "Input Layer (sliding window sequences)",
          "→ LSTM Layer 1 (64 units, return_sequences=True)",
          "→ Dropout (0.2)",
          "→ LSTM Layer 2 (32 units)",
          "→ Dropout (0.2)",
          "→ Dense Output Layer (1 unit)",
          "→ Optimizer: Adam | Loss: MSE",
        ],
      },
    ],
    results: {
      metrics: [
        { icon: "📈", value: "10–15%", label: "Forecast Accuracy Improvement" },
        { icon: "📉", value: "18%", label: "Improvement in Reliability" },
        { icon: "🗂️", value: "1M+", label: "Records Processed" },
        { icon: "⚡", value: "40%", label: "Reduction in Manual Effort" },
      ],
      comparisonHeaders: ["ARIMA", "LSTM"],
      comparisonRows: [
        { metric: "MAE", values: ["—", "—"] },
        { metric: "RMSE", values: ["—", "—"] },
        { metric: "MAPE", values: ["—", "—"] },
        { metric: "Training Time", values: ["Fast", "Moderate"] },
        { metric: "Interpretability", values: ["High", "Medium"] },
        { metric: "Best For", values: ["Short-term", "Long-term"] },
      ],
      note: "* Exact metric values to be filled in by Saktheeswar. Placeholders shown above.",
    },
    visualizations: [
      "Actual vs Predicted — ARIMA",
      "Actual vs Predicted — LSTM",
      "Subscription Trend Over Time",
      "Rolling Average Plot",
      "ACF / PACF Plot",
    ],
    learnings: [
      {
        icon: "🧠",
        title: "ARIMA vs LSTM tradeoffs",
        description:
          "Classical models are faster and more interpretable for short-term forecasting. LSTM shines when patterns are complex and non-linear.",
      },
      {
        icon: "🔁",
        title: "Pipeline thinking saves time",
        description:
          "Building a reusable pipeline from day one cut iteration time significantly — future datasets can plug in with minimal changes.",
      },
      {
        icon: "📉",
        title: "Data quality is everything",
        description:
          "Garbage in, garbage out. 20% of the project time was just cleaning data — and it made a massive difference in model performance.",
      },
    ],
    codeSnippet: `from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

model = Sequential([
    LSTM(64, return_sequences=True, 
         input_shape=(window_size, n_features)),
    Dropout(0.2),
    LSTM(32),
    Dropout(0.2),
    Dense(1)
])

model.compile(optimizer='adam', loss='mse')
model.fit(X_train, y_train, 
          epochs=100, batch_size=16,
          validation_split=0.2,
          callbacks=[early_stopping])`,
    futureWork: [
      { icon: "🔮", text: "Add more years of data for better long-term patterns" },
      { icon: "📡", text: "Integrate real-time API data feeds for live forecasting" },
      { icon: "🤖", text: "Test Prophet and Transformer-based models" },
      { icon: "📊", text: "Build a live Power BI / Streamlit dashboard" },
    ],
    relatedSlugs: ["wildlife-classification"],
  },
  {
    slug: "wildlife-classification",
    title: "Wildlife Animal Classification from Trap Images",
    subtitle: "Teaching machines to spot animals better than I can at 2am.",
    date: "Mar 2024",
    tags: ["Python", "YOLOv7", "YOLOv8", "YOLOv9", "Computer Vision", "Deep Learning"],
    github: "https://github.com/saktheeswar71",
    heroGradient: "linear-gradient(135deg, hsl(150 30% 90%) 0%, hsl(100 12% 81%) 100%)",
    stats: [
      { icon: "📸", value: "2096 Images", label: "Training Dataset" },
      { icon: "🎯", value: "88%", label: "Training Accuracy" },
      { icon: "🔁", value: "150 Epochs", label: "Training Duration" },
    ],
    overview:
      "Built a wildlife animal classification system using camera-trap images to support ecological research and wildlife monitoring. Implemented and compared three generations of YOLO object detection models to identify the best-performing approach.",
    problem:
      "Manual identification of wildlife from thousands of camera trap images is time-consuming, inconsistent, and not scalable. Researchers need an automated system that can accurately classify animals from low-quality, varied-lighting trap images in real time.",
    dataset: [
      { property: "Total Images", detail: "2096 training images" },
      { property: "Classes", detail: "Multiple wildlife animal species" },
      { property: "Image Quality", detail: "Camera-trap (varied lighting, angles)" },
      { property: "Preprocessing", detail: "Resizing, normalization, augmentation" },
      { property: "Augmentation", detail: "Flip, rotate, brightness shift, crop" },
      { property: "Quality Boost", detail: "~25% improvement after augmentation" },
    ],
    datasetNote:
      "Data augmentation techniques significantly boosted the effective dataset size and model robustness, especially for underrepresented species classes.",
    methodology: [
      {
        icon: "🖼️",
        title: "Data Collection & Preprocessing",
        description:
          "Collected camera-trap images, resized to uniform dimensions, normalized pixel values, and applied data augmentation techniques (flipping, rotation, brightness variation) to boost dataset diversity and model robustness by 25%.",
      },
      {
        icon: "🔍",
        title: "Exploratory Data Analysis",
        description:
          "Analyzed class distribution across animal species, identified imbalanced classes, visualized sample images per category, and reviewed annotation quality before training.",
      },
      {
        icon: "🤖",
        title: "YOLOv7 Implementation",
        description:
          "Trained YOLOv7 on the dataset as the baseline model. Configured anchor boxes, tuned hyperparameters, and evaluated detection precision on the validation set.",
      },
      {
        icon: "🚀",
        title: "YOLOv8 Implementation",
        description:
          "Upgraded to YOLOv8 — Ultralytics' latest architecture — for improved speed and accuracy. Fine-tuned on the same dataset and compared performance metrics against v7.",
      },
      {
        icon: "⚡",
        title: "YOLOv9 Implementation",
        description:
          "Tested YOLOv9 for cutting-edge detection performance. Evaluated improvements in small-object detection and misclassification reduction.",
      },
      {
        icon: "📊",
        title: "Model Comparison & Selection",
        description:
          "Compared all three models side by side using mAP, precision, recall, and F1-score. Selected the best-performing model for final deployment recommendation.",
      },
    ],
    architectureCards: [
      {
        title: "YOLOv7",
        details: [
          "E-ELAN backbone",
          "→ Compound model scaling",
          "→ Planned re-parameterized convolution",
          "→ Auxiliary head for training",
        ],
      },
      {
        title: "YOLOv8",
        details: [
          "CSPDarknet53 backbone",
          "→ Anchor-free detection head",
          "→ Mosaic augmentation",
          "→ Decoupled head design",
        ],
      },
      {
        title: "YOLOv9",
        details: [
          "Programmable Gradient Information (PGI)",
          "→ GELAN architecture",
          "→ Reversible functions",
          "→ Improved small-object detection",
        ],
      },
    ],
    results: {
      metrics: [
        { icon: "🎯", value: "88%", label: "Training Accuracy" },
        { icon: "📉", value: "10–15%", label: "Misclassification Reduction" },
        { icon: "💪", value: "25%", label: "Model Robustness Boost" },
        { icon: "🖼️", value: "2096", label: "Images Trained" },
      ],
      comparisonHeaders: ["YOLOv7", "YOLOv8", "YOLOv9"],
      comparisonRows: [
        { metric: "mAP@0.5", values: ["—", "—", "—"] },
        { metric: "Precision", values: ["—", "—", "—"] },
        { metric: "Recall", values: ["—", "—", "—"] },
        { metric: "F1-Score", values: ["—", "—", "—"] },
        { metric: "Inference Speed", values: ["—", "—", "—"] },
      ],
      note: "* Exact metric values to be filled in by Saktheeswar. Placeholders shown above.",
    },
    visualizations: [
      "Sample Predictions — YOLOv7",
      "Sample Predictions — YOLOv8",
      "Sample Predictions — YOLOv9",
      "Confusion Matrix",
      "Training Loss Curve",
      "mAP over Epochs",
    ],
    learnings: [
      {
        icon: "🧠",
        title: "YOLOv8 vs YOLOv9 differences in practice",
        description:
          "Each YOLO generation brings architecture improvements, but real-world gains depend heavily on dataset quality and augmentation strategy.",
      },
      {
        icon: "📸",
        title: "Data augmentation impact on small datasets",
        description:
          "With only ~2000 images, augmentation was the single most impactful technique for boosting model generalization and robustness.",
      },
      {
        icon: "⚖️",
        title: "Handling class imbalance in wildlife datasets",
        description:
          "Some species had far fewer samples. Oversampling and augmentation on minority classes helped reduce bias in predictions.",
      },
    ],
    codeSnippet: `from ultralytics import YOLO

# Load YOLOv8 model
model = YOLO('yolov8n.pt')

# Train on custom wildlife dataset
results = model.train(
    data='wildlife.yaml',
    epochs=150,
    imgsz=640,
    batch=16,
    name='wildlife_yolov8',
    patience=20,
    augment=True
)

# Evaluate
metrics = model.val()
print(f"mAP@0.5: {metrics.box.map50:.3f}")`,
    futureWork: [
      { icon: "🎥", text: "Real-time video stream classification" },
      { icon: "🌍", text: "Deploy as a web app for field researchers" },
      { icon: "📱", text: "Mobile-optimized model for on-site use" },
      { icon: "🔢", text: "Expand dataset to 10,000+ images" },
    ],
    relatedSlugs: ["netflix-forecasting"],
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
