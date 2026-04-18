import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "./SearchForm";

describe("SearchForm", () => {
  it("calls change handlers when typing in both inputs", async () => {
    const handleSearchChangeMock = vi.fn();
    const handleTvShowChangeMock = vi.fn();
    const user = userEvent.setup();

    const SearchFormParentComponent = () => {
      const [search, setSearch] = useState("");
      const [tvShowFilter, setTvShowFilter] = useState("");

      const handleSearchChange = (value: string) => {
        setSearch(value);
        handleSearchChangeMock(value);
      };

      const handleTvShowChange = (value: string) => {
        setTvShowFilter(value);
        handleTvShowChangeMock(value);
      };

      return (
        <SearchForm
          search={search}
          tvShowFilter={tvShowFilter}
          onSearchChange={handleSearchChange}
          onTvShowChange={handleTvShowChange}
        />
      );
    };

    render(<SearchFormParentComponent />);

    await user.type(screen.getByPlaceholderText("Search characters..."), "Mickey");
    await user.type(screen.getByPlaceholderText("Filter by TV show..."), "Clubhouse");

    expect(handleSearchChangeMock).toHaveBeenLastCalledWith("Mickey");
    expect(handleTvShowChangeMock).toHaveBeenLastCalledWith("Clubhouse");
  });

  it("clears each input when clear button is clicked", async () => {
    const handleSearchChange = vi.fn();
    const handleTvShowChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchForm
        search="Minnie"
        tvShowFilter="Roadster Racers"
        onSearchChange={handleSearchChange}
        onTvShowChange={handleTvShowChange}
      />,
    );

    const [searchClearButton, tvShowClearButton] = screen.getAllByRole("button");

    await user.click(searchClearButton);
    await user.click(tvShowClearButton);

    expect(handleSearchChange).toHaveBeenCalledWith("");
    expect(handleTvShowChange).toHaveBeenCalledWith("");
  });
});
