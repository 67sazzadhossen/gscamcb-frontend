export type TUser = { id: string; name: string; email: string; role?: string };
export type TResponse<T> = { success: boolean; message: string; data: T };
export type THealth = { status: 'ok'; service: string; uptime: number };
