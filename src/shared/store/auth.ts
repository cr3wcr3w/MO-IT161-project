import { atom } from "nanostores";

type User = {
  fullName: string;
  email: string;
  role: string;
  verified: boolean;
  authenticated: boolean;
};

const STORAGE_KEY = "auth";

function getSessionValue<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.sessionStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    window.sessionStorage.removeItem(key);
    return null;
  }
}

function setSessionValue<T>(key: string, value: T | null): void {
  if (typeof window === "undefined") {
    return;
  }

  if (value === null) {
    window.sessionStorage.removeItem(key);
    return;
  }

  window.sessionStorage.setItem(key, JSON.stringify(value));
}

export function readUserFromSession(): User | null {
  return getSessionValue<User>(STORAGE_KEY);
}

export function setUserSession(user: User | null): void {
  setSessionValue(STORAGE_KEY, user);
  $users.set(user);
}

export const $users = atom<User | null>(readUserFromSession());
