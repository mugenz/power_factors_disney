import { useQuery } from '@tanstack/react-query';
import { fetchCharacters, type FetchCharactersParams } from '../api/disneyApi';

export const characterKeys = {
  all: ['characters'] as const,
  list: (params: FetchCharactersParams) => [...characterKeys.all, params] as const,
};

const useCharacters = (params: FetchCharactersParams) => {
  return useQuery({
    queryKey: characterKeys.list(params),
    queryFn: () => fetchCharacters(params),
    placeholderData: (previousData) => previousData,
  });
};

export default useCharacters;
