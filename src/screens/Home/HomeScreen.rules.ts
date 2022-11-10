import { useCallback, useMemo, useState } from 'react';
import { IArtist, ITrack } from '../../@types/Entity.types';
import { useSpotifyServicesHook } from '../../hooks/spotifyServices/useSpotifyServicesHook';
import Cookies from 'js-cookie';
import { IPostPlaylistRequest } from '../../hooks/spotifyServices/useSpotifyServicesHook.types';
import { sleep } from '../../utils/sleep';

export const useHomeScreenRules = () => {
  const [authToken, setAuthToken] = useState(Cookies.get('spotifyAuthToken'));
  const [currentInput, setCurrentInput] = useState<string>('');
  const [currentQuantity, setCurrentQuantity] = useState<number>(10);
  const [similarArtists, setSimilarArtists] = useState<boolean>(false);
  const [isSearchBusy, setIsSearchBusy] = useState<boolean>(false);
  const [isPlaylistBusy, setIsPlaylistBusy] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<IArtist[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<IArtist[]>([]);
  const [playlist, setPlaylist] = useState<ITrack[]>([]);

  const spotifyServices = useSpotifyServicesHook(authToken);

  const quantityError = useMemo(
    () =>
      !similarArtists &&
      selectedArtists.length >= 1 &&
      selectedArtists.length * 10 < currentQuantity
        ? true
        : false,
    [currentQuantity, selectedArtists.length, similarArtists]
  );

  const handleExport = useCallback(
    async (formData: IPostPlaylistRequest) => {
      const playlistId = await spotifyServices.createPlaylist(formData);
      await spotifyServices.addItemsToPlaylist(
        playlistId!,
        playlist.map((track) => track.uri)
      );
    },
    [playlist, spotifyServices]
  );

  const handleOnSearch = useCallback(async () => {
    setIsSearchBusy(true);

    const artistList = await spotifyServices.searchArtists(currentInput);

    setSearchResult(artistList?.artists?.items!);
    setIsSearchBusy(false);
  }, [currentInput, spotifyServices]);

  const handleInput = useCallback((value: string) => {
    setCurrentInput(value);
    sleep(2000).then(() => handleOnSearch)
  }, [handleOnSearch]);

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
    try {
      setIsPlaylistBusy(true);
      setPlaylist([]);

      const trackList = await handleTrackList();
      const playlistData = preparePlaylist(trackList);

      setPlaylist(playlistData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPlaylistBusy(false);
    }
  }, [handleTrackList, preparePlaylist]);

  return {
    currentInput,
    artistList: searchResult,
    isSearchBusy,
    handleInput,
    handleOnSearch,
    handleSelect,
    selectedArtists,
    setSelectedArtists,
    handleQuantity,
    currentQuantity,
    similarArtists,
    setSimilarArtists,
    handleOnSubmit,
    playlist,
    isPlaylistBusy,
    quantityError,
    setAuthToken,
    authToken,
    handleExport,
    isModalVisible,
    setIsModalVisible
  };
};
