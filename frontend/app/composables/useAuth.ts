interface User {
  id: number;
  email: string;
  fullName: string;
  phone: string | null;
  role: string;
}

export const useAuth = () => {
  const user = useState<User | null>('auth_user', () => null);
  const accessToken = useState<string | null>('auth_token', () => null);
  const refreshToken = useState<string | null>('auth_refresh', () => null);
  const loading = useState<boolean>('auth_loading', () => false);

  const isAuthenticated = computed(() => !!accessToken.value && !!user.value);
  const isAdmin = computed(() => user.value?.role === 'ADMIN');

  // Initialize from localStorage on client
  if (import.meta.client && !accessToken.value) {
    const savedToken = localStorage.getItem('accessToken');
    const savedRefresh = localStorage.getItem('refreshToken');
    const savedUser = localStorage.getItem('user');
    if (savedToken) accessToken.value = savedToken;
    if (savedRefresh) refreshToken.value = savedRefresh;
    if (savedUser) {
      try { user.value = JSON.parse(savedUser); } catch {}
    }
  }

  const api = (url: string, opts: any = {}) => {
    const headers: any = { 'Content-Type': 'application/json', ...opts.headers };
    if (accessToken.value) headers['Authorization'] = `Bearer ${accessToken.value}`;
    return $fetch(url, { ...opts, headers });
  };

  const saveTokens = (data: { accessToken: string; refreshToken: string; user: User }) => {
    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    user.value = data.user;
    if (import.meta.client) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
  };

  const login = async (email: string, password: string) => {
    loading.value = true;
    try {
      const data: any = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      saveTokens(data);
      return data;
    } finally {
      loading.value = false;
    }
  };

  const register = async (email: string, password: string, fullName: string, phone?: string) => {
    loading.value = true;
    try {
      const data: any = await $fetch('/api/auth/register', {
        method: 'POST',
        body: { email, password, fullName, phone },
      });
      saveTokens(data);
      return data;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    if (import.meta.client) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
    navigateTo('/');
  };

  const fetchUser = async () => {
    if (!accessToken.value) return;
    try {
      const data: any = await api('/api/auth/me');
      user.value = data;
    } catch {
      logout();
    }
  };

  return {
    user,
    accessToken,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    fetchUser,
    api,
  };
};
