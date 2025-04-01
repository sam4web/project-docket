import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { selectSearchQuery, setSearchQuery } from "@/features/note/noteSlice.js";
import { useDispatch, useSelector } from "react-redux";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);

  useEffect(() => {
    dispatch(setSearchQuery(search));
  }, [dispatch, search]);

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div
      className="sm:w-full max-w-xs border-2 shadow-sm px-3 py-2 rounded-lg flex-between space-x-2 group focus:border-dark hover:border-dark dark:border-grey dark:hover:border-light dark:focus:border-light">
      <label
        htmlFor="search"
        className="dark:text-light dark:group-focus-within:text-light text-zinc-500 group-focus-within:text-dark text-2xl"
      >
        <IoSearchOutline />
      </label>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="text-responsive outline-none flex-1 placeholder:text-zinc-500 dark:placeholder:text-zinc-300 focus:placeholder:text-transparent bg-transparent"
      />
    </div>
  );
};

export default SearchBox;