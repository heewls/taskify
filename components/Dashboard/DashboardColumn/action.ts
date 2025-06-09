'use server';

import { apiServer } from '@/lib/apiServer';

export interface Columns {
  id: number;
  title: string;
}

export interface ColumnPromise {
  data: Columns[];
}

export default async function getDashboardColumn(dashboardId: number) {
  const response = await apiServer.get<ColumnPromise>(`/columns?dashboardId=${dashboardId}`);
  return response.data.data;
}
