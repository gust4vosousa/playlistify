import { Box, styled } from '@mui/material';
import { theme } from '../../theme/variables';

export const ItemContainer = styled(Box)({
  padding: 8,
  borderRadius: 8,
  '&:hover': {
    backgroundColor: `${theme.main.primary}`
  }
});
