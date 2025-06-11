'use client';

import { ReactNode, useEffect } from 'react';
import { useDashboardColumns } from '@/store/useDashboardColumns';
import { Columns } from './action';

type StoreProps = {
  initialColumns: Columns[];
  children: ReactNode;
};

export function DashboardColumnsStore({ initialColumns, children }: StoreProps) {
  const setDashboardColumns = useDashboardColumns((s) => s.setDashboardColumns);

  useEffect(() => {
    setDashboardColumns(initialColumns);
  }, [initialColumns, setDashboardColumns]);

  return <>{children}</>;
}
