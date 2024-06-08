export interface Issue {
  id: string;
  name: string;
  message: string;
  status: string;
  value: number;
  numEvents: number;
  numUsers: number;
  checked?: boolean;
}
