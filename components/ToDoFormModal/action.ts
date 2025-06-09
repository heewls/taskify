import EXTERNAL_API from '@/constants/api/external';
import { apiClient } from '@/lib/apiClient';
import { ColumnPromise } from '../Dashboard/DashboardColumn/action';

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

export async function getMembers(dashboardId: number) {
  const response = await apiClient.get<MembersPromise>(
    `${EXTERNAL_API.MEMBERS.ROOT}?dashboardId=${dashboardId}`
  );
  return response.data;
}

export async function getColumns(dashboardId: number) {
  const response = await apiClient.get<ColumnPromise>(`/columns?dashboardId=${dashboardId}`);

  return response.data.data;
}

export async function postDashboardCardImage(columnId: number, file: File) {
  const imageFormData = new FormData();
  imageFormData.append('image', file);

  const response = await apiClient.post<{ imageUrl: string }>(
    `${EXTERNAL_API.COLUMNS.uploadCardImage(columnId)}`,
    imageFormData
  );

  return response.data;
}
