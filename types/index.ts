export interface Item {
  id: number;
  name: string;
  label: string;
  type: "string" | "number" | "boolean";
  required: boolean;
}

export interface Form {
  id: number;
  name: string;
  items: Item[];
}
