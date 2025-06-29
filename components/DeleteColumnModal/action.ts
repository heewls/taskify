'use server';

import { revalidateTag } from 'next/cache';
import EXTERNAL_API from '@/constants/api/external';
import { apiServer } from '@/lib/apiServer';

export async function deleteColumn({
  columnId,
  dashboardId,
}: {
  columnId: number;
  dashboardId: number;
}) {
  await apiServer.delete(`${EXTERNAL_API.COLUMNS.ROOT}/${columnId}`);

  revalidateTag(`columns-${dashboardId}`);
}
