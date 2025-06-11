'use server';

import EXTERNAL_API from '@/constants/api/external';
import { apiServer } from '@/lib/apiServer';

export interface Columns {
  id: number;
  title: string;
}

export interface ColumnPromise {
  data: Columns[];
}

export interface Member {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  userId: number;
}

interface MembersPromise {
  members: Member[];
  totalCount: number;
}

export default async function getDashboardColumn(dashboardId: number) {
  const response = await apiServer.get<ColumnPromise>(
    `${EXTERNAL_API.COLUMNS.ROOT}?dashboardId=${dashboardId}`
  );
  return response.data.data;
}

export async function getMembers(dashboardId: number) {
  const response = await apiServer.get<MembersPromise>(
    `${EXTERNAL_API.MEMBERS.ROOT}?dashboardId=${dashboardId}`
  );
  return response.data;
}
