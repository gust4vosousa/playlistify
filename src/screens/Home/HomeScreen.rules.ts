import { useCallback, useEffect, useState } from 'react';
import { IArtist, IArtistList } from '../../@types/ArtistEntity.types';
import { searchArtists } from '../../services/Search/SearchService';

export const useHomeScreenRules = () => {
  const [currentInput, setCurrentInput] = useState<string>('');
  const [searchResult, setSearchResult] = useState<IArtistList | null>(null);
  const [isSearchBusy, setIsSearchBusy] = useState<boolean>(false);
  const [selectedArtists, setSelectedArtists] = useState<IArtist[]>([]);
  const [currentQuantity, setCurrentQuantity] = useState<number>(10);
  const [similarArtists, setSimilarArtists] = useState<boolean>(false);

  const handleInput = useCallback((value: string) => {
    setCurrentInput(value);
  }, []);

  const handleQuantity = useCallback((value: number) => {
    setCurrentQuantity(value);
  }, []);

  const handleOnSearch = useCallback(async () => {
    setIsSearchBusy(true);
    const artistData = await searchArtists(currentInput);
    setSearchResult(artistData);
    setIsSearchBusy(false);
  }, [currentInput]);

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

  useEffect(() => {
    console.log(selectedArtists);
  }, [selectedArtists]);

  return {
    currentInput,
    artistList: searchResult?.artists.items || [],
    isSearchBusy,
    handleInput,
    handleOnSearch,
    handleSelect,
    selectedArtists,
    setSelectedArtists,
    handleQuantity,
    currentQuantity,
    similarArtists,
    setSimilarArtists
  };
};
