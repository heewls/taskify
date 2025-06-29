export interface Column {
  columnId: number;
  columnTitle: string;
}

export interface Card {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: { profileImageUrl: string | null; id?: number; nickname?: string };
  columnId: number;
  dashboardId: number;
}

export interface CardsPromise {
  cards: Card[];
  totalCount: number;
}

export interface CardProps {
  card: Card;
  columnTitle: Column['columnTitle'];
}

export interface CardPayload {
  title: string;
  description: string;
  dashboardId: Card['dashboardId'];
  dueDate: string;
  imageUrl: string;
  assigneeUserId: Card['assignee']['id'];
  columnId: Card['columnId'];
  tags: string[];
}
