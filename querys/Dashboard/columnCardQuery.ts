import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import EXTERNAL_API from '@/constants/api/external';
import { getDndCards } from '@/components/Dashboard/DashboardColumn/getDashboardCard';
import { Card, CardPayload } from '@/components/Dashboard/type';

export function useGetColumnCards(columnId: number) {
  return useQuery({
    queryKey: ['column-cards', columnId],
    queryFn: () => getDndCards(columnId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export function useManageColumnCards({ payload, card }: { payload: CardPayload; card?: Card }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const url = card ? `${EXTERNAL_API.CARDS.ROOT}/${card.id}` : `${EXTERNAL_API.CARDS.ROOT}`;
      const method = card ? apiClient.put : apiClient.post;

      return await method(url, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['column-cards', payload.columnId],
      });
    },
  });

  return { ...mutation, manageCardMutation: mutation.mutateAsync };
}

export function useDeleteColumnCard({ cardId, columnId }: { cardId: number; columnId: number }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete(`${EXTERNAL_API.CARDS.ROOT}/${cardId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['column-cards', columnId],
      });
    },
  });

  return { ...mutation, deleteCardMutation: mutation.mutateAsync };
}
