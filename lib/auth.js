export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};

export const getUserFromToken = () => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { id: payload.id, role: payload.role };
  } catch (error) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.href = '/auth/login';
};