import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';

import { services } from '../domain';
import { ServiceTabs } from './service-tabs';

function renderTabs() {
  const router = createMemoryRouter([{ path: '/', element: <ServiceTabs services={services} /> }]);
  return render(<RouterProvider router={router} />);
}

describe('ServiceTabs', () => {
  it('mostra só o painel da primeira frente ao carregar', () => {
    renderTabs();
    const [first, second] = screen.getAllByRole('tab');

    expect(first).toHaveAttribute('aria-selected', 'true');
    expect(second).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName(services[0]!.shortName);
  });

  it('troca de painel ao clicar numa aba', async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByRole('tab', { name: services[2]!.shortName }));

    expect(screen.getByRole('tabpanel')).toHaveAccessibleName(services[2]!.shortName);
    expect(screen.getByRole('heading', { name: services[2]!.name })).toBeVisible();
  });

  it('navega pelas abas com as setas, Home e End (foco móvel)', async () => {
    const user = userEvent.setup();
    renderTabs();
    const tabs = screen.getAllByRole('tab');
    const last = tabs.length - 1;

    await user.click(tabs[0]!);
    await user.keyboard('{ArrowLeft}');
    expect(tabs[last]).toHaveFocus();
    expect(tabs[last]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{Home}');
    expect(tabs[0]).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('tabindex', '0');
    expect(tabs[0]).toHaveAttribute('tabindex', '-1');

    await user.keyboard('{End}');
    expect(tabs[last]).toHaveFocus();
  });
});
