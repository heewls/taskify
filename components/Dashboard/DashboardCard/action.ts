'use server';

import { apiServer } from '@/lib/apiServer';
import { CardsPromise } from '../type';

export default async function getColumnCards(id: number) {
  const response = await apiServer.get<CardsPromise>(`/cards?columnId=${id}`);
  return response.data;
}
