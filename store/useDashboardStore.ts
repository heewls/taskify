import { create } from 'zustand';
import { Columns, Member } from '@/components/Dashboard/DashboardColumn/action';

type DashboardColumnsStore = {
  members: Member[];
  setMembers: (data: Member[]) => void;

  dashboardColumns: Columns[];
  setDashboardColumns: (data: Columns[]) => void;
};

export const useDashboardStore = create<DashboardColumnsStore>((set) => ({
  members: [],
  setMembers: (data) => set({ members: data }),

  dashboardColumns: [],
  setDashboardColumns: (data) => set({ dashboardColumns: data }),
}));
