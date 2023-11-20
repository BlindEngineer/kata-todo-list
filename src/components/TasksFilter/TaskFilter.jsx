import './TaskFilter.css'

import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

export default function TaskFilter({ onFilterChange, filterValue }) {
  const statuses = ['All', 'Active', 'Completed']
  const statusButtons = statuses.map((status) => {
    return (
      <li key={nanoid()}>
        <button
          type="button"
          className={filterValue === status ? 'selected' : null}
          onClick={() => onFilterChange(status)}
        >
          {status}
        </button>
      </li>
    )
  })

  return <ul className="filters">{statusButtons}</ul>
}

TaskFilter.defaultProps = {
  onFilterChange: () => {},
  filterValue: 'All',
}

TaskFilter.propTypes = {
  onFilterChange: PropTypes.func,
  filterValue: PropTypes.oneOf(['All', 'Active', 'Completed']),
}
