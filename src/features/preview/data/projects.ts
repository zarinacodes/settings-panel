export type Project = {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Draft';
  updatedAt: string;
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Project Alpha',
    description: 'Main dashboard and analytics',
    status: 'Active',
    updatedAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'Project Beta',
    description: 'User management and settings',
    status: 'Draft',
    updatedAt: 'Yesterday',
  },
  {
    id: '3',
    title: 'Project Gamma',
    description: 'Reports and exports',
    status: 'Active',
    updatedAt: '1 week ago',
  },
];
