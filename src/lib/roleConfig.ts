import { Role } from './auth';

export interface RoleConfig {
  id: Role;
  name: string;
  description: string;
  color: string;
  glowClass: string;
  basePath: string;
}

export const roleConfigs: Record<Role, RoleConfig> = {
  'reporter': {
    id: 'reporter',
    name: 'Licensee Reporter',
    description: 'Submit and track incidents for your organisation.',
    color: 'hsl(191 100% 50%)',
    glowClass: 'glow-cyan',
    basePath: '/reporter',
  },
  'licensee-admin': {
    id: 'licensee-admin',
    name: 'Licensee Admin',
    description: 'Manage your organisation\'s users and submissions.',
    color: 'hsl(271 76% 53%)',
    glowClass: 'glow-purple',
    basePath: '/licensee-admin',
  },
  'reviewer': {
    id: 'reviewer',
    name: 'MCMC Reviewer',
    description: 'Review and process incident submissions.',
    color: 'hsl(203 89% 53%)',
    glowClass: 'glow-blue',
    basePath: '/reviewer',
  },
  'validator': {
    id: 'validator',
    name: 'MCMC Validator / Approver',
    description: 'Approve and finalize incident decisions.',
    color: 'hsl(38 92% 50%)',
    glowClass: 'glow-amber',
    basePath: '/validator',
  },
  'investigator': {
    id: 'investigator',
    name: 'MCMC Investigator',
    description: 'Conduct in-depth incident investigations.',
    color: 'hsl(0 78% 62%)',
    glowClass: 'glow-red',
    basePath: '/investigator',
  },
  'system-admin': {
    id: 'system-admin',
    name: 'MCMC System Admin',
    description: 'Configure system settings and manage users.',
    color: 'hsl(168 76% 42%)',
    glowClass: 'glow-teal',
    basePath: '/admin',
  },
  'super-admin': {
    id: 'super-admin',
    name: 'MCMC Super Admin',
    description: 'Full system access with AI analytics.',
    color: 'hsl(45 93% 47%)',
    glowClass: 'glow-gold',
    basePath: '/super-admin',
  },
};

export const getRoleConfig = (role: Role): RoleConfig => {
  return roleConfigs[role];
};
