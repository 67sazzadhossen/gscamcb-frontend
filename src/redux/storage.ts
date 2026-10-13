// Avoid accessing browser storage while Next.js renders on the server.
const storage = {
  async getItem(key: string): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        /* Storage may be disabled. */
      }
    }
  },
  async removeItem(key: string): Promise<void> {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(key);
      } catch {
        /* Storage may be disabled. */
      }
    }
  },
};
export default storage;
