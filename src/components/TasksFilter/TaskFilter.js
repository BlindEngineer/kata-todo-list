import './TaskFilter.css'

import PropTypes from 'prop-types'

export default function TaskFilter({ onFilterChange, filterValue }) {
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={filterValue === 'All' ? 'selected' : null}
          onClick={() => onFilterChange('All')}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filterValue === 'Active' ? 'selected' : null}
          onClick={() => onFilterChange('Active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filterValue === 'Completed' ? 'selected' : null}
          onClick={() => onFilterChange('Completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilter.defaultProps = {
  onFilterChange: () => {},
  filterValue: 'All',
}

TaskFilter.propTypes = {
  onFilterChange: PropTypes.func,
  filterValue: PropTypes.oneOf(['All', 'Active', 'Completed']),
}
