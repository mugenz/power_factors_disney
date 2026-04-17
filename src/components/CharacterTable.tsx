import { useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon, SortAscendingIcon, SortDefaultIcon, SortDescendingIcon } from "./icons";
import type { DisneyCharacter, SortOrder } from "../types/disney";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100, 200, 500];

interface CharacterTableProps {
  characters: DisneyCharacter[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  sortOrder: SortOrder;
  isLoading: boolean;
  isFetching: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSortToggle: () => void;
  onRowClick: (character: DisneyCharacter) => void;
}

const CharacterTable = ({
  characters,
  totalPages,
  currentPage,
  pageSize,
  sortOrder,
  isLoading,
  isFetching,
  onPageChange,
  onPageSizeChange,
  onSortToggle,
  onRowClick,
}: CharacterTableProps) => {
  const sortedCharacters = useMemo(() => {
    if (!sortOrder) return characters;
    return [...characters].sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
  }, [characters, sortOrder]);

  const sortIcon =
    sortOrder === null ? (
      <SortDefaultIcon className="h-4 w-4 text-slate-400 dark:text-gray-500" />
    ) : sortOrder === "asc" ? (
      <SortAscendingIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
    ) : (
      <SortDescendingIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
    );

  const formatList = (items: string[]) => {
    if (!items || items.length === 0) {
      return <span className="text-slate-400 dark:text-gray-600">—</span>;
    }
    return (
      <div className="flex flex-wrap gap-1">
        {items.slice(0, 3).map((item, i) => (
          <span
            key={i}
            className="inline-block rounded bg-slate-200 px-1.5 py-0.5 text-xs leading-tight text-slate-700 dark:bg-gray-700 dark:text-gray-300"
          >
            {item}
          </span>
        ))}
        {items.length > 3 && (
          <span className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-xs leading-tight text-slate-500 dark:bg-gray-800 dark:text-gray-500">
            +{items.length - 3} more
          </span>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          <p className="text-sm text-slate-500 dark:text-gray-400">Loading characters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-x-auto rounded-xl border border-slate-200 dark:border-gray-800">
        {isFetching && !isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/60 dark:bg-gray-950/50">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          </div>
        )}

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-500 dark:bg-gray-800/80 dark:text-gray-400">
            <tr>
              <th className="w-10 px-4 py-3">#</th>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={onSortToggle}
                  className="group flex items-center gap-1.5 transition hover:text-slate-900 dark:hover:text-white"
                >
                  Name
                  {sortIcon}
                </button>
              </th>
              <th className="px-4 py-3 text-center">TV Shows</th>
              <th className="px-4 py-3 text-center">Video Games</th>
              <th className="px-4 py-3 text-center">Allies</th>
              <th className="px-4 py-3 text-center">Enemies</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-gray-800 dark:bg-gray-900/40">
            {sortedCharacters.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-slate-500 dark:text-gray-500">
                  No characters found.
                </td>
              </tr>
            ) : (
              sortedCharacters.map((character, index) => (
                <tr
                  key={character._id}
                  onClick={() => onRowClick(character)}
                  className="cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-gray-800/60"
                >
                  <td className="px-4 py-3 text-xs text-slate-400 dark:text-gray-600">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      {character.imageUrl ? (
                        <img
                          src={character.imageUrl}
                          alt={character.name}
                          className="h-8 w-8 shrink-0 rounded-full bg-slate-200 object-cover dark:bg-gray-800"
                        />
                      ) : (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-gray-800">
                          <span className="text-xs text-slate-500 dark:text-gray-500">{character.name[0]}</span>
                        </div>
                      )}
                      <span className="font-medium text-slate-900 dark:text-white">{character.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex h-6 w-8 items-center justify-center rounded text-xs font-semibold ${
                        character.tvShows.length > 0
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                          : "text-slate-400 dark:text-gray-600"
                      }`}
                    >
                      {character.tvShows.length}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex h-6 w-8 items-center justify-center rounded text-xs font-semibold ${
                        character.videoGames.length > 0
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
                          : "text-slate-400 dark:text-gray-600"
                      }`}
                    >
                      {character.videoGames.length}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">{formatList(character.allies)}</td>
                  <td className="px-4 py-3 text-center">{formatList(character.enemies)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 px-1 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-gray-500">
            Page <span className="font-medium text-slate-900 dark:text-white">{currentPage}</span> of{" "}
            <span className="font-medium text-slate-900 dark:text-white">{totalPages || 1}</span>
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Prev
            </button>
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= (totalPages || 1)}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Next
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterTable;
