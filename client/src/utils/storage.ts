const TOKEN = 'token';

export const getTokenFromStorage = (): string | null => {
  return localStorage.getItem(TOKEN);
};

export const setTokenToStorage = (token: string): void => {
  localStorage.setItem(TOKEN, token);
};

export const deleteTokenFromStorage = (): void => {
  localStorage.removeItem(TOKEN);
}