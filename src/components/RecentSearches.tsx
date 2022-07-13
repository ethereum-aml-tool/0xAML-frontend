import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { recentSearchesAtom } from "../store/store";

const RecentSearches = () => {
  const recentSearches = useAtomValue(recentSearchesAtom);

  useEffect(() => {
    console.log("RecentSearches: recentSearches", recentSearches);
  }, [recentSearches]);

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-lg font-bold text-tornado-green">Recently viewed:</p>
      <div className="flex flex-col items-start">
        {[...recentSearches].reverse().map((search, index) => (
          <Link to={`/address/${search}`} key={index}>
            <p className="text-sm font-bold italic text-tornado-green transition-all hover:text-green-700">
              &#11166; {search}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
