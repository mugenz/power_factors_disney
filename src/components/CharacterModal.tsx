import { useEffect } from "react";
import { CloseIcon } from "./icons";
import type { DisneyCharacter } from "../types/disney";

interface CharacterModalProps {
  character: DisneyCharacter | null;
  onClose: () => void;
}

const ListSection = ({ title, items, color }: { title: string; items: string[]; color: string }) => (
  <div>
    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-500">{title}</h4>
    {items.length === 0 ? (
      <p className="text-sm text-slate-400 dark:text-gray-600">None</p>
    ) : (
      <ul className="custom-scrollbar max-h-36 space-y-1 overflow-y-auto pr-1">
        {items.map((item, i) => (
          <li key={i} className={`flex items-center gap-2 text-sm ${color}`}>
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current opacity-60" />
            {item}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const CharacterModal = ({ character, onClose }: CharacterModalProps) => {
  useEffect(() => {
    if (!character) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [character, onClose]);

  if (!character) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm dark:bg-black/70" />

      <div
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52 flex-shrink-0 bg-slate-100 dark:bg-gray-800">
          {character.imageUrl ? (
            <img src={character.imageUrl} alt={character.name} className="h-full w-full object-cover object-top" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-7xl font-bold text-slate-300 dark:text-gray-700">{character.name[0]}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-gray-900 dark:via-gray-900/20" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 dark:bg-black/50 dark:hover:bg-black/80"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-5">
            <h2 className="text-2xl font-bold text-slate-900 drop-shadow dark:text-white">{character.name}</h2>
            <div className="mt-1 flex flex-wrap gap-2">
              {character.tvShows.length > 0 && (
                <span className="rounded-full bg-blue-600/90 px-2 py-0.5 text-xs text-blue-50 dark:bg-blue-600/80 dark:text-blue-100">
                  {character.tvShows.length} TV Show{character.tvShows.length !== 1 ? "s" : ""}
                </span>
              )}
              {character.videoGames.length > 0 && (
                <span className="rounded-full bg-purple-600/90 px-2 py-0.5 text-xs text-purple-50 dark:bg-purple-600/80 dark:text-purple-100">
                  {character.videoGames.length} Video Game{character.videoGames.length !== 1 ? "s" : ""}
                </span>
              )}
              {character.films.length > 0 && (
                <span className="rounded-full bg-amber-600/90 px-2 py-0.5 text-xs text-amber-50 dark:bg-amber-600/80 dark:text-amber-100">
                  {character.films.length} Film{character.films.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto p-5">
          <div className="grid grid-cols-2 gap-5">
            <ListSection title="TV Shows" items={character.tvShows} color="text-blue-700 dark:text-blue-300" />
            <ListSection
              title="Video Games"
              items={character.videoGames}
              color="text-purple-700 dark:text-purple-300"
            />
          </div>

          {character.films.length > 0 && (
            <ListSection title="Films" items={character.films} color="text-amber-700 dark:text-amber-300" />
          )}

          {(character.allies.length > 0 || character.enemies.length > 0) && (
            <div className="grid grid-cols-2 gap-5 border-t border-slate-200 pt-4 dark:border-gray-800">
              <ListSection title="Allies" items={character.allies} color="text-green-700 dark:text-green-300" />
              <ListSection title="Enemies" items={character.enemies} color="text-red-700 dark:text-red-300" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
