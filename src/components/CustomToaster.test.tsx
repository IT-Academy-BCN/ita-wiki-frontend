import { render } from '@testing-library/react';
import CustomToaster from './CustomToaster';

describe('CustomToaster Component', () => {
  it('debería renderizar el Toaster y los children', () => {
    const { getByText } = render(
      <CustomToaster>
        <div>Contenido del child</div>
      </CustomToaster>
    );
    expect(getByText('Contenido del child')).toBeInTheDocument();
  });
});
