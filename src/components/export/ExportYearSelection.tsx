import React, { useState } from "react";

const ExportYearSelection = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = Array.from({ length: 3 }, (_, i) => currentYear - i);

  return (
    <div className="text-md text-zinc-200 flex items-center gap-2">
      <label htmlFor="year-select">Choose a year:</label>
      <select
        id="year-select"
        className="bg-zinc-800 text-white border border-zinc-600 rounded-md p-2"
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExportYearSelection;
