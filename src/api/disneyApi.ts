import type { ApiResponse, DisneyCharacter } from "../types/disney";

const BASE_URL = "https://api.disneyapi.dev/character";

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

const normalizeToCharacterArray = (raw: unknown): DisneyCharacter[] => {
  if (Array.isArray(raw)) {
    return raw.filter((item): item is DisneyCharacter => isRecord(item) && typeof item._id === "number");
  }
  if (isRecord(raw) && typeof raw._id === "number") {
    return [raw as unknown as DisneyCharacter];
  }
  return [];
};

export interface FetchCharactersParams {
  page: number;
  pageSize: number;
  search?: string;
  tvShow?: string;
}

export const fetchCharacters = async ({
  page,
  pageSize,
  search,
  tvShow,
}: FetchCharactersParams): Promise<ApiResponse> => {
  const params = new URLSearchParams();

  if (search && search.trim()) {
    params.set("name", search.trim());
  }

  if (tvShow && tvShow.trim()) {
    params.set("tvShows", tvShow.trim());
  }

  params.set("page", String(page));
  params.set("pageSize", String(pageSize));

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch characters: ${response.statusText}`);
  }

  const json: unknown = await response.json();

  if (!isRecord(json) || !isRecord(json.info)) {
    throw new Error("Invalid characters API response");
  }

  const info = json.info as unknown as ApiResponse["info"];
  const data = normalizeToCharacterArray(json.data);

  return { info, data };
};
