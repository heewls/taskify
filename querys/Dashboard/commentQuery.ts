import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import EXTERNAL_API from '@/constants/api/external';
import { CommentPromise } from '@/components/compound/modal/types';

export function useGetComments(cardId: number) {
  return useQuery({
    queryKey: ['comments', cardId],
    queryFn: async () => {
      const response = await apiClient.get<CommentPromise>(
        `${EXTERNAL_API.COMMENTS.ROOT}?cardId=${cardId}`
      );
      return response.data;
    },
    enabled: !!cardId,
  });
}

export function useCreateComment({
  content,
  columnId,
  cardId,
  dashboardId,
}: {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return await apiClient.post(EXTERNAL_API.COMMENTS.ROOT, {
        content,
        columnId,
        cardId,
        dashboardId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', cardId] });
    },
  });

  return { ...mutation, createCommentMutation: mutation.mutateAsync };
}

export function useUpdateComment(cardId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ commentId, content }: { commentId: number; content: string }) => {
      return await apiClient.put(`${EXTERNAL_API.COMMENTS.ROOT}/${commentId}`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', cardId] });
    },
  });

  return { ...mutation, updateCommentMutation: mutation.mutateAsync };
}

export function useDeleteComment(cardId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (commentId: number) => {
      return await apiClient.delete(`${EXTERNAL_API.COMMENTS.ROOT}/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', cardId] });
    },
  });

  return { ...mutation, deleteCommentMutation: mutation.mutateAsync };
}
