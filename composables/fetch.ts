import { useAuth } from "~~/store/auth"

export async function useFetchWithAuth (url, options?) {
  const auth = useAuth();

  const headers = {};
  if (auth.isAuthed) {
    headers["Authorization"] = `Bearer ${auth.token}`
  }

  return await useFetch(url, { headers, ...options });
}