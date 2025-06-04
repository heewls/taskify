import getColumnCards from '../DashboardCard/action';
import { CardType } from '../DashboardCard/DashboardCard';
import { cardOrdersTable } from './db';

export const getDndCards = async (columnId: number) => {
  const data = await getColumnCards(columnId);

  const dbOrder = await cardOrdersTable.get(columnId);
  const cards = data.cards;

  const orderedCards = dbOrder
    ? (dbOrder.order
        .map((id: number) => cards.find((card) => card.id === id))
        .filter(Boolean) as CardType[])
    : [];

  const missingCards = data.cards.filter((card) => !orderedCards.some((c) => c.id === card.id));

  return {
    cards: [...missingCards, ...orderedCards],
    totalCount: data.totalCount,
  };
};
