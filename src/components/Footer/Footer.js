import './Footer.css';

import TaskFilter from "../TasksFilter/TaskFilter";
import PropTypes from "prop-types";

export default function Footer({onFilterChange, count, deleteAllDone, filterValue}) {
  return (
    <footer className="footer">
      {/*тест*/}
      {/*{children}*/}
      <span className="todo-count">{count} items left</span>
      <TaskFilter
        onFilterChange={onFilterChange}
        filterValue={filterValue}/>
      <button className="clear-completed" onClick={deleteAllDone}>Clear completed</button>
    </footer>
  )
}

Footer.defaultProps = {
  onFilterChange: () => {},
  deleteAllDone: () => {},
  count: 0,
  filterValue: 'All'
}

Footer.propTypes = {
  onFilterChange: PropTypes.func,
  deleteAllDone: PropTypes.func,
  count: PropTypes.number,
  filterValue: PropTypes.oneOf(['All', 'Active', 'Completed'])
}