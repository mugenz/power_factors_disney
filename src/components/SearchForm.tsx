import { CloseIcon, SearchIcon, TvShowIcon } from "./icons";

interface SearchFormProps {
  search: string;
  tvShowFilter: string;
  onSearchChange: (value: string) => void;
  onTvShowChange: (value: string) => void;
}

const SearchForm = ({ search, tvShowFilter, onSearchChange, onTvShowChange }: SearchFormProps) => {
  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
      <div className="relative flex-1">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-gray-400">
          <SearchIcon className="h-4 w-4" />
        </span>
        <input
          type="text"
          placeholder="Search characters..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-slate-700 dark:text-gray-400 dark:hover:text-white"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="relative flex-1">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-gray-400">
          <TvShowIcon className="h-4 w-4" />
        </span>
        <input
          type="text"
          placeholder="Filter by TV show..."
          value={tvShowFilter}
          onChange={(e) => onTvShowChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
        />
        {tvShowFilter && (
          <button
            type="button"
            onClick={() => onTvShowChange("")}
            className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-slate-700 dark:text-gray-400 dark:hover:text-white"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchForm;
