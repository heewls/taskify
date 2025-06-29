'use client';

import { ReactNode, useEffect } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { Columns, Member } from './action';

type StoreProps = {
  members: Member[];
  initialColumns: Columns[];
  children: ReactNode;
};

export function DashboardStore({ members, initialColumns, children }: StoreProps) {
  const setMembers = useDashboardStore((s) => s.setMembers);
  const setDashboardColumns = useDashboardStore((s) => s.setDashboardColumns);

  useEffect(() => {
    setMembers(members);
    setDashboardColumns(initialColumns);
  }, [members, initialColumns, setMembers, setDashboardColumns]);

  return <>{children}</>;
}
