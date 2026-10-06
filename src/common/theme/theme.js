import { createMuiTheme } from '@material-ui/core/styles'

// Key used to persist an explicit user choice across visits.
export const THEME_STORAGE_KEY = 'knowledgespace-theme'

export const LIGHT_MODE = 'light'
export const DARK_MODE = 'dark'

export const DARK_MODE_QUERY = '(prefers-color-scheme: dark)'

// localStorage throws in some privacy modes and when storage is disabled, and
// matchMedia is missing on very old browsers. Every access is guarded so a
// restricted environment degrades to light mode instead of breaking the app.
export function readStoredMode() {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return stored === DARK_MODE || stored === LIGHT_MODE ? stored : null
  } catch (e) {
    return null
  }
}

export function persistMode(mode) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode)
  } catch (e) {
    // The theme still applies for this session; only persistence is lost.
  }
}

export function prefersDarkMode() {
  try {
    return !!(window.matchMedia && window.matchMedia(DARK_MODE_QUERY).matches)
  } catch (e) {
    return false
  }
}

// Resolution order: explicit saved choice, then OS preference, then light.
export function getInitialMode() {
  const stored = readStoredMode()
  if (stored) {
    return stored
  }
  return prefersDarkMode() ? DARK_MODE : LIGHT_MODE
}

// Used to decide whether the OS is still allowed to drive the theme.
export function hasStoredMode() {
  return readStoredMode() !== null
}

// KnowledgeSpace brand colors, shared by both modes.
const brand = {
  primary: {
    light: '#003e68',
    main: '#005995',
    dark: '#337aaa'
  },
  secondary: {
    light: '#f5ff66',
    main: '#bfd730',
    dark: '#8ba600'
  },
  dark: {
    light: '#4f4f4f',
    main: '#272727',
    dark: '#000000'
  }
}

const typography = {
  useNextVariants: true,
  fontFamily: '"Arial", "Helvetica", "Roboto", sans-serif'
}

// `type: 'dark'` seeds every palette token Material-UI v3 derives from
// (Paper/Card/Menu/Dialog backgrounds, text, divider, action states), so the
// explicit values below only need to adjust them to the KnowledgeSpace
// "same site at night" palette. `link`, `surfaceAlt` and `border` are custom
// tokens for surfaces Material-UI does not cover.
const lightTheme = createMuiTheme({
  palette: {
    ...brand,
    type: 'light',
    link: '#005995',
    surfaceAlt: '#e0e0e0',
    border: '#cccccc',
    textSecondary: '#626262'
  },
  typography
})

const darkTheme = createMuiTheme({
  palette: {
    ...brand,
    type: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E'
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#BDBDBD'
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    // The brand blue fails contrast on near-black, so links use a lighter
    // blue of the same hue while primary surfaces keep the brand color.
    link: '#64b5f6',
    surfaceAlt: '#242424',
    border: 'rgba(255, 255, 255, 0.16)',
    textSecondary: '#BDBDBD'
  },
  typography
})

const themes = {
  [LIGHT_MODE]: lightTheme,
  [DARK_MODE]: darkTheme
}

// Built once at module load so a toggle never rebuilds the theme objects.
export default function getTheme(mode) {
  return themes[mode] || themes[LIGHT_MODE]
}

export { lightTheme, darkTheme }
