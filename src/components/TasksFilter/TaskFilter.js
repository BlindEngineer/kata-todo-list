// import React from "react";

import './TaskFilter.css';

export default function TaskFilter({onFilterChange, filterValue}){


    return (
      <ul className="filters">
        <li>
          <button
            className={filterValue === 'All' ? 'selected' : null}
            onClick={() => onFilterChange('All')}
          >All</button>
        </li>
        <li>
          <button
            className={filterValue === 'Active' ? 'selected' : null}
            onClick={() => onFilterChange('Active')}
          >Active</button>
        </li>
        <li>
          <button className={filterValue === 'Completed' ? 'selected' : null}
                  onClick={() => onFilterChange('Completed')}
          >Completed</button>
        </li>
      </ul>
    );
  }







