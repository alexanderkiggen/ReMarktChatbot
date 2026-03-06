"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

export type ColorScheme = "light" | "dark";
export type ColorSchemePreference = ColorScheme | "system";

const STORAGE_KEY = "chatkit-color-scheme";

function getSystemSnapshot(): ColorScheme {
  return "light"; // Forceer altijd de lichte modus
}

function getServerSnapshot(): ColorScheme {
  return "light";
}

function subscribeSystem(listener: () => void): () => void {
  return () => { };
}

function readStoredPreference(): ColorSchemePreference | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "light" || raw === "dark") {
      return "light"; // Negeer de opgeslagen donkere modus
    }
    return raw === "system" ? "system" : null;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[useColorScheme] Failed to read preference", error);
    }
    return null;
  }
}

function persistPreference(preference: ColorSchemePreference): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    if (preference === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, "light"); // Forceer opslaan als light
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[useColorScheme] Failed to persist preference", error);
    }
  }
}

function applyDocumentScheme(scheme: ColorScheme): void {
  if (typeof document === "undefined") {
    return;
  }
  const root = document.documentElement;
  root.dataset.colorScheme = "light";
  root.classList.remove("dark");
  root.style.colorScheme = "light";
}

type UseColorSchemeResult = {
  scheme: ColorScheme;
  preference: ColorSchemePreference;
  setScheme: (scheme: ColorScheme) => void;
  setPreference: (preference: ColorSchemePreference) => void;
  resetPreference: () => void;
};

function useSystemColorScheme(): ColorScheme {
  return useSyncExternalStore(subscribeSystem, getSystemSnapshot, getServerSnapshot);
}

export function useColorScheme(
  initialPreference: ColorSchemePreference = "system"
): UseColorSchemeResult {
  const systemScheme = useSystemColorScheme();

  const [preference, setPreferenceState] = useState<ColorSchemePreference>(() => {
    return "light";
  });

  const scheme = useMemo<ColorScheme>(
    () => "light",
    []
  );

  useEffect(() => {
    persistPreference(preference);
  }, [preference]);

  useEffect(() => {
    applyDocumentScheme(scheme);
  }, [scheme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }
      setPreferenceState((current) => {
        const stored = readStoredPreference();
        return stored ?? current;
      });
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setPreference = useCallback((next: ColorSchemePreference) => {
    setPreferenceState("light");
  }, []);

  const setScheme = useCallback((next: ColorScheme) => {
    setPreferenceState("light");
  }, []);

  const resetPreference = useCallback(() => {
    setPreferenceState("light");
  }, []);

  return {
    scheme,
    preference,
    setScheme,
    setPreference,
    resetPreference,
  };
}