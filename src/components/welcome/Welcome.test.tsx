import { render } from '@testing-library/react';
import Welcome from './Welcome';
import { vi } from 'vitest';

vi.mock('../../hooks/useUser', () => ({
  useUser: () => ({ user: undefined }),
}));

describe('Welcome Component', () => {
  it('debería renderizar el mensaje de bienvenida sin usuario', () => {
    const { getByText } = render(<Welcome />);
    expect(getByText(/¡Bienvenido.*a la wiki de la IT Academy!/i)).toBeInTheDocument();
  });
});
