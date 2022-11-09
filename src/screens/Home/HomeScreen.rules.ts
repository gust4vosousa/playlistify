import { useCallback, useEffect, useMemo, useState } from 'react';
import { IArtist, ITrack } from '../../@types/Entity.types';
import { useGetArtistsHook } from '../../hooks/getArtists/useGetArtistsHook';
import { useGetAuth } from '../../hooks/getAuth/useGetAuthHook';
import { IAuthProps } from '../../hooks/getAuth/useGetAuthHook.types';

export const useHomeScreenRules = () => {
  const [auth, setAuth] = useState<IAuthProps>();
  const [currentInput, setCurrentInput] = useState<string>('');
  const [currentQuantity, setCurrentQuantity] = useState<number>(10);
  const [similarArtists, setSimilarArtists] = useState<boolean>(false);
  const [isSearchBusy, setIsSearchBusy] = useState<boolean>(false);
  const [isPlaylistBusy, setIsPlaylistBusy] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<IArtist[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<IArtist[]>([]);
  const [playlist, setPlaylist] = useState<ITrack[]>([]);

  const authProps = useGetAuth();
  const getArtistsHook = useGetArtistsHook(auth);

  useEffect(() => {
    async function getAuth() {
      const props = await authProps;
      setAuth(props);
    }

    getAuth();
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

  const handleInput = useCallback((value: string) => {
    setCurrentInput(value);
  }, []);

  const handleQuantity = useCallback((value: number) => {
    setCurrentQuantity(value);
  }, []);

  const handleOnSearch = useCallback(async () => {
    setIsSearchBusy(true);

    const artistList = await getArtistsHook.searchArtists(currentInput);

    setSearchResult(artistList?.artists?.items!);
    setIsSearchBusy(false);
  }, [currentInput, getArtistsHook]);

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
      const list = await getArtistsHook.getRelatedArtists(artist.id);
      return list!;
    });

    const data = await Promise.all(relatedList);

    return data.flat(1);
  }, [getArtistsHook, selectedArtists]);

  const handleTopTracks = useCallback(
    async (data: IArtist[]) => {
      console.log(data[0].name);

      const topTracks = data.map(async (artist) => {
        const tracks = await getArtistsHook.getArtistTopTracks(artist.id);
        return tracks!;
      });

      const trackList = await Promise.all(topTracks);

      return trackList.flat(1);
    },
    [getArtistsHook]
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

      const playlistData = [...selected, ...filtered];

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
    quantityError
  };
};
