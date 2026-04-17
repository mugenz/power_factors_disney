export interface DisneyCharacter {
  _id: number;
  name: string;
  tvShows: string[];
  videoGames: string[];
  films: string[];
  shortFilms: string[];
  allies: string[];
  enemies: string[];
  imageUrl: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiInfo {
  totalPages: number;
  count: number;
  previousPage: string | null;
  nextPage: string | null;
}

export interface ApiResponse {
  info: ApiInfo;
  data: DisneyCharacter[];
}

export type SortOrder = 'asc' | 'desc' | null;

export interface CharacterFilters {
  page: number;
  pageSize: number;
  search: string;
  tvShowFilter: string;
}
