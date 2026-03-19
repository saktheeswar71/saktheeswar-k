export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type ActionId =
  | 'remove_duplicates'
  | 'fill_missing'
  | 'standardize_formats'
  | 'remove_outliers';

export type IssueType = 'duplicate' | 'missing' | 'format' | 'outlier';

export interface CellIssue {
  type: IssueType;
  tooltip: string;
}

export interface DataRow {
  id: number;
  [key: string]: any;
  _issues?: { [column: string]: CellIssue };
}

export interface Dataset {
  id: number;
  name: string;
  emoji: string;
  difficulty: Difficulty;
  description: string;
  rows: DataRow[];
  columns: string[];
  correctActions: ActionId[];
  explanations: { [action: string]: string };
  funFact: string;
}

export const DATASETS: Dataset[] = [
  {
    id: 1,
    name: "Customer Orders",
    emoji: "🛒",
    difficulty: "Easy",
    description: "An e-commerce dataset with common real-world issues.",
    columns: ["id", "name", "city", "age", "purchase"],
    rows: [
      { id: 1, name: "Alice", city: "New York", age: 28, purchase: 120.00 },
      {
        id: 2, name: "Bob", city: "NY", age: null, purchase: 85.50,
        _issues: {
          city: { type: "format", tooltip: "'NY' should be 'New York'" },
          age: { type: "missing", tooltip: "Age is missing" },
        },
      },
      {
        id: 3, name: "Alice", city: "New York", age: 28, purchase: 120.00,
        _issues: { id: { type: "duplicate", tooltip: "Exact duplicate of Row 1" } },
      },
      {
        id: 4, name: "charlie", city: "new york", age: 25, purchase: 9999,
        _issues: {
          name: { type: "format", tooltip: "Name should be capitalized" },
          city: { type: "format", tooltip: "'new york' should be 'New York'" },
          purchase: { type: "outlier", tooltip: "$9,999 is unusually high" },
        },
      },
      { id: 5, name: "Diana", city: "Los Angeles", age: 31, purchase: 200.00 },
      {
        id: 6, name: "Eve", city: "LA", age: null, purchase: 55.00,
        _issues: {
          city: { type: "format", tooltip: "'LA' should be 'Los Angeles'" },
          age: { type: "missing", tooltip: "Age is missing" },
        },
      },
      { id: 7, name: "Frank", city: "Chicago", age: 22, purchase: 300.00 },
      {
        id: 8, name: "Grace", city: "chicago", age: 35, purchase: null,
        _issues: {
          city: { type: "format", tooltip: "'chicago' should be 'Chicago'" },
          purchase: { type: "missing", tooltip: "Purchase amount missing" },
        },
      },
    ],
    correctActions: ["remove_duplicates", "fill_missing", "standardize_formats", "remove_outliers"],
    explanations: {
      remove_duplicates:
        "Row 3 was an exact copy of Row 1 — same name, city, age, and purchase. Keeping duplicates inflates counts and skews analysis.",
      fill_missing:
        "Rows 2, 6 had no age; Row 8 had no purchase amount. We filled numeric nulls with the column average — a standard imputation technique.",
      standardize_formats:
        "City names had 4 variants: 'NY', 'new york', 'LA', 'chicago'. Inconsistent formats break GROUP BY queries and produce wrong aggregations.",
      remove_outliers:
        "Row 4 had a $9,999 purchase while others ranged $55–$300. This outlier would skew the average by 300%+ and mislead business decisions.",
    },
    funFact: "In real datasets, up to 80% of analyst time is spent on data cleaning before any analysis begins.",
  },
  {
    id: 2,
    name: "Employee Records",
    emoji: "👥",
    difficulty: "Medium",
    description: "HR data with date format chaos and a suspicious salary.",
    columns: ["id", "name", "dept", "salary", "joined"],
    rows: [
      { id: 1, name: "John Smith", dept: "Engineering", salary: 85000, joined: "2021-03-15" },
      {
        id: 2, name: "Jane Doe", dept: "engineering", salary: null, joined: "2020/06/22",
        _issues: {
          dept: { type: "format", tooltip: "'engineering' should be 'Engineering'" },
          salary: { type: "missing", tooltip: "Salary is missing" },
          joined: { type: "format", tooltip: "Date format should be YYYY-MM-DD" },
        },
      },
      {
        id: 3, name: "John Smith", dept: "Engineering", salary: 85000, joined: "2021-03-15",
        _issues: { id: { type: "duplicate", tooltip: "Exact duplicate of Row 1" } },
      },
      {
        id: 4, name: "Bob Johnson", dept: "HR", salary: -5000, joined: "2019-11-01",
        _issues: { salary: { type: "outlier", tooltip: "Negative salary is invalid" } },
      },
      { id: 5, name: "Alice Brown", dept: "Marketing", salary: 72000, joined: "2022-01-10" },
      {
        id: 6, name: "Carol White", dept: "mktg", salary: 68000, joined: "2021-08-30",
        _issues: { dept: { type: "format", tooltip: "'mktg' should be 'Marketing'" } },
      },
      {
        id: 7, name: "Dave Miller", dept: "HR", salary: 71000, joined: "23-05-2020",
        _issues: { joined: { type: "format", tooltip: "Date format is DD-MM-YYYY, should be YYYY-MM-DD" } },
      },
      {
        id: 8, name: "Eve Davis", dept: "Engineering", salary: null, joined: "2020-09-14",
        _issues: { salary: { type: "missing", tooltip: "Salary is missing" } },
      },
    ],
    correctActions: ["remove_duplicates", "fill_missing", "standardize_formats", "remove_outliers"],
    explanations: {
      remove_duplicates:
        "Row 3 duplicated John Smith completely. Duplicate employee records cause double-counting in payroll calculations.",
      fill_missing:
        "Jane and Eve had no salary recorded. Nulls in salary columns make SUM() and AVG() queries return NULL for the whole column in many SQL engines.",
      standardize_formats:
        "Three issues: dept names ('engineering', 'mktg'), date formats ('2020/06/22' and '23-05-2020'). Mixed formats crash date parsing functions.",
      remove_outliers:
        "Bob's -$5,000 salary is logically impossible. Negative values in salary fields indicate data entry errors that corrupt payroll reports.",
    },
    funFact: "Date format inconsistencies are the #1 cause of data pipeline failures in production systems.",
  },
  {
    id: 3,
    name: "Product Reviews",
    emoji: "⭐",
    difficulty: "Hard",
    description: "Review data with subtle format issues across multiple columns.",
    columns: ["id", "product", "rating", "reviewer", "date", "verified"],
    rows: [
      { id: 1, product: "Laptop Pro", rating: 4.5, reviewer: "user123", date: "2024-01-15", verified: "Yes" },
      {
        id: 2, product: "laptop pro", rating: 4.5, reviewer: "user123", date: "2024-01-15", verified: "Yes",
        _issues: {
          product: { type: "duplicate", tooltip: "Duplicate of Row 1 (different casing)" },
          id: { type: "duplicate", tooltip: "Same reviewer, same date, same rating" },
        },
      },
      {
        id: 3, product: "Wireless Mouse", rating: null, reviewer: "user456", date: "2024-02-20", verified: "No",
        _issues: { rating: { type: "missing", tooltip: "Rating value is missing" } },
      },
      {
        id: 4, product: "Keyboard", rating: 10, reviewer: "user789", date: "2024-02-18", verified: "yes",
        _issues: {
          rating: { type: "outlier", tooltip: "Rating of 10 exceeds max scale of 5" },
          verified: { type: "format", tooltip: "'yes' should be 'Yes'" },
        },
      },
      {
        id: 5, product: "Monitor", rating: 3.8, reviewer: "user321", date: "Jan 5 2024", verified: "YES",
        _issues: {
          date: { type: "format", tooltip: "'Jan 5 2024' should be '2024-01-05'" },
          verified: { type: "format", tooltip: "'YES' should be 'Yes'" },
        },
      },
      {
        id: 6, product: "Headphones", rating: 4.2, reviewer: "user654", date: "2024-03-01", verified: "N",
        _issues: { verified: { type: "format", tooltip: "'N' should be 'No'" } },
      },
      {
        id: 7, product: "Webcam", rating: null, reviewer: "user987", date: "2024-03-10", verified: "Yes",
        _issues: { rating: { type: "missing", tooltip: "Rating value is missing" } },
      },
      {
        id: 8, product: "USB Hub", rating: 2.1, reviewer: "user111", date: "2024-03-22", verified: "no",
        _issues: { verified: { type: "format", tooltip: "'no' should be 'No'" } },
      },
    ],
    correctActions: ["remove_duplicates", "fill_missing", "standardize_formats", "remove_outliers"],
    explanations: {
      remove_duplicates:
        "Row 2 is a near-duplicate of Row 1 — same reviewer, date, and rating, only product name casing differs. Soft duplicates are trickier to catch than exact ones.",
      fill_missing:
        "Rows 3 and 7 have no rating. Missing ratings in a review dataset mean those products are excluded from avg_rating calculations entirely.",
      standardize_formats:
        "Four variants in 'verified': 'yes', 'YES', 'N', 'no'. Two date formats: ISO and 'Jan 5 2024'. Inconsistent booleans break filter queries.",
      remove_outliers:
        "A rating of 10 on a 1–5 scale is impossible — it's 2× the maximum. Outliers like this corrupt product ranking algorithms.",
    },
    funFact: "Inconsistent boolean encoding (Yes/YES/Y/1/true) is one of the most common issues in survey and form data.",
  },
];
