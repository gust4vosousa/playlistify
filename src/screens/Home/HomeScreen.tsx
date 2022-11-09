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
  TitleContainer,
  ErrorMessage
} from './HomeScreen.styles';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@material-ui/core';
import { ArtistListComponent } from '../../components/ArtistList/ArtistListComponent';
import ClearIcon from '@mui/icons-material/Clear';
import { theme } from '../../theme/ThemeVariables';
import { TrackListComponent } from '../../components/TrackList/TrackListComponent';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

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
    setSimilarArtists,
    handleOnSubmit,
    playlist,
    isPlaylistBusy,
    quantityError
  } = useHomeScreenRules();

  return (
    <HomeContainer>
      <Header>
        <TitleContainer>
          <Typography
            fontSize={32}
            style={{ paddingRight: 8, cursor: 'arrow' }}
          >
            Playlistify
          </Typography>
          <LibraryMusicIcon fontSize='large' />
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
          {playlist.length >= 1 && (
            <Grid item xs={12}>
              <CardComponent elevation={3}>
                <Typography fontSize={24}>Playlist</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TrackListComponent data={playlist} />
                  </Grid>
                </Grid>
              </CardComponent>
            </Grid>
          )}

          <Grid item xs={12}>
            <CardComponent elevation={3}>
              <Grid
                container
                spacing={2}
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                {quantityError && (
                  <Grid item xs={12}>
                    <ErrorMessage>
                      <Typography>
                        {`Uma playlist com ${
                          selectedArtists.length
                        } artista(s), pode conter no máximo ${
                          selectedArtists.length * 10
                        } músicas.`}
                      </Typography>
                    </ErrorMessage>
                  </Grid>
                )}

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
                      <MenuItem value={30}>30</MenuItem>
                      <MenuItem value={40}>40</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={60}>60</MenuItem>
                      <MenuItem value={70}>70</MenuItem>
                      <MenuItem value={80}>80</MenuItem>
                      <MenuItem value={90}>90</MenuItem>
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
                    label='Incluir artistas similares'
                  />
                </Grid>
                <Grid item xs={6}>
                  <ButtonComponent
                    variant='contained'
                    onClick={handleOnSubmit}
                    disabled={
                      selectedArtists.length <= 0 ||
                      isPlaylistBusy ||
                      quantityError
                    }
                    startIcon={<PlayCircleOutlineIcon />}
                  >
                    Gerar playlist
                  </ButtonComponent>
                </Grid>
                <Grid item>
                  <Typography fontSize={24}>Artistas selecionados</Typography>
                </Grid>
                <Grid item>
                  <ButtonComponent
                    variant='contained'
                    onClick={() => setSelectedArtists([])}
                    disabled={selectedArtists.length <= 0}
                    startIcon={<ClearIcon />}
                    style={{ backgroundColor: `${theme.error.primary}` }}
                  >
                    Limpar seleção
                  </ButtonComponent>
                </Grid>
              </Grid>
              {selectedArtists.length > 0 ? (
                <ArtistListComponent
                  data={selectedArtists}
                  handleSelect={handleSelect}
                  editable
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
