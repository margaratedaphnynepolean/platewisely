// Small helpers for saving things in the phone's browser storage (localStorage).
// Think of it as a little notebook that stays on the phone even after you close the app.

// Reads a saved value. Returns null if nothing is saved or it cannot be read.
export function readSavedValue(storageKey) {
  try {
    const savedText = window.localStorage.getItem(storageKey);
    return savedText ? JSON.parse(savedText) : null;
  } catch {
    return null;
  }
}

// Saves a value. Returns true if it worked, false if the browser refused
// (for example in private browsing mode).
export function writeSavedValue(storageKey, value) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
