export type NavigationLink = { label: string; href: string };
export type NavigationItem =
  NavigationLink | { label: string; children: NavigationLink[] };
const website = 'https://www.gscam.edu.bd';
const link = (label: string, path: string): NavigationLink => ({
  label,
  href: `${website}${path}`,
});
export const mainNavigation: NavigationItem[] = [
  link('Home', '/'),
  {
    label: 'Academic Info',
    children: [
      link('Notice Board', '/academic-info/notice'),
      link('Class Routine', '/academic-info/class-routine'),
      link('Teacher Info', '/academic-info/teachers'),
    ],
  },
  {
    label: 'Exam Result',
    children: [
      link('PSC Result', '/exam-result/psc'),
      link('JSC Result', '/exam-result/jsc'),
      link('SSC Result', '/exam-result/ssc'),
    ],
  },
  link('Download', '/download'),
  link('Gallery', '/gallery'),
  {
    label: 'Online Activity',
    children: [
      link('Online Class', '/online-activity/class'),
      link('Assignment', '/online-activity/assignment'),
    ],
  },
  {
    label: 'About Us',
    children: [
      link('Our Teachers', '/about-us/teachers'),
      link('Mission & Vision', '/about-us/mission&vision'),
      link('Chairman/President List', '/about-us/chairman/president-list'),
    ],
  },
  link('Scholarship', '/scholarship'),
];
export const loginUrl = '/login';
