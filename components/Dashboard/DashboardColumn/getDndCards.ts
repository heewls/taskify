import getColumnCards from '../DashboardCard/action';
import { Card } from '../type';
import { cardOrdersTable } from './db';

export const getDndCards = async (columnId: number) => {
  const data = await getColumnCards(columnId);

  const dbOrder = await cardOrdersTable.get(columnId);
  const cards = data.cards;

  const orderedCards = dbOrder
    ? (dbOrder.order
        .map((id: number) => cards.find((card) => card.id === id))
        .filter(Boolean) as Card[])
    : [];

  const missingCards = data.cards.filter((card) => !orderedCards.some((c) => c.id === card.id));

  return {
    cards: [...missingCards, ...orderedCards],
    totalCount: data.totalCount,
  };
};
