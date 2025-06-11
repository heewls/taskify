import { ModalProps } from '@/types/modalProps';
import Modal from '../common/Modal';
import useDashboardParamsId from '../Dashboard/useDashboardParamsId';
import { deleteColumn } from './action';

interface DeleteColumnProps extends ModalProps {
  columnId: number;
}

export default function DeleteColumnModal({ isOpen, onClose, columnId }: DeleteColumnProps) {
  const { dashboardId } = useDashboardParamsId();

  const handelColumnDelete = () => {
    deleteColumn({ columnId, dashboardId }).then(() => onClose());
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        padding="24/24"
        borderRadius="16"
        submitMessage="삭제"
        cancelMessage="취소"
        onSubmit={handelColumnDelete}
      >
        <div className="text-medium16 sm:text-medium20 flex w-full justify-center">
          컬럼의 모든 카드가 삭제됩니다.
        </div>
      </Modal>
    </>
  );
}
