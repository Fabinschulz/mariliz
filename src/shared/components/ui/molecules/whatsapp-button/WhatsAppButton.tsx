import { Button, type ButtonProps } from '@synthra.io/ui-kit';

import { externalLinkProps, whatsappUrl } from '@/shared/utils';

import { WhatsAppIcon } from '../../atoms/whatsapp-icon';
import { PillLink } from '../pill-link';

export interface WhatsAppButtonProps extends Omit<ButtonProps, 'href' | 'startIcon' | 'target' | 'rel'> {
  /** Mensagem pré-preenchida; sem ela, usa a mensagem padrão do site. */
  message?: string;
}

/** CTA de contato que abre o WhatsApp em nova aba; `contained` usa a pílula padrão. */
export function WhatsAppButton({
  message,
  children = 'Conversar no WhatsApp',
  variant = 'contained',
  color,
  ...rest
}: WhatsAppButtonProps) {
  const href = whatsappUrl(message);
  const label = (
    <>
      {children}
      <span className="visually-hidden"> (abre o WhatsApp em nova aba)</span>
    </>
  );

  if (variant === 'contained') {
    return (
      <PillLink href={href} {...externalLinkProps} icon={<WhatsAppIcon />} {...rest}>
        {label}
      </PillLink>
    );
  }

  return (
    <Button href={href} {...externalLinkProps} variant={variant} color={color} startIcon={<WhatsAppIcon />} {...rest}>
      {label}
    </Button>
  );
}
