import StyledButton from './StyledButton';
import { forwardRef } from 'react';

const Button = forwardRef(({ handleLoadMore }, ref) => {
  return (
    <StyledButton ref={ref} type="button" onClick={handleLoadMore}>
      Load more
    </StyledButton>
  );
});

export default Button;
