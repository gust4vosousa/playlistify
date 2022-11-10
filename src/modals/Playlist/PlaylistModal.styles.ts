import { Box, styled } from '@mui/material';
import { theme } from '../../theme/variables';

export const ModalContainer = styled(Box)({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: `${theme.background.light}`,
  color: `${theme.text.primary}`,
  border: 'none',
  borderRadius: '8px',
  padding: 32
});

export const ButtonContainer = styled(Box)({
  backgroundColor: `${theme.main.primary}`,
  margin: 8,
  paddingRight: 8,
  paddingLeft: 8,
  borderRadius: 4
});
