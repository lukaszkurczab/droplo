export interface INavigationItem {
  id: string;
  label: string;
  url: string;
  depth: number;
  children?: INavigationItem[];
}

export interface INavigationList {
  items: INavigationItem[];
}
