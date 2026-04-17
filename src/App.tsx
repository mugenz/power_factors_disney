import { useState } from 'react';
import useCharacters from './hooks/useCharacters';
import useDebounce from './hooks/useDebounce';
import SearchForm from './components/SearchForm';
import CharacterTable from './components/CharacterTable';
import CharacterModal from './components/CharacterModal';
import FilmsPieChart from './components/FilmsPieChart';
import ThemeToggle from './components/ThemeToggle';
import type { DisneyCharacter, SortOrder } from './types/disney';

const DEFAULT_PAGE_SIZE = 50;

const App = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchInput, setSearchInput] = useState('');
  const [tvShowInput, setTvShowInput] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<DisneyCharacter | null>(null);

  const debouncedSearch = useDebounce(searchInput, 400);
  const debouncedTvShow = useDebounce(tvShowInput, 400);

  const { data, isLoading, isFetching, isError } = useCharacters({
    page,
    pageSize,
    search: debouncedSearch,
    tvShow: debouncedTvShow,
  });

  const characters = data?.data ?? [];
  const totalPages = data?.info.totalPages ?? 1;

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handleTvShowChange = (value: string) => {
    setTvShowInput(value);
    setPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  const handleSortToggle = () => {
    setSortOrder((prev) => {
      if (prev === null) return 'asc';
      if (prev === 'asc') return 'desc';
      return null;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-gray-950 dark:text-white">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto flex max-w-screen-2xl items-center gap-3 px-5 py-4">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight text-slate-900 dark:text-white">Disney Dashboard</h1>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-gray-500">Character Explorer</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {data && (
              <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500">
                {data.info.count.toLocaleString()} characters
              </span>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-screen-2xl flex-col gap-6 px-5 py-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">Search & Filter</h2>
            {(searchInput || tvShowInput) && (
              <div className="flex gap-2">
                {searchInput && (
                  <span className="flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs text-blue-800 dark:border-blue-800/50 dark:bg-blue-900/40 dark:text-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                    {searchInput}
                  </span>
                )}
                {tvShowInput && (
                  <span className="flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs text-purple-800 dark:border-purple-800/50 dark:bg-purple-900/40 dark:text-purple-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.868V15.13a1 1 0 01-1.447.899L15 14M4 8h11a1 1 0 011 1v6a1 1 0 01-1 1H4a2 2 0 01-2-2v-4a2 2 0 012-2z" />
                    </svg>
                    {tvShowInput}
                  </span>
                )}
              </div>
            )}
          </div>
          <SearchForm
            search={searchInput}
            tvShowFilter={tvShowInput}
            onSearchChange={handleSearchChange}
            onTvShowChange={handleTvShowChange}
          />
        </div>

        {isError ? (
          <div className="flex h-64 flex-col items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-medium text-red-600 dark:text-red-400">Failed to load characters</p>
            <p className="text-sm text-slate-500 dark:text-gray-600">Check your connection and try again.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="min-w-0 flex-1">
              <CharacterTable
                characters={characters}
                totalPages={totalPages}
                currentPage={page}
                pageSize={pageSize}
                sortOrder={sortOrder}
                isLoading={isLoading}
                isFetching={isFetching}
                onPageChange={setPage}
                onPageSizeChange={handlePageSizeChange}
                onSortToggle={handleSortToggle}
                onRowClick={setSelectedCharacter}
              />
            </div>

            <div className="w-full flex-shrink-0 xl:w-96">
              <FilmsPieChart characters={characters} />
            </div>
          </div>
        )}
      </main>

      <CharacterModal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
    </div>
  );
};

export default App;
