import ColumnName from '../ColumnName/ColumnName';
import { SearchableDropdown, SelectionDropdown } from '../common/Dropdown';
import FormField from '../compound/form/FormField';
import UploadImage from '../compound/upload/UploadImage';
import UserBadge from '../UserBadge/UserBadge';
import TagInput from './TagInput';

export default function ToDoForm({ cardId }: { cardId?: number }) {
  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row">
        {cardId && (
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-black200 text-medium18">상태</label>
            <SelectionDropdown
              options={[
                { value: 'to do', id: 1, renderItem: () => <ColumnName columnName="todo" /> },
              ]}
              onSelect={() => {}}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2">
          <label className="text-black200 text-medium18">담당자</label>
          <SearchableDropdown
            options={[
              {
                value: '김희진',
                id: 1,
                renderItem: () => <UserBadge size={26} userName="김희진" gap={6} fontSize="R14" />,
              },
            ]}
            onSelect={() => {}}
            placeholder="이름을 입력해 주세요"
          />
        </div>
      </div>
      <FormField fieldType="input" label="제목" placeholder="제목을 입력해 주세요" required />
      <FormField fieldType="textarea" label="설명" placeholder="설명을 입력해 주세요" required />
      <TagInput />
      <div className="flex flex-col gap-[5px]">
        <label className="text-black200 text-medium18">이미지</label>
        <div className="relative h-[58px] w-[58px] md:h-[76px] md:w-[76px]">
          <UploadImage image={''} id="" onChange={() => {}} />
        </div>
      </div>
    </>
  );
}
