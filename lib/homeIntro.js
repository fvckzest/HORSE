export const HOME_INTRO_SKIP_KEY = "zest.horse.skipHomeIntro";

export function skipHomeIntroOnce() {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem(HOME_INTRO_SKIP_KEY, "true");
}

export function shouldSkipHomeIntro() {
  if (typeof window === "undefined") return false;

  const shouldSkip =
    window.sessionStorage.getItem(HOME_INTRO_SKIP_KEY) === "true";
  window.sessionStorage.removeItem(HOME_INTRO_SKIP_KEY);
  return shouldSkip;
}
