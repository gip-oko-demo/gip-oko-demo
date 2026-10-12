import { Routes } from '@angular/router';

import { Planet } from '@/planet';
// import { LandingPage } from '@landing/landing-page';

export const routes: Routes = [
  {
    // path: 'client', // нейтральный путь, но нужен хук с добавлением копии index.html под именем "404.html"
    // path: 'gip-oko-demo', // не выставлять, т.к. дублирует имя репозитория
    path: '', // подходит для github pages
    component: Planet,
    title: 'gip-oko-demo: map',
  },
  // ---------------------------------------------------------------------------------------- //
  // {
  //   path: 'landing',
  //   // component: LandingPage,
  //   title: 'gip-oko-demo: landing',
  //   loadComponent: () => import('./landing-page/landing-page').then((m) => m.LandingPage),
  //   children: [
  //     // {
  //     //   path: 'main',
  //     //   component: Main,
  //     // },
  //     // {
  //     //   path: 'news',
  //     //   component: News,
  //     // },
  //     // {
  //     //   path: 'contacts',
  //     //   component: Contacts,
  //     // },
  //     { path: '**', redirectTo: 'landing' },
  //   ],
  // },
  // ---------------------------------------------------------------------------------------- //
  // { path: '**', redirectTo: 'gip-oko-demo' }, // Wildcard - always last
  { path: '**', redirectTo: '' },
];
