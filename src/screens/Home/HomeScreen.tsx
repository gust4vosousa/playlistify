import {
  MenuItem,
  Select,
  Typography,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { InputComponent } from '../../components/Input/InputComponent';
import { useHomeScreenRules } from './HomeScreen.rules';
import {
  HomeContainer,
  Header,
  ButtonComponent,
  CardComponent,
  TitleContainer
} from './HomeScreen.styles';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { ArtistListComponent } from '../../components/List/ListComponent';
import ClearIcon from '@mui/icons-material/Clear';
import { theme } from '../../theme/ThemeVariables';

export const HomeScreen = () => {
  const {
    artistList,
    isSearchBusy,
    handleInput,
    handleOnSearch,
    handleSelect,
    selectedArtists,
    currentInput,
    setSelectedArtists,
    handleQuantity,
    currentQuantity,
    similarArtists,
    setSimilarArtists
  } = useHomeScreenRules();

  return (
    <HomeContainer>
      <Header>
        <TitleContainer>
          <Typography fontSize={32}>Playlistify</Typography>
        </TitleContainer>
      </Header>

      <Grid container spacing={0}>
        <Grid item xs={6}>
          <CardComponent elevation={3}>
            <Typography>
              Busque pelos artistas que gostaria de incluir
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={9}>
                <InputComponent
                  label='Artista'
                  value={currentInput}
                  onChange={handleInput}
                  onSubmit={handleOnSearch}
                />
              </Grid>
              <Grid item xs={2}>
                <ButtonComponent
                  variant='contained'
                  onClick={handleOnSearch}
                  disabled={isSearchBusy}
                  startIcon={<SearchIcon />}
                >
                  Buscar
                </ButtonComponent>
              </Grid>
            </Grid>

            {artistList.length > 0 && (
              <ArtistListComponent
                data={artistList}
                handleSelect={handleSelect}
              />
            )}
          </CardComponent>
        </Grid>

        <Grid item xs={6}>
          <Grid item xs={12} spacing={2}>
            <CardComponent elevation={3}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <FormControl style={{ width: '100%' }}>
                    <InputLabel style={{ color: `${theme.text.label}` }}>
                      Músicas
                    </InputLabel>
                    <Select
                      label='Músicas'
                      value={currentQuantity}
                      onChange={(event) =>
                        handleQuantity(Number(event.target.value))
                      }
                      sx={{
                        color: `${theme.text.primary} !important`
                      }}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={similarArtists}
                        onChange={() => setSimilarArtists(!similarArtists)}
                      />
                    }
                    label='Artistas similares'
                  />
                </Grid>
                <Grid item xs={6}>
                  <ButtonComponent
                    variant='contained'
                    onClick={() => null}
                    disabled={selectedArtists.length <= 0}
                    startIcon={<SendIcon />}
                  >
                    Gerar playlist
                  </ButtonComponent>
                </Grid>
              </Grid>
            </CardComponent>
          </Grid>

          <Grid item xs={12}>
            <CardComponent elevation={3}>
              <Grid
                container
                spacing={2}
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Grid item>
                  <Typography fontSize={24}>Artistas selecionados</Typography>
                </Grid>
                <Grid item>
                  <ButtonComponent
                    variant='contained'
                    onClick={() => setSelectedArtists([])}
                    disabled={selectedArtists.length <= 0}
                    startIcon={<ClearIcon />}
                  >
                    Limpar seleção
                  </ButtonComponent>
                </Grid>
              </Grid>
              {selectedArtists.length > 0 ? (
                <ArtistListComponent
                  data={selectedArtists}
                  handleSelect={handleSelect}
                />
              ) : (
                <Typography>Nenhum artista selecionado</Typography>
              )}
            </CardComponent>
          </Grid>
        </Grid>
      </Grid>
    </HomeContainer>
  );
};
