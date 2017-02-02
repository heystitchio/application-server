/**
 * Server-side routes. Only the listed routes support html5pushstate.
 * Has to match client side routes.
 *
 * Index (/) route does not have to be listed here.
 *
 * @example
 * export const routes: string[] = [
 * 'home', 'about'
 * ];
 **/
export const routes: string[] = [
  // About
  'about',
  'about/welcome',
  'about/how-it-works',
  '/about/who-we-are',
  '/about/press',

  // Auth
  'login',
  'signup',
  'settings',

  // Contact
  'contact',
  'newsletters',

  // Create
  'create',

  // Discover
  'discover',

  // Explore
  'explore',
  'explore/featured',
  'explore/popular',
  'explore/categories',

  // Help
  'help',
  'help/faq',
  'help/support',

  // Highlights
  'highlights',

  // Jobs
  'jobs',

  // Projects
  'project/:slug',
  'project/:slug/dashboard',

  // Search
  'search',

  // Terms
  'terms',
  'terms/use',
  'terms/privacy',
  'terms/cookies',

  // Trending
  'trending',
  'trending/users',
  'trending/teams',

  // Teams
  'team/:slug',
  'team/:slug/dashboard',

  // Users
  'user/:slug',

  // 404
  '404',
  '**'
];
