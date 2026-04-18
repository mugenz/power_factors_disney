import type { ApiInfo, DisneyCharacter } from "../types/disney";
import { fetchCharacters } from "./disneyApi";

const BASE = "https://api.disneyapi.dev/character";

const createInfo = (overrides: Partial<ApiInfo> = {}): ApiInfo => ({
  totalPages: 1,
  count: 1,
  previousPage: null,
  nextPage: null,
  ...overrides,
});

const createCharacter = (overrides: Partial<DisneyCharacter> = {}): DisneyCharacter => ({
  _id: 1,
  name: "Test Character",
  tvShows: [],
  videoGames: [],
  films: [],
  shortFilms: [],
  allies: [],
  enemies: [],
  imageUrl: "",
  url: "",
  createdAt: "",
  updatedAt: "",
  ...overrides,
});

describe("fetchCharacters", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const getRequestUrl = () => {
    expect(fetchMock).toHaveBeenCalledTimes(1);
    return fetchMock.mock.calls[0][0] as string;
  };

  const getSearchParams = () => {
    const url = getRequestUrl();
    expect(url.startsWith(`${BASE}?`)).toBe(true);
    return new URL(url).searchParams;
  };

  it("requests only page and pageSize when search and tvShow are empty", async () => {
    const info = createInfo({ totalPages: 3, count: 100 });
    const char = createCharacter({ _id: 10, name: "A" });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ info, data: [char] }),
    });

    await fetchCharacters({ page: 2, pageSize: 25, search: "", tvShow: "" });

    const params = getSearchParams();
    expect(params.get("page")).toBe("2");
    expect(params.get("pageSize")).toBe("25");
    expect(params.get("name")).toBeNull();
    expect(params.get("tvShows")).toBeNull();
  });

  it("rejects when response is not ok", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
      json: async () => ({}),
    });

    await expect(fetchCharacters({ page: 1, pageSize: 10 })).rejects.toThrow("Failed to fetch characters: Not Found");
  });

  it("returns info and normalized data array from API", async () => {
    const info = createInfo({ count: 2, totalPages: 1 });
    const a = createCharacter({ _id: 1, name: "One" });
    const b = createCharacter({ _id: 2, name: "Two" });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ info, data: [a, b] }),
    });

    const result = await fetchCharacters({ page: 1, pageSize: 50 });

    expect(result.info).toEqual(info);
    expect(result.data).toHaveLength(2);
    expect(result.data[0]).toMatchObject({ _id: 1, name: "One" });
    expect(result.data[1]).toMatchObject({ _id: 2, name: "Two" });
  });

  it("normalizes a single character object in data to a one-element array", async () => {
    const info = createInfo();
    const single = createCharacter({ _id: 99, name: "Solo" });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ info, data: single }),
    });

    const result = await fetchCharacters({ page: 1, pageSize: 50 });

    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toMatchObject({ _id: 99, name: "Solo" });
  });
});
