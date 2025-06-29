'use client';

import React, { useRef, useState } from 'react';
import Modal from '@/components/common/Modal';
import CloseIcon from '@/assets/icons/CloseIcon';
import Image from 'next/image';
import Tag from '@/components/Tag/Tag';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/Button';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useBlockScroll } from '@/hooks/useBlockScroll';
import { MenuDropdown } from '@/components/common/Dropdown';
import UserBadge from '@/components/UserBadge/UserBadge';
import ColumnName from '@/components/ColumnName/ColumnName';
import { separateTagColor } from '@/utils/separateTagColor';
import { useModal } from '@/hooks/useModal';
import ToDoFormModal from '@/components/ToDoFormModal/ToDoFormModal';
import Comment from '@/components/Comment/Comment';
import { formatDate } from '@/utils/formatDateTime';
import { useDeleteColumnCard } from '@/querys/Dashboard/columnCardQuery';
import { useGetComments, useCreateComment } from '@/querys/Dashboard/commentQuery';
import { Card } from '@/components/Dashboard/type';

interface ColumnDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: Card;
  defaultImage: boolean;
  columnTitle: string;
  onFetchNextComments?: () => Promise<void>;
  hasNextPage?: boolean;
  isLoadingComments?: boolean;
  threshold?: number;
}

const ColumnDetailModal = ({
  isOpen,
  onClose,
  cardData,
  defaultImage = false,
  columnTitle,
  onFetchNextComments,
  hasNextPage = false,
  // isLoadingComments = false,
  threshold = 100,
}: ColumnDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen: isToDoUpdateModalOpen, open, close } = useModal();

  const { data } = useGetComments(cardData.id);

  const { createCommentMutation } = useCreateComment({
    content: commentText,
    columnId: cardData.columnId,
    cardId: cardData.id,
    dashboardId: cardData.dashboardId,
  });

  const { deleteCardMutation } = useDeleteColumnCard({
    cardId: cardData.id,
    columnId: cardData.columnId,
  });

  const tags = separateTagColor(cardData.tags);

  useBlockScroll(isOpen);

  const fetchNextComments = onFetchNextComments || (() => Promise.resolve());

  useInfiniteScroll({
    scrollRef: modalRef,
    fetchNextPage: fetchNextComments,
    hasNextPage,
    threshold,
  });

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createCommentMutation();
      setCommentText('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCardDelete = async () => {
    try {
      await deleteCardMutation();
    } catch (err) {
      console.error(err);
    }
  };

  const renderProfileImage = (imageUrl: string) =>
    imageUrl ? (
      <div className="relative flex h-[26px] w-[26px] items-center gap-2 overflow-hidden rounded-full md:h-[34px] md:w-[34px]">
        <Image src={imageUrl} alt="profile" fill />
      </div>
    ) : (
      <UserBadge size={34} profile={cardData.assignee.profileImageUrl} />
    );

  const renderHeader = () => (
    <header className="flex flex-col gap-4 md:flex-row md:justify-between">
      <h1 className="text-bold20 order-2 md:text-2xl md:leading-8 md:font-bold">
        {cardData.title}
      </h1>
      <div className="flex items-center justify-end gap-4 md:order-2 md:gap-6">
        <div className="flex items-center justify-center">
          <MenuDropdown
            options={[
              { id: 1, value: '수정' },
              { id: 2, value: '삭제' },
            ]}
            onSelect={(option) => {
              if (option.id === 1) {
                onClose();
                open();
              } else if (option.id === 2) {
                handleCardDelete();
              }
            }}
          />
        </div>
        <button className="cursor-pointer" onClick={onClose}>
          <CloseIcon width="24" height="24" color="#000000" className="h-6 w-6 md:h-8 md:w-8" />
        </button>
      </div>
    </header>
  );

  const renderCardDetails = () => (
    <div className="mb-8 flex flex-col gap-4 md:mb-4 md:flex-row md:justify-between">
      <div className="border-gray300 flex gap-[62px] rounded-lg border px-4 py-[9px] md:order-2 md:h-fit md:w-fit md:flex-col md:gap-4 md:py-[14px] md:pr-14">
        <div className="flex flex-col md:gap-[6px]">
          <h2 className="text-semi12">담당자</h2>
          <div className="flex items-center gap-2">
            {renderProfileImage(cardData.assignee.profileImageUrl ?? '')}
            <p className="text-regular12">{cardData.assignee.nickname}</p>
          </div>
        </div>
        <div className="flex w-[109px] flex-col gap-2 md:gap-[6px]">
          <h3 className="text-semi12">마감일</h3>
          <p className="text-regular12">{formatDate(cardData.dueDate, true)}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1">
          <ColumnName columnName={columnTitle} />
          <div className="mx-2 h-5 w-[1px] bg-gray-200" />
          {tags.map((tag) => (
            <Tag key={tag.text} tag={tag.text} color={tag.color} readonly />
          ))}
        </div>
        <div className="text-regular14 text-black md:min-w-[395px]">{cardData.description}</div>
      </div>
    </div>
  );

  const renderCardImage = () =>
    !defaultImage && (
      <div className="relative h-[168px] w-full overflow-hidden rounded-md bg-gray-200 md:h-[260px] md:w-[445px]">
        <Image src={cardData.imageUrl} alt="content" quality={80} fill />
      </div>
    );

  const renderCommentInput = () => (
    <div className="mt-6 flex flex-col">
      <div className="relative flex flex-col gap-1">
        <label htmlFor="comment" className="text-medium16">
          댓글
        </label>
        <Textarea
          id="comment"
          placeholder="댓글 작성하기"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          variant="ghost"
          size="comment"
          className="absolute right-4 bottom-4 rounded-sm"
          onClick={handleCommentSubmit}
          disabled={isSubmitting}
        >
          입력
        </Button>
      </div>
    </div>
  );

  const renderComments = () => (
    <>
      {data?.comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} cardId={cardData.id} />
      ))}
      {/* {renderCommentsPagination()} */}
    </>
  );

  // const renderCommentsPagination = () =>
  //   hasNextPage ? (
  //     <div className="space-y-4">
  //       {isLoadingComments && (
  //         <div className="flex flex-col items-center gap-2 p-4 text-gray-500">
  //           <span>댓글을 더 불러오는 중...</span>
  //         </div>
  //       )}
  //     </div>
  //   ) : (
  //     <p className="text-regular14 flex items-center justify-center">
  //       마지막 댓글입니다.
  //     </p>
  //   );

  return (
    <>
      <ToDoFormModal
        isOpen={isToDoUpdateModalOpen}
        onClose={close}
        columnId={cardData.columnId}
        card={cardData}
      />
      <Modal isOpen={isOpen} onClose={onClose} padding="32/24" borderRadius="8" ref={modalRef}>
        <div className="flex w-full flex-col gap-2 md:gap-6">
          {renderHeader()}
          <main className="md:w-[674px]">
            {renderCardDetails()}
            {renderCardImage()}
            <div className="flex flex-col gap-6">
              {renderCommentInput()}
              {renderComments()}
            </div>
          </main>
        </div>
      </Modal>
    </>
  );
};

export default ColumnDetailModal;
