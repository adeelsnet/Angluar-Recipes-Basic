export interface Sidenav {
  route: string;
  title: string;
  icon: string;
}

export const sideNavItems: Sidenav[] = [
  {
    route: '/',
    title: 'View Recipes',
    icon: 'fastfood'
  },
  {
    route: '/create-recipe',
    title: 'Create Recipe',
    icon: 'restaurant_menu'
  }
]

export const layoutConfig = {
  toolbarColor: 'accent',
  toolbarTitle: ' Recipes',
  toolbarMode: 'fixed',

  sidenavMode: 'push',
  sidenavBgColor: '#fbe2f0',
  sidenavPosition: 'start'
}
