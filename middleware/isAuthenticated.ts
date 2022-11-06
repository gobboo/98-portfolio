import { useAuth } from './../store/auth';
export default defineNuxtRouteMiddleware(() => {
  const auth = useAuth();

  if (!auth.isAuthed) {
    return navigateTo('/auth');
  }
})