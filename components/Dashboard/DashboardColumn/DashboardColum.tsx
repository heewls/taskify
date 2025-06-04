'use client';

import AddCardBtn from './AddCardBtn';
import ColumnSettingList from './ColumnSettingList';
import { ColumnType } from '../type';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableCard from '../DashboardCard/SortableCard';
import { cardOrdersTable } from './db';
import { useGetCoulmnCards } from '@/querys/Dashboard/coulmnCardQuery';
import { useQueryClient } from '@tanstack/react-query';

export default function DashboardColumn({ columnId, columnTitle }: ColumnType) {
  const { data } = useGetCoulmnCards(columnId);
  const queryClient = useQueryClient();

  // const getCards = useCallback(
  //   async (id?: number) => {
  //     try {
  //       const data = await getDashboardCard(id ?? columnId);
  //       const dbOrder = await cardOrdersTable.get(id ?? columnId);

  //       setCards(() => {
  //         const orderedCards = dbOrder
  //           ? (dbOrder.order
  //               .map((id: number) => data.cards.find((card) => card.id === id))
  //               .filter(Boolean) as CardType[])
  //           : [];

  //         const missingCards = data.cards.filter(
  //           (card) => !orderedCards.some((c) => c.id === card.id)
  //         );

  //         return [...missingCards, ...orderedCards];
  //       });

  //       setTotalCounts(data.totalCount);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   },
  //   [columnId]
  // );

  // useEffect(() => {
  //   getCards();
  // }, [getCards]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !data) return;

    const oldIndex = data.cards.findIndex((card) => card.id === active.id);
    const newIndex = data.cards.findIndex((card) => card.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newCardsOrder = arrayMove(data.cards, oldIndex, newIndex);
    await cardOrdersTable.put({ columnId, order: newCardsOrder.map((c) => c.id) });

    queryClient.invalidateQueries({ queryKey: ['dashboard-cards', columnId] });
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  return (
    <div className="border-gray200 w-full shrink-0 overflow-y-scroll border-b border-solid px-5 py-[18px] lg:h-full lg:w-[354px] lg:border-r lg:border-b-0">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-violet h-2 w-2 rounded-full" />
            <h2 className="text-bold16 text-black">{columnTitle}</h2>
            <span className="bg-gray200 text-medium12 text-gray500 ml-1 flex items-center justify-center rounded-sm px-1.5 py-[3px]">
              {data?.totalCount ?? 0}
            </span>
          </div>
          <ColumnSettingList columnId={columnId} columnTitle={columnTitle} />
        </div>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext items={data?.cards ?? []} strategy={verticalListSortingStrategy}>
            <div className="flex w-full flex-col gap-2 md:gap-4">
              <AddCardBtn columnId={columnId} />
              {data?.cards.map((card) => (
                <SortableCard key={card.id} card={card} columnTitle={columnTitle} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
