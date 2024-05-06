export interface ListItem {
  id: string;
  noticeTitle: string;
  sendTime: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
  unreadlist?: ListItem[];
}
