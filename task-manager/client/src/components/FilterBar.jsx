const FilterBar = ({ filter, onChange }) => {
  const buttons = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filter-bar">
      {buttons.map((button) => (
        <button
          key={button.id}
          className={`filter-button ${filter === button.id ? 'active' : ''}`}
          type="button"
          onClick={() => onChange(button.id)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
