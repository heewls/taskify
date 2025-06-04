'use server';

import { CardType } from './DashboardCard';
import { apiServer } from '@/lib/apiServer';

interface CardsPromise {
  cards: CardType[];
  totalCount: number;
}

export default async function getColumnCards(id: number) {
  const response = await apiServer.get<CardsPromise>(`/cards?columnId=${id}`);
  return response.data;
}
