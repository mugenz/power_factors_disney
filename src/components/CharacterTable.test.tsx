import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { DisneyCharacter } from "../types/disney";
import CharacterModal from "./CharacterModal";
import CharacterTable from "./CharacterTable";

const createCharacter = (overrides: Partial<DisneyCharacter> = {}): DisneyCharacter => ({
  _id: 1,
  name: "Test Hero",
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

describe("CharacterTable", () => {
  const TableWithModalParentComponent = () => {
    const [selectedCharacter, setSelectedCharacter] = useState<DisneyCharacter | null>(null);
    const character = createCharacter();

    return (
      <>
        <CharacterTable
          characters={[character]}
          totalPages={1}
          currentPage={1}
          pageSize={50}
          sortOrder={null}
          isLoading={false}
          isFetching={false}
          onPageChange={vi.fn()}
          onPageSizeChange={vi.fn()}
          onSortToggle={vi.fn()}
          onRowClick={setSelectedCharacter}
          onRowHover={vi.fn()}
        />
        <CharacterModal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
      </>
    );
  };

  it("opens the character modal when a table row is clicked", async () => {
    const user = userEvent.setup();
    render(<TableWithModalParentComponent />);

    await user.click(screen.getByText("Test Hero"));

    expect(screen.getByRole("heading", { level: 2, name: "Test Hero" })).toBeInTheDocument();
  });

  it("closes the modal when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<TableWithModalParentComponent />);

    await user.click(screen.getByText("Test Hero"));
    expect(screen.getByRole("heading", { level: 2, name: "Test Hero" })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("heading", { level: 2, name: "Test Hero" })).not.toBeInTheDocument();
  });
  it("closes the modal when Close button is clicked", async () => {
    const user = userEvent.setup();
    render(<TableWithModalParentComponent />);

    await user.click(screen.getByText("Test Hero"));
    expect(screen.getByRole("heading", { level: 2, name: "Test Hero" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close modal" }));

    expect(screen.queryByRole("heading", { level: 2, name: "Test Hero" })).not.toBeInTheDocument();
  });
});
