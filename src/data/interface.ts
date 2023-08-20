export interface GameItem {
  type: "file" | "folder";
  name: string;
  value: string;
  date: string;
  size: string;
}
