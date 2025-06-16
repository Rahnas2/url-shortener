import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// Create the styled component
export const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--color-accent)',
      opacity: '50%'
    },
    '&:hover fieldset': {
      borderColor: 'var(--color-accent)',
      opacity: 0.8,
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--color-accent)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'var(--color-accent)',
    opacity: '50%'
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--color-accent)',
    opacity: '100%'
  },
  '& .MuiOutlinedInput-input': {
    color: '#ffffff', // Input text color
  },
  '& .MuiInputBase-input': {
    color: '#ffffff', // Alternative/fallback for input text
  },
  // Optional: Placeholder text color
  '& .MuiOutlinedInput-input::placeholder': {
    color: 'var(--color-accent)', // Placeholder color
    opacity: 0.7,
  },
});