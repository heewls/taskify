'use client';

import { useState } from 'react';
import { getItem } from '@/utils/localstorage';
import { CommentsType } from '../compound/modal/types';
import UserBadge from '../UserBadge/UserBadge';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { formatISODateTime } from '@/utils/formatDateTime';
import { useDeleteComment, useUpdateComment } from '@/querys/dashboard/commentQuery';

interface Comment {
  comment: CommentsType;
  cardId: number;
}

interface UserInfo {
  email: string;
  id: number;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function Comment({ comment, cardId }: Comment) {
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState(comment.content);
  const { updateCommentMutation } = useUpdateComment(cardId);
  const { deleteCommentMutation } = useDeleteComment(cardId);

  const user = getItem<UserInfo>('userInfo');
  const userId = user?.id;

  const isUpdateAt = comment.updatedAt
    ? formatISODateTime(comment.updatedAt)
    : formatISODateTime(comment.createdAt);

  const handleCommentUpdate = async () => {
    try {
      await updateCommentMutation({ commentId: comment.id, content: editComment });
      setIsEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentDelete = async () => {
    try {
      await deleteCommentMutation(comment.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div key={comment.id} className="flex w-full gap-4">
      <div className="flex w-full items-start gap-3">
        <UserBadge size={34} profile={comment.author.profileImageUrl} />
        <div className="w-full">
          <div className="flex items-center gap-2">
            <p className="text-semi14">{comment.author.nickname}</p>
            <p className="text-regular12 text-gray400">{isUpdateAt}</p>
          </div>
          {!isEdit ? (
            <p className="text-regular14">{comment.content}</p>
          ) : (
            <div className="relative">
              <Textarea
                id="comment"
                placeholder="댓글 작성하기"
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              />
              <Button
                variant="ghost"
                size="comment"
                className="absolute right-4 bottom-4 rounded-sm"
                onClick={handleCommentUpdate}
                disabled={!editComment}
              >
                입력
              </Button>
            </div>
          )}
          {userId === comment.author.id && !isEdit && (
            <div className="text-regular12 text-gray400 flex gap-3">
              <p className="cursor-pointer underline" onClick={() => setIsEdit(true)}>
                수정
              </p>
              <p className="cursor-pointer underline" onClick={handleCommentDelete}>
                삭제
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
