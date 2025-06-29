import { useEffect, useState } from 'react';
import { DropdownItem } from '../common/Dropdown/types';
import { postDashboardCardImage } from './action';
import checkAllFormComplete from '@/utils/checkAllFormComplete';
import formatDateTime, { parseDateTime } from '@/utils/formatDateTime';
import DEFAULT_CARD_IMAGE from '@/constants/image/defaultCardImage';
import { useManageColumnCards } from '@/querys/Dashboard/columnCardQuery';
import { Card } from '../Dashboard/type';
import UserBadge from '../UserBadge/UserBadge';
import ColumnName from '../ColumnName/ColumnName';
import { useDashboardStore } from '@/store/useDashboardStore';

interface ToDoData {
  title: string;
  description: string;
  dueDate: Date | null;
  imageUrl: string | null;
}

const INITIAL_TO_DO_VALUE = {
  title: '',
  description: '',
  dueDate: null,
  imageUrl: null,
};

export default function useToDoData(
  columnId: number,
  dashboardId: number,
  onClose: () => void,
  card?: Card
) {
  const [toDoData, setToDoData] = useState<ToDoData>(INITIAL_TO_DO_VALUE);
  const [assigneeUser, setAssigneeUser] = useState<DropdownItem>({
    id: card?.assignee?.id ?? '',
    value: '',
  });
  const [columnName, setColumnName] = useState<DropdownItem>({
    id: columnId ?? 0,
    value: '',
  });
  const [tags, setTags] = useState<string[]>(card?.tags ?? []);

  const columns = useDashboardStore((s) => s.dashboardColumns);
  const members = useDashboardStore((s) => s.members);

  useEffect(() => {
    if (card) {
      setToDoData({
        title: card.title,
        description: card.description,
        dueDate: parseDateTime(card.dueDate),
        imageUrl: card.imageUrl,
      });
    } else {
      setToDoData(INITIAL_TO_DO_VALUE);
    }
  }, [card]);

  const data = {
    title: toDoData.title,
    description: toDoData.description,
    dueDate: formatDateTime(toDoData.dueDate),
    dashboardId,
    assigneeUserId: Number(assigneeUser.id),
    columnId: card ? Number(columnName.id) : columnId,
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setToDoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDueDateChange = (date: Date | null) => {
    setToDoData((prev) => ({
      ...prev,
      dueDate: date,
    }));
  };

  const handleAssigneeUserChange = (userId: number | string) =>
    setAssigneeUser({ ...assigneeUser, id: userId });

  const handleColumnChange = (id: number | string) => setColumnName({ ...columnName, id });

  const handleTagsChange = (tags: string[]) => setTags(tags);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    try {
      const data = await postDashboardCardImage(columnId, file);

      setToDoData((prev) => ({
        ...prev,
        imageUrl: data.imageUrl,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const isFormComplete = checkAllFormComplete(data) && tags.length !== 0;

  const payload = {
    ...data,
    tags,
    imageUrl: toDoData.imageUrl ?? DEFAULT_CARD_IMAGE,
  };

  const { manageCardMutation } = useManageColumnCards({ payload, card });

  const handleToDoSubmit = () => {
    if (!isFormComplete) return;

    manageCardMutation()
      .then(() => {
        setToDoData(INITIAL_TO_DO_VALUE);
        setTags([]);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  const memberList = members.map((member) => ({
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

  const memberSelectedItem = memberList.find((member) => member.id === card?.assignee?.id);

  const columnList = columns.map((column) => ({
    value: column.title,
    id: column.id,
    renderItem: () => <ColumnName columnName={column.title} />,
  }));

  const columnSelectedItem = columnList.find((column) => column.id === columnId);

  return {
    toDoData,
    memberList,
    columnList,
    memberSelectedItem,
    columnSelectedItem,
    dueDate: toDoData.dueDate,
    image: toDoData.imageUrl,
    isFormComplete,
    handleFormChange,
    handleAssigneeUserChange,
    handleColumnChange,
    handleImageChange,
    handleDueDateChange,
    handleTagsChange,
    handleToDoSubmit,
  };
}
