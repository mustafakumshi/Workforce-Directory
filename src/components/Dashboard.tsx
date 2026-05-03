import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  type ColDef,
  type GetRowIdParams,
  type ValueFormatterParams,
} from 'ag-grid-community';
import { employees } from '../data/employees';
import type { Employee } from '../types/employee';
import useThemeMode from '../hooks/useThemeMode';
import '../styles/Dashboard.scss';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function formatHireDate(value: string) {
  const d = new Date(value + 'T12:00:00');
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const Dashboard = () => {
  const { mode } = useThemeMode();

  const kpis = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.isActive).length;
    const deptCount = new Set(employees.map((e) => e.department)).size;
    const avgSalary =
      employees.reduce((sum, e) => sum + e.salary, 0) / total;
    return { total, active, deptCount, avgSalary };
  }, []);

  const columnDefs = useMemo<ColDef<Employee>[]>(
    () => [
      {
        colId: 'name',
        headerName: 'Name',
        valueGetter: (p) =>
          `${p.data?.firstName ?? ''} ${p.data?.lastName ?? ''}`.trim(),
        minWidth: 150,
        flex: 1,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'department',
        headerName: 'Department',
        minWidth: 130,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'position',
        headerName: 'Role',
        minWidth: 160,
        flex: 1.2,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'location',
        headerName: 'Location',
        minWidth: 120,
      },
      {
        field: 'email',
        headerName: 'Email',
        minWidth: 220,
        flex: 1.4,
      },
      {
        field: 'salary',
        headerName: 'Salary',
        minWidth: 110,
        filter: 'agNumberColumnFilter',
        valueFormatter: (p: ValueFormatterParams<Employee, number>) =>
          p.value == null ? '' : currency.format(p.value),
      },
      {
        field: 'hireDate',
        headerName: 'Hired',
        minWidth: 120,
        valueFormatter: (p) =>
          p.value == null ? '' : formatHireDate(String(p.value)),
        comparator: (a, b) =>
          new Date(String(a)).getTime() - new Date(String(b)).getTime(),
      },
      {
        field: 'performanceRating',
        headerName: 'Rating',
        minWidth: 100,
        filter: 'agNumberColumnFilter',
        valueFormatter: (p) =>
          p.value == null ? '' : Number(p.value).toFixed(1),
      },
      {
        field: 'projectsCompleted',
        headerName: 'Projects',
        minWidth: 110,
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'isActive',
        headerName: 'Status',
        minWidth: 110,
        filter: false,
        floatingFilter: false,
        valueFormatter: (p) => (p.value === true ? 'Active' : 'Inactive'),
      },
      {
        field: 'skills',
        headerName: 'Skills',
        minWidth: 200,
        flex: 1.5,
        valueGetter: (p) => (p.data?.skills ?? []).join(', '),
        filter: 'agTextColumnFilter',
      },
      {
        field: 'manager',
        headerName: 'Manager',
        minWidth: 140,
        valueFormatter: (p) =>
          p.value == null || p.value === '' ? '—' : String(p.value),
      },
      {
        field: 'age',
        headerName: 'Age',
        width: 90,
        filter: 'agNumberColumnFilter',
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef<Employee>>(
    () => ({
      sortable: true,
      resizable: true,
      floatingFilter: true,
      suppressHeaderMenuButton: false,
    }),
    []
  );

  const gridThemeClass =
    mode === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';

  return (
    <div className="dashboard-container">
      <div className="dashboard-intro">
        <p className="dashboard-lead">
          Sort, filter, and paginate below. The grid only mounts visible rows, so
          the same setup stays responsive if you plug in a bigger dataset later.
        </p>
        <div className="kpi-row" role="group" aria-label="Summary figures">
          <div className="kpi-card">
            <span className="kpi-label">Headcount</span>
            <span className="kpi-value">{kpis.total}</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Active</span>
            <span className="kpi-value">{kpis.active}</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Departments</span>
            <span className="kpi-value">{kpis.deptCount}</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Avg. salary</span>
            <span className="kpi-value">{currency.format(kpis.avgSalary)}</span>
          </div>
        </div>
      </div>

      <div className={`grid-host ${gridThemeClass}`}>
        <AgGridReact<Employee>
          rowData={employees}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowId={(p: GetRowIdParams<Employee>) => String(p.data.id)}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          domLayout="normal"
          suppressCellFocus={true}
          ensureDomOrder={false}
        />
      </div>
    </div>
  );
};

export default Dashboard;
