import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';

/** Glifo do Instagram, na mesma API e com a mesma regra de acessibilidade do `WhatsAppIcon`. */
export function InstagramIcon(props: SvgIconProps) {
  return (
    <SvgIcon aria-hidden focusable="false" viewBox="0 0 24 24" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.25" />
    </SvgIcon>
  );
}
