import { render } from '@testing-library/react';
import Loading from './Loading';

describe('Loading Component', () => {
  it('debería renderizar el mensaje "Loading..."', () => {
    const { getByText } = render(<Loading />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
