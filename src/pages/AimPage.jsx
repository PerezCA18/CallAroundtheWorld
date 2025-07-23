import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TeamsByCountry() {
  const [data, setData] = useState({});
  const [selectedYear, setSelectedYear] = useState(null);
  const [allYears, setAllYears] = useState([]);
  const { country: selectedCountryParam } = useParams(); // from URL

  useEffect(() => {
    fetch("/src/components/teams.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        if (json[selectedCountryParam]) {
          setAllYears(extractUniqueYears(json[selectedCountryParam]));
        }
      })
      .catch(console.error);
  }, [selectedCountryParam]);

  const extractUniqueYears = (countryData) => {
    const yearSet = new Set();
    countryData.teams?.forEach((t) => yearSet.add(t.year));
    Object.values(countryData.cities || {}).forEach((teams) =>
      teams.forEach((t) => yearSet.add(t.year))
    );
    return Array.from(yearSet).sort();
  };

  const matchesSelectedYear = (team) => {
    return selectedYear === null || team.year === selectedYear;
  };

  const countryData = data[selectedCountryParam];

  if (!countryData) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">
        {selectedCountryParam} does not have roll calls submited :(
        </h1>
      </div>
    );
  }

  const nationalTeams = countryData.teams.filter(matchesSelectedYear);
  const citiesWithMatchingTeams = Object.entries(countryData.cities)
    .map(([city, teams]) => ({
      city,
      teams: teams.filter(matchesSelectedYear),
    }))
    .filter((entry) => entry.teams.length > 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {selectedCountryParam}
      </h1>

      {/* Year Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {allYears.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-full border ${
              selectedYear === year
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
          >
            {year}
          </button>
        ))}
        <button
          onClick={() => setSelectedYear(null)}
          className={`px-4 py-2 rounded-full border ${
            selectedYear === null
              ? "bg-green-600 text-white"
              : "bg-white text-green-600 hover:bg-green-100"
          }`}
        >
          All
        </button>
      </div>

      {/* National Teams */}
      {nationalTeams.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">MC Teams</h3>
          <ul className="list-none ml-6 mb-4">
            {nationalTeams.map((team, index) => (
              <li key={index}>
                <a
                  href={team.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {team.team}
                </a>{" "}
                – Season: {team.year}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* City Teams */}
      {citiesWithMatchingTeams.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">City Teams</h3>
          {citiesWithMatchingTeams.map(({ city, teams }) => (
            <div key={city} className="ml-4 mb-4">
              <h4 className="font-semibold text-gray-700">{city}</h4>
              <ul className="ml-6 list-none" style={{ listStyleType: "none" }}>
                {teams.map((team, i) => (
                  <li key={i}>
                    <a
                      href={team.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {team.team}
                    </a>{" "}
                    – Season: {team.year}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
