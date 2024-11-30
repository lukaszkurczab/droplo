export interface INavigationItem {
  id: string;
  label: string;
  url: string;
  children?: INavigationItem[];
}

export interface INavigationList {
  items: INavigationItem[];
}
