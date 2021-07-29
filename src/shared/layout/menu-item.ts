export class MenuItem {
  id: number;
  parentId: number;
  label: string;
  route: string;
  icon: string;
  permissionName: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  children: MenuItem[];
  isDivided?: boolean;

  constructor(
    label: string,
    route: string,
    icon: string,
    permissionName: string = null,
    children: MenuItem[] = null,
    isDivided?:boolean
  ) {
    this.isDivided = isDivided;
    this.label = label;
    this.route = route;
    this.icon = icon;
    this.permissionName = permissionName;
    this.children = children;
  }
}
