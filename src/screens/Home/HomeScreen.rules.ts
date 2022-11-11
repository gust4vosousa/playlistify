import { useCallback, useEffect, useMemo, useState } from 'react';
import { IArtist, ITrack } from '../../@types/Entity.types';
import { useSpotifyServicesHook } from '../../hooks/spotifyServices/useSpotifyServicesHook';
import { IPostPlaylistRequest } from '../../hooks/spotifyServices/useSpotifyServicesHook.types';
import { EFormFields } from '../../modals/Playlist/PlaylistModal.types';

const PLAYLIST_INFO_INITIAL_STATE: IPostPlaylistRequest = {
  name: '',
  public: false,
  description: ''
};

export const useHomeScreenRules = () => {
  const [authToken, setAuthToken] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<string>('');
  const [currentInput, setCurrentInput] = useState<string>('');
  const [lastSearch, setLastSearch] = useState<string>('');
  const [paylistUrl, setPlaylistUrl] = useState<string>('');
  const [currentQuantity, setCurrentQuantity] = useState<number>(10);
  const [similarArtists, setSimilarArtists] = useState<boolean>(false);
  const [isSearchBusy, setIsSearchBusy] = useState<boolean>(false);
  const [isPlaylistBusy, setIsPlaylistBusy] = useState<boolean>(false);
  const [isExportBusy, setIsExportBusy] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<IArtist[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<IArtist[]>([]);
  const [playlist, setPlaylist] = useState<ITrack[]>([]);
  const [playlistInfo, setPlaylistInfo] = useState<IPostPlaylistRequest>(
    PLAYLIST_INFO_INITIAL_STATE
  );

  const spotifyServices = useSpotifyServicesHook(authToken);

  const getCurrentUser = useCallback(async () => {
    const user = await spotifyServices.getUser();
    setCurrentUser(user?.display_name ?? '');
  }, [spotifyServices]);

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const quantityError = useMemo(
    () =>
      !similarArtists &&
      selectedArtists.length >= 1 &&
      selectedArtists.length * 10 < currentQuantity
        ? true
        : false,
    [currentQuantity, selectedArtists.length, similarArtists]
  );

  const handleFormChange = useCallback(
    (value: string | boolean, field: EFormFields) => {
      setPlaylistInfo({ ...playlistInfo, [field]: value });
    },
    [playlistInfo]
  );

  const handleExport = useCallback(async () => {
    setIsExportBusy(true);

    const description =
      playlistInfo.description.length > 0
        ? playlistInfo.description
        : 'Playlist gerada automaticamente pelo Playlistify';

    const playlistPostRequestData: IPostPlaylistRequest = {
      name: playlistInfo.name,
      public: playlistInfo.public,
      description
    };

    const createdPlaylist = await spotifyServices.createPlaylist(
      playlistPostRequestData
    );

    await spotifyServices.addItemsToPlaylist(
      createdPlaylist?.id!,
      playlist.map((track) => track.uri)
    );

    setPlaylistUrl(createdPlaylist?.external_urls.spotify!);
    setPlaylistInfo(PLAYLIST_INFO_INITIAL_STATE);
    setIsModalVisible(false);
    setIsExportBusy(false);
    setIsSuccess(true);
  }, [
    playlist,
    playlistInfo.description,
    playlistInfo.name,
    playlistInfo.public,
    spotifyServices
  ]);

  const handleOnSearch = useCallback(async () => {
    if (lastSearch === currentInput) {
      return;
    }

    setIsSearchBusy(true);

    const artistList = await spotifyServices.searchArtists(currentInput);

    setLastSearch(currentInput);
    setSearchResult(artistList?.artists?.items!);
    setIsSearchBusy(false);
  }, [currentInput, lastSearch, spotifyServices]);

  const handleQuantity = useCallback((value: number) => {
    setCurrentQuantity(value);
  }, []);

  const handleSelect = useCallback(
    (artist: IArtist) => {
      if (selectedArtists.includes(artist)) {
        setSelectedArtists((prev) =>
          prev.filter((selected) => selected.id !== artist.id)
        );
        return;
      }

      setSelectedArtists((prev) => [...prev, artist]);
    },
    [selectedArtists]
  );

  const handleRelatedArtists = useCallback(async () => {
    const relatedList = selectedArtists.map(async (artist) => {
      const list = await spotifyServices.getRelatedArtists(artist.id);
      return list!;
    });

    const data = await Promise.all(relatedList);

    return data.flat(1);
  }, [spotifyServices, selectedArtists]);

  const handleTopTracks = useCallback(
    async (data: IArtist[]) => {
      const topTracks = data.map(async (artist) => {
        const tracks = await spotifyServices.getArtistTopTracks(artist.id);
        return tracks!;
      });

      const trackList = await Promise.all(topTracks);

      return trackList.flat(1);
    },
    [spotifyServices]
  );

  const shuffleList = useCallback((list: ITrack[]) => {
    const shuffler = (data: ITrack[]) => data.sort(() => Math.random() - 0.5);

    const list1 = shuffler(list);
    const list2 = shuffler(list1);
    const list3 = shuffler(list2);

    return list3;
  }, []);

  const handleTrackList = useCallback(async () => {
    if (similarArtists) {
      const relatedArtists = await handleRelatedArtists();
      const tracks = await handleTopTracks([
        ...relatedArtists,
        ...selectedArtists
      ]);

      return tracks;
    }

    const tracks = await handleTopTracks(selectedArtists);

    return tracks;
  }, [handleRelatedArtists, handleTopTracks, selectedArtists, similarArtists]);

  const preparePlaylist = useCallback(
    (tracks: ITrack[]) => {
      const selected = selectedArtists.map(
        (artist) => tracks.find((track) => track.artists[0].id === artist.id)!
      );

      const filtered = tracks.filter((track) => !selected.includes(track));

      const playlistData = [...selected, ...shuffleList(filtered)];

      return shuffleList(playlistData.slice(0, currentQuantity));
    },
    [currentQuantity, selectedArtists, shuffleList]
  );

  const handleOnSubmit = useCallback(async () => {
    setIsPlaylistBusy(true);
    setPlaylist([]);
    setIsSuccess(false);

    const trackList = await handleTrackList();
    const playlistData = preparePlaylist(trackList);

    setPlaylist(playlistData);
    setIsPlaylistBusy(false);
  }, [handleTrackList, preparePlaylist]);

  return {
    artistList: searchResult ?? [],
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
    playlist: playlist ?? [],
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
  };
};
