import { Box, styled } from '@mui/material';
import { theme } from '../../theme/ThemeVariables';

export const ItemContainer = styled(Box)({
  padding: 8,
  borderRadius: 8,
  '&:hover': {
    backgroundColor: `${theme.main.primary}`
  }
});
