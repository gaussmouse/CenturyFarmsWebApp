import React from 'react';

export default function ActiveFilters({
  activeFilters,
  filterNames,
  filterCategory
}) {
  if (activeFilters.length === 0) {
    return null;
  }

  const activeFiltersLabels = filterNames
    .filter(filter => activeFilters.includes(String(filter.value)))
    .map(filter => filter.label);

  const filtersCount = activeFiltersLabels.length;

  return (
    <div className="active-filters">
      <div className="active-filter-label">
        Active {filterCategory} Filters:
      </div>
      <div className="active-filter">
        {activeFiltersLabels.map((label, index) => (
          <React.Fragment key={label}>
            {label}
            {index !== filtersCount - 1 && ', '}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
