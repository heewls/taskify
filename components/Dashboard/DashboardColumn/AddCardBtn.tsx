'use client';

import Button from '@/components/common/Button';
import ToDoFormModal from '@/components/ToDoFormModal/ToDoFormModal';
import { useModal } from '@/hooks/useModal';
import Plus from '@/public/icons/plus.svg';

export default function AddCardBtn({ columnId }: { columnId: number }) {
  const { isOpen, open, close } = useModal();
  return (
    <>
      <ToDoFormModal isOpen={isOpen} onClose={close} columnId={columnId} />
      <Button onClick={open} fullWidth size="addTodo" variant="outline">
        <Plus />
      </Button>
    </>
  );
}
