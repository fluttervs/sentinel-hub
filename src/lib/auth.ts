// Simple in-memory auth for demo purposes
export type Role = 
  | 'reporter' 
  | 'licensee-admin' 
  | 'reviewer' 
  | 'validator' 
  | 'investigator' 
  | 'system-admin' 
  | 'super-admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  organisationId?: string;
  organisationName?: string;
}

let currentUser: User | null = null;

export const login = (email: string, password: string, role: Role): User => {
  // Demo: accept any credentials
  const roleNames: Record<Role, string> = {
    'reporter': 'Licensee Reporter',
    'licensee-admin': 'Licensee Admin',
    'reviewer': 'MCMC Reviewer',
    'validator': 'MCMC Validator',
    'investigator': 'MCMC Investigator',
    'system-admin': 'MCMC System Admin',
    'super-admin': 'MCMC Super Admin',
  };

  const user: User = {
    id: `user-${Date.now()}`,
    name: roleNames[role],
    email,
    role,
    organisationId: role === 'reporter' || role === 'licensee-admin' ? 'org-001' : undefined,
    organisationName: role === 'reporter' || role === 'licensee-admin' ? 'Express Courier Sdn Bhd' : undefined,
  };

  currentUser = user;
  return user;
};

export const logout = () => {
  currentUser = null;
};

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const isAuthenticated = (): boolean => {
  return currentUser !== null;
};
