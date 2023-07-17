import StyledButton from './StyledButton';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Button = forwardRef(({ handleLoadMore }, ref) => {
  return (
    <StyledButton ref={ref} type="button" onClick={handleLoadMore}>
      Load more
    </StyledButton>
  );
});

export default Button;

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
