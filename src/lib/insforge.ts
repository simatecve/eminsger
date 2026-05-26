import { createClient } from '@insforge/sdk';

const baseUrl = import.meta.env.VITE_INSFORGE_URL || 'https://7m7gg4ke.us-east.insforge.app';
const anonKey = import.meta.env.VITE_INSFORGE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1ODk4ODZ9.Eaye9Rzc2JaaIpzHIfJUuPWJ5twWkwmzbWs5HAk0AOU';

if (!baseUrl || !anonKey) {
  console.error('Missing InsForge environment variables');
}

export const insforge = createClient({
  baseUrl,
  anonKey,
});

try {
  if (typeof window !== 'undefined') {
    const raw = window.localStorage.getItem('insforge_session');
    if (raw) {
      const parsed = JSON.parse(raw);
      const accessToken = parsed?.accessToken;
      const user = parsed?.user;
      if (typeof accessToken === 'string' && user) {
        insforge.setAccessToken(accessToken);
        (insforge as any).tokenManager?.setUser?.(user);
      }
    }
  }
} catch {
}
