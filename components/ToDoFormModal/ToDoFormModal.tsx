'use client';

import { useEffect, useMemo, useState } from 'react';
import { SearchableDropdown, SelectionDropdown } from '../common/Dropdown';
import Modal from '../common/Modal';
import FormField from '../compound/form/FormField';
import UploadImage from '../compound/upload/UploadImage';
import ColumnName from '../ColumnName/ColumnName';
import TagInput from './TagInput';
import useToDoData from './useToDoData';
import { DropdownItem } from '../common/Dropdown/types';
import UserBadge from '../UserBadge/UserBadge';
import { getMembers, Member } from './action';
import DueDate from './DueDate';
import useDashboardParamsId from '../Dashboard/useDashboardParamsId';
import Pencil from '@/public/icons/pencil.svg';
import { ModalProps } from '@/types/modalProps';
import getDashboardColumn, { ColumnsType } from '../Dashboard/DashboardColumn/action';
import DEFAULT_CARD_IMAGE from '@/constants/image/defaultCardImage';
import { Card } from '../Dashboard/type';

interface ToDoFormProps extends ModalProps {
  columnId: number;
  card?: Card;
}

const INITIAL_MEMBER_VALUE = {
  id: 0,
  nickname: '',
  profileImageUrl: '',
  userId: 0,
};

export default function ToDoFormModal({ isOpen, onClose, columnId, card }: ToDoFormProps) {
  const [dashboardMembers, setDashboardMembers] = useState<Member[]>([INITIAL_MEMBER_VALUE]);
  const [columnsName, setColumnsName] = useState<ColumnsType[]>([{ id: 0, title: '' }]);

  const { dashboardId } = useDashboardParamsId();

  const {
    toDoData,
    dueDate,
    image,
    isFormComplete,
    handleFormChange,
    handleAssigneeUserChange,
    handleColumnChange,
    handleDueDateChange,
    handleImageChange,
    handleTagsChange,
    handleToDoSubmit,
  } = useToDoData(columnId, dashboardId, onClose, card);

  const createOrUpdate = card?.id ? '수정' : '생성';

  useEffect(() => {
    if (!dashboardId) return;

    const getDatas = async () => {
      try {
        const [columns, membersData] = await Promise.all([
          getDashboardColumn(dashboardId),
          getMembers(dashboardId),
        ]);

        if (columns) setColumnsName(columns);
        if (membersData) setDashboardMembers(membersData.members);
      } catch (err) {
        console.error(err);
      }
    };

    getDatas();
  }, [dashboardId]);

  const memberList = useMemo(() => {
    return dashboardMembers.map((member) => ({
      value: member.nickname,
      id: member.userId,
      renderItem: () => (
        <UserBadge
          size={26}
          profile={member.profileImageUrl}
          userName={member.nickname}
          gap={6}
          fontSize="R14"
        />
      ),
    }));
  }, [dashboardMembers]);

  const memberSelectedItem = memberList.find((member) => member.id === card?.assignee?.id);

  const columnList = useMemo(() => {
    return columnsName.map((column) => ({
      value: column.title,
      id: column.id,
      renderItem: () => <ColumnName columnName={column.title} />,
    }));
  }, [columnsName]);

  const columnSelectedItem = columnList.find((column) => column.id === columnId);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      padding="32/32"
      borderRadius="16"
      cancelMessage="취소"
      submitMessage={createOrUpdate}
      onSubmit={handleToDoSubmit}
      disabled={!isFormComplete}
    >
      <div className="flex w-full flex-col gap-8">
        <h1 className="text-bold24">할 일 {createOrUpdate}</h1>
        <div className="flex flex-col gap-8 md:flex-row">
          {card?.id && (
            <div className="flex flex-1 flex-col gap-2">
              <label className="text-medium18">상태</label>
              <SelectionDropdown
                options={columnList}
                onSelect={(option: DropdownItem) => {
                  handleColumnChange(option.id);
                }}
                selectedItem={columnSelectedItem}
              />
            </div>
          )}
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-medium18">담당자</label>
            <SearchableDropdown
              options={memberList}
              onSelect={(option: DropdownItem) => {
                handleAssigneeUserChange(option.id);
              }}
              placeholder="이름을 입력해 주세요"
              selectedItem={memberSelectedItem}
            />
          </div>
        </div>
        <FormField
          fieldType="input"
          label="제목"
          name="title"
          value={toDoData.title}
          placeholder="제목을 입력해 주세요"
          onChange={handleFormChange}
          required
        />
        <FormField
          fieldType="textarea"
          label="설명"
          name="description"
          value={toDoData.description}
          placeholder="설명을 입력해 주세요"
          onChange={handleFormChange}
          required
        />
        <DueDate
          dueDate={dueDate}
          onDueDateChange={(date: Date | null) => handleDueDateChange(date)}
        />
        <TagInput writtenTags={card?.tags} onChange={(tags: string[]) => handleTagsChange(tags)} />
        <div className="flex flex-col gap-[5px]">
          <label className="text-medium18">이미지</label>
          <div className="relative h-[58px] w-[58px] rounded-lg md:h-[76px] md:w-[76px]">
            <UploadImage
              image={image === DEFAULT_CARD_IMAGE ? '' : image}
              id="image"
              onChange={handleImageChange}
            />
            {image && image !== DEFAULT_CARD_IMAGE && (
              <div
                className="absolute top-0 left-0 flex h-[58px] w-[58px] cursor-pointer items-center justify-center rounded-lg bg-black opacity-40 md:h-[76px] md:w-[76px]"
                onClick={() => document.getElementById('image')?.click()}
              >
                <Pencil />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
