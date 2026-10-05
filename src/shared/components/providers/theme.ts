import { alpha, type ThemeOptions } from '@mui/material/styles';
import { initializeTheme } from '@synthra.io/ui-kit';
import { brandPalette as c } from './brand-palette';
import { LinkBehavior } from './link-behavior';

export type Surface = 'dark' | 'light' | 'accent';

const FONT_SANS = "'Geist', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif";

/**
 * A Synthra calcula as variantes tipográficas com Lato antes de aplicar os
 * overrides; por isso a fonte é trocada variante a variante, não só na raiz.
 */
const TYPOGRAPHY_VARIANTS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2',
  'button', 'caption', 'overline', 'xg', 'xxxl', 'xxl'
] as const; // prettier-ignore

const typography = {
  fontFamily: FONT_SANS,
  ...Object.fromEntries(TYPOGRAPHY_VARIANTS.map((variant) => [variant, { fontFamily: FONT_SANS }]))
};

const primaryBySurface: Record<Surface, ThemeOptions['palette']> = {
  dark: {
    primary: { light: c.teal300, main: c.teal400, dark: c.teal500, contrastText: c.neutral975 },
    background: { default: c.neutral975, paper: c.neutral950 },
    text: { primary: c.neutral50, secondary: c.neutral350 },
    divider: c.neutral800,
    error: { main: c.errorDark },
    success: { main: c.successDark }
  },
  light: {
    primary: { light: c.teal400, main: c.teal700, dark: c.teal800, contrastText: c.white },
    background: { default: c.white, paper: c.white },
    text: { primary: c.neutral950, secondary: c.neutral600 },
    divider: c.neutral200,
    error: { main: c.errorLight },
    success: { main: c.successLight }
  },
  accent: {
    primary: { light: c.neutral800, main: c.neutral975, dark: c.neutral900, contrastText: c.neutral50 },
    background: { default: c.teal400, paper: c.teal400 },
    text: { primary: c.neutral975, secondary: c.teal900 },
    divider: c.teal700,
    error: { main: c.errorLight },
    success: { main: c.successLight }
  }
};

/**
 * Os overrides da Synthra são mesclados depois do createTheme: o MUI não
 * recalcula tons derivados. Todo tom usado pelos componentes é declarado aqui,
 * senão sobram os azuis padrão da biblioteca (action.*, brand.*, secondary).
 */
function paletteFor(surface: Surface): ThemeOptions['palette'] {
  const base = primaryBySurface[surface]!;
  const accent = { dark: c.teal400, light: c.teal700, accent: c.neutral975 }[surface];

  return {
    ...base,
    secondary: base.primary,
    brand: {
      lightest: alpha(c.teal400, 0.12),
      light: c.teal300,
      medium: c.teal400,
      dark: c.teal700,
      darkest: c.teal900
    },
    common: { black: c.black, white: c.white },
    action: {
      hover: alpha(accent, 0.06),
      selected: alpha(accent, 0.12),
      focus: alpha(accent, 0.16),
      disabledBackground: alpha(accent, 0.12),
      disabled: alpha(surface === 'dark' ? c.white : c.black, 0.38),
      active: alpha(accent, 0.56)
    }
  } as ThemeOptions['palette'];
}

function buildTheme(surface: Surface) {
  return initializeTheme({
    mode: surface === 'dark' ? 'dark' : 'light',
    overrides: {
      palette: paletteFor(surface),
      typography,
      shape: { borderRadius: 8 },
      components: {
        // Links e botões com `href` navegam pelo React Router (client-side, com prefetch).
        MuiLink: { defaultProps: { component: LinkBehavior } },
        MuiButtonBase: { defaultProps: { LinkComponent: LinkBehavior } },
        MuiButton: { defaultProps: { disableElevation: true } },
        MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
        // A borda padrão do MUI (23% de opacidade) fica abaixo de 3:1 (WCAG 1.4.11).
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: { borderColor: surface === 'dark' ? c.neutral500 : c.neutral400 }
          }
        }
      }
    }
  });
}

export const themes: Record<Surface, ReturnType<typeof buildTheme>> = {
  dark: buildTheme('dark'),
  light: buildTheme('light'),
  accent: buildTheme('accent')
};
