import ArrowDropDownIcon from '@/assets/icons/ArrowDropDown';
import KebabVertIcon from '@/assets/icons/KebabVertIcon';
import { DropdownItem } from '@/components/common/Dropdown/types';

interface TriggerProps {
  isOpen?: boolean;
  onClick: () => void;
}

interface SelectionTriggerProps extends TriggerProps {
  selected: DropdownItem;
}

export function MenuTrigger({ onClick }: TriggerProps) {
  return (
    <button
      className={`flex size-5 cursor-pointer items-center rounded-sm lg:size-7`}
      onClick={onClick}
    >
      <div className="block md:hidden">
        <KebabVertIcon width="20" height="20" />
      </div>
      <div className="hidden md:block">
        <KebabVertIcon width="28" height="28" />
      </div>
    </button>
  );
}

export function SelectionTrigger({ isOpen, onClick, selected }: SelectionTriggerProps) {
  return (
    <button
      className={`hover:border-violet border-gray300 flex min-h-12 w-full cursor-pointer items-center justify-between rounded-md border bg-white px-4 py-2 ${isOpen && 'border-violet'}`}
      onClick={onClick}
    >
      {selected?.renderItem ? (
        <>{selected.renderItem()}</>
      ) : (
        <span className="truncate">{selected?.value}</span>
      )}
      <div className="block md:hidden">
        <ArrowDropDownIcon width="20" height="20" />
      </div>
      <div className="hidden md:block">
        <ArrowDropDownIcon width="28" height="28" />
      </div>
    </button>
  );
}
