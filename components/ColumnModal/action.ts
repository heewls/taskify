'use server';

import { revalidateTag } from 'next/cache';
import EXTERNAL_API from '@/constants/api/external';
import { apiServer } from '@/lib/apiServer';

export async function updateColumn({
  columnId,
  columnName,
  dashboardId,
}: {
  columnId: number;
  columnName: string;
  dashboardId: number;
}) {
  await apiServer.put(`${EXTERNAL_API.COLUMNS.ROOT}/${columnId}`, {
    title: columnName,
  });

  revalidateTag(`columns-${dashboardId}`);
}

export async function createColumn({
  dashboardId,
  columnName,
}: {
  dashboardId: number;
  columnName: string;
}) {
  await apiServer.post(EXTERNAL_API.COLUMNS.ROOT, {
    title: columnName,
    dashboardId,
  });

  revalidateTag(`columns-${dashboardId}`);
}
