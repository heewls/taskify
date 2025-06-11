import { create } from 'zustand';
import { Columns } from '@/components/Dashboard/DashboardColumn/action';

type DashboardColumnsStore = {
  dashboardColumns: Columns[];
  setDashboardColumns: (data: Columns[]) => void;
};

export const useDashboardColumns = create<DashboardColumnsStore>((set) => ({
  dashboardColumns: [],
  setDashboardColumns: (data) => set({ dashboardColumns: data }),
}));
