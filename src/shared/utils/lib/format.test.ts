import { formatOrdinal, pluralize } from './format';

describe('formatOrdinal', () => {
  it('numera a partir de 1 com dois dígitos', () => {
    expect(formatOrdinal(0)).toBe('01');
    expect(formatOrdinal(11)).toBe('12');
  });
});

describe('pluralize', () => {
  it('usa o singular só para 1', () => {
    expect(pluralize(1, 'resultado', 'resultados')).toBe('1 resultado');
    expect(pluralize(0, 'resultado', 'resultados')).toBe('0 resultados');
    expect(pluralize(5, 'resultado', 'resultados')).toBe('5 resultados');
  });
});
