import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomButton = styled(Button)({
  backgroundColor: 'var(--color-accent)',
  color: 'var(--color-primary)',

  '&.MuiLoadingButton-loading': {
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-primary)',
  },

  '& .MuiLoadingButton-loadingIndicator': {
    color: 'var(--color-accent)',
  },
});
