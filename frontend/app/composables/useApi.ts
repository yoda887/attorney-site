export const useApi = () => {
  const { accessToken } = useAuth();

  const api = async (url: string, opts: any = {}) => {
    const headers: Record<string, string> = {
      ...opts.headers,
    };

    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }

    if (!(opts.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    return $fetch(url, { ...opts, headers });
  };

  return { api };
};
