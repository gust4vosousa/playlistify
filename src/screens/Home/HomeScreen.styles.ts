import { Box, Button, Card, styled } from '@mui/material';
import { theme } from '../../theme/ThemeVariables';

export const HomeContainer = styled(Box)({
  backgroundColor: `${theme.background.primary}`,
  color: `${theme.text.primary}`,
  minHeight: '100vh',
  height: '100%',
  paddingHorizontal: 32,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

export const Header = styled(Box)({
  backgroundColor: `${theme.main.primary}`,
  color: `${theme.text.primary}`,
  textAlign: 'center',
  marginBottom: 16,
  width: '100%'
});

export const TitleContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 8
});

export const CardComponent = styled(Card)({
  backgroundColor: `${theme.background.secondary}`,
  color: `${theme.text.primary}`,
  textAlign: 'center',
  padding: 32,
  margin: 16,
  minHeight: 80
});

export const ButtonComponent = styled(Button)({
  color: `${theme.text.primary}`,
  margin: 8
});

export const ErrorMessage = styled(Card)({
  display: 'flex',
  backgroundColor: `${theme.error.primary}`,
  height: '3rem',
  color: `${theme.text.primary}`,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 16
});

export const TextContainer = styled(Box)({
  margin: '16px 8px',
  fontSize: 22
});

export const LoginButtonContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  flexDirection: 'column'
});

export const ListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: `${theme.background.light}`,
  padding: '16px 16px',
  borderRadius: 8,
  marginTop: 28,
  alignItems: 'center'
});
