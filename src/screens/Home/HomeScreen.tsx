import ClearIcon from '@mui/icons-material/Clear';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import ShareIcon from '@mui/icons-material/Share';
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import React, { Fragment } from 'react';
import { SpotifyAuth } from 'react-spotify-auth';
import { ArtistListComponent } from '../../components/ArtistList/ArtistListComponent';
import { InputComponent } from '../../components/Input/InputComponent';
import { TrackListComponent } from '../../components/TrackList/TrackListComponent';
import { PlaylistModal } from '../../modals/Playlist/PlaylistModal';
import styles from '../../theme/styles.module.css';
import { theme } from '../../theme/variables';
import { CLIENT_ID, REDIRECT_URI, SCOPES } from '../../utils/variables';
import { useHomeScreenRules } from './HomeScreen.rules';
import {
  ButtonComponent,
  CardComponent,
  ErrorMessage,
  Header,
  HomeContainer,
  ListContainer,
  LoginButtonContainer,
  SuccessMessage,
  TextContainer,
  TitleContainer
} from './HomeScreen.styles';
import { IHomeScreenProps } from './HomeScreen.types';

export const HomeScreen: React.FC<IHomeScreenProps> = () => {
  const {
    artistList,
    authToken,
    currentInput,
    currentQuantity,
    currentUser,
    handleExport,
    handleFormChange,
    handleOnSearch,
    handleOnSubmit,
    handleQuantity,
    handleSelect,
    isExportBusy,
    isModalVisible,
    isPlaylistBusy,
    isSearchBusy,
    isSuccess,
    playlist,
    playlistInfo,
    paylistUrl,
    quantityError,
    selectedArtists,
    setAuthToken,
    setCurrentInput,
    setIsModalVisible,
    setSelectedArtists,
    setSimilarArtists,
    similarArtists
  } = useHomeScreenRules();

  return (
    <HomeContainer>
      {isModalVisible && (
        <PlaylistModal
          open={isModalVisible}
          isBusy={isExportBusy}
          onChange={handleFormChange}
          values={playlistInfo}
          onHandleClose={() => setIsModalVisible(false)}
          onHandleSubmit={handleExport}
        />
      )}
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
        {!authToken ? (
          <Grid item xs={12}>
            <CardComponent elevation={3}>
              <Typography fontSize={64} fontWeight={800}>
                Seja bem-vindo ao Playlistify
              </Typography>
              <Grid container>
                <Grid
                  item
                  sm={12}
                  md={6}
                  style={{
                    textAlign: 'justify',
                    paddingRight: 16
                  }}
                >
                  <TextContainer>
                    <Typography fontSize={32} fontWeight={600}>
                      Quem sou eu?
                    </Typography>
                  </TextContainer>
                  <TextContainer>
                    <Typography fontSize='inherit'>
                      Eu sou uma IA criada com o prop??sito de tornar sua
                      experi??ncia musical ??nica!
                    </Typography>
                  </TextContainer>
                  <TextContainer>
                    <Typography fontSize='inherit'>
                      Voc?? pode me dizer quais artistas gostaria de escutar e eu
                      consigo montar uma playlist super legal pra voc??. Que tal?
                    </Typography>
                  </TextContainer>
                  <TextContainer>
                    <Typography fontSize='inherit'>
                      Mas antes de come??ar a explorar um novo jeito de ouvir
                      m??sica, preciso que voc?? fa??a login usando sua conta do
                      Spotify???.
                    </Typography>
                  </TextContainer>
                </Grid>
                <Grid item xs={1}>
                  <Box
                    style={{
                      width: '2px',
                      backgroundColor: 'white',
                      height: '100%'
                    }}
                  />
                </Grid>

                <Grid
                  item
                  sm={12}
                  md={5}
                  style={{
                    textAlign: 'justify',
                    paddingRight: 16
                  }}
                >
                  <LoginButtonContainer>
                    <TextContainer>
                      <Typography fontSize={32} fontWeight={600}>
                        Por favor, efetue o login
                      </Typography>
                    </TextContainer>
                    <SpotifyAuth
                      redirectUri={REDIRECT_URI.host}
                      clientID={CLIENT_ID}
                      scopes={SCOPES}
                      onAccessToken={(token: string) => setAuthToken(token)}
                      title='Continuar com Spotify'
                      btnClassName={styles.Button}
                      logoClassName={styles.Logo}
                      noCookie
                    />
                  </LoginButtonContainer>
                </Grid>
              </Grid>
            </CardComponent>
          </Grid>
        ) : (
          <Fragment>
            <Grid item sm={12} md={6}>
              <CardComponent elevation={3}>
                <Typography
                  fontSize={18}
                >{`Ol?? ${currentUser}, agora me fala quais artistas voc?? quer incluir na playlist`}</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={9}>
                    <InputComponent
                      label='Artista'
                      value={currentInput}
                      placeholder='Ex.: Madonna'
                      onChange={(value) => setCurrentInput(value)}
                      onSubmit={handleOnSearch}
                    />
                  </Grid>
                  <Grid item sm={12} md={3}>
                    <ButtonComponent
                      variant='contained'
                      onClick={handleOnSearch}
                      disabled={isSearchBusy || currentInput === ''}
                      startIcon={<SearchIcon />}
                    >
                      Buscar
                    </ButtonComponent>
                  </Grid>
                </Grid>

                {isSearchBusy && <CircularProgress style={{ margin: 10 }} />}

                {!isSearchBusy && artistList?.length > 0 && (
                  <ArtistListComponent
                    data={artistList}
                    handleSelect={handleSelect}
                  />
                )}
              </CardComponent>
            </Grid>

            <Grid item sm={12} md={6}>
              {!isPlaylistBusy && playlist?.length >= 1 && (
                <Grid item xs={12}>
                  <CardComponent elevation={3}>
                    {isSuccess ? (
                      <SuccessMessage>
                        <Typography>
                          Playlist exportada com sucesso! Voc?? pode acess??-la{' '}
                          <Link
                            href={paylistUrl}
                            underline='always'
                            color='inherit'
                            target='_blank'
                            style={{ fontWeight: 600, cursor: 'pointer' }}
                          >
                            aqui
                          </Link>
                        </Typography>
                      </SuccessMessage>
                    ) : (
                      <Fragment>
                        <Typography fontSize={24}>
                          {'Eba! Sua playlist t?? pronta :)'}
                        </Typography>
                        <Typography fontSize={18}>
                          Ah, e voc?? tamb??m pode exportar essa playlist para sua
                          conta do Spotify com apenas um clique!
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <ListContainer>
                              <Grid
                                container
                                spacing={2}
                                style={{ alignItems: 'center' }}
                              >
                                <Grid item xs={12} sm={6}>
                                  <Typography fontSize={32} fontWeight={600}>
                                    Playlist
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <ButtonComponent
                                    variant='contained'
                                    startIcon={<ShareIcon />}
                                    onClick={() => setIsModalVisible(true)}
                                  >
                                    Exportar
                                  </ButtonComponent>
                                </Grid>
                                <Grid item xs={12}>
                                  <TrackListComponent data={playlist} />
                                </Grid>
                              </Grid>
                            </ListContainer>
                          </Grid>
                        </Grid>
                      </Fragment>
                    )}
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
                            } artista(s), pode conter no m??ximo ${
                              selectedArtists.length * 10
                            } m??sicas.`}
                          </Typography>
                        </ErrorMessage>
                      </Grid>
                    )}

                    <Grid item sm={4} md={2}>
                      <FormControl style={{ width: '100%' }}>
                        <InputLabel style={{ color: `${theme.text.label}` }}>
                          M??sicas
                        </InputLabel>
                        <Select
                          label='M??sicas'
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
                    <Grid item sm={6} md={4}>
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
                      {isPlaylistBusy ? (
                        <CircularProgress style={{ margin: 10 }} />
                      ) : (
                        <ButtonComponent
                          variant='contained'
                          onClick={handleOnSubmit}
                          disabled={
                            selectedArtists.length <= 0 || quantityError
                          }
                          startIcon={<PlayCircleOutlineIcon />}
                        >
                          Gerar playlist
                        </ButtonComponent>
                      )}
                    </Grid>
                    <Grid item>
                      <Typography fontSize={24}>
                        Artistas selecionados
                      </Typography>
                    </Grid>
                    <Grid item>
                      <ButtonComponent
                        variant='contained'
                        onClick={() => setSelectedArtists([])}
                        disabled={selectedArtists.length <= 0}
                        startIcon={<ClearIcon />}
                        style={{ backgroundColor: `${theme.error.primary}` }}
                      >
                        Limpar sele????o
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
          </Fragment>
        )}
      </Grid>
    </HomeContainer>
  );
};
