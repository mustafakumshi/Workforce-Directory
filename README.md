# Workforce Directory

Small React dashboard built for a technical assessment: a **client-side** employee table backed by AG Grid, with light/dark theme and a short KPI strip above the grid.

## What it does

- Renders the provided **20-row employee sample** from `src/data/employees.ts` (typed with `Employee` in `src/types/employee.ts`).
- Uses **AG Grid Community** in React with sorting, resizing, column filters, floating filters, and pagination (handy when the same grid pattern is pointed at a much larger row set).
- **Theme**: toggle in the header; choice is stored in `localStorage` so a refresh keeps the preference.
- **Footer**: author line and social links.

## Stack

- React 18 + TypeScript + Vite 6  
- AG Grid Community (`ag-grid-community`, `ag-grid-react`)  
- Sass for layout and theme-aware surfaces  
- `react-icons` for the theme toggle and footer icons  


## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

The production JS bundle is large because AG Grid ships a full grid engine; splitting the grid into a lazy route is an easy follow-up if you need a lighter first paint.

## Project layout (high level)

| Path | Role |
|------|------|
| `src/main.tsx` | Bootstraps React, registers AG Grid community modules, imports grid CSS. |
| `src/App.tsx` | Page shell: header, dashboard, footer. |
| `src/components/Dashboard.tsx` | KPI cards + `AgGridReact` column definitions and grid options. |
| `src/data/employees.ts` | Sample `employees` array. |
| `src/context/themeContext.ts` | React context object and types. |
| `src/context/ThemeProvider.tsx` | Theme state, persistence, and provider. |
| `src/hooks/useThemeMode.ts` | Reads/writes theme from context. |
| `src/styles/` | Global + component SCSS (including `[data-theme='light' \| 'dark']` overrides). |

## Notes you can use in an interview

1. **Large datasets (same UI pattern)**  
   This grid uses the default **client-side row model**: rows are virtualized in the DOM, so scrolling stays efficient as row counts grow. For very large pages or server-driven data, you would switch to **infinite row model** or **server-side row model** and keep filters/sort on the API.

2. **Community vs Enterprise**  
   Filters used here are the built-in **community** text/number filters. Set filters and some enterprise-only features are intentionally avoided.

3. **Stable row identity**  
   `getRowId` is set from `id` so row updates (if you later wire mutations or refreshes) reconcile cleanly.

4. **Theming**  
   Quartz / Quartz Dark classes are applied on the grid wrapper so the table matches the rest of the app in light or dark mode.

## License

Private assessment project.
