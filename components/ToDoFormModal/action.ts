import EXTERNAL_API from '@/constants/api/external';
import { apiClient } from '@/lib/apiClient';

export async function postDashboardCardImage(columnId: number, file: File) {
  const imageFormData = new FormData();
  imageFormData.append('image', file);

  const response = await apiClient.post<{ imageUrl: string }>(
    `${EXTERNAL_API.COLUMNS.uploadCardImage(columnId)}`,
    imageFormData
  );

  return response.data;
}
