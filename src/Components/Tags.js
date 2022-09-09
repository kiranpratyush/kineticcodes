import React from 'react';
import { useFilter } from '../contexts/Filter.context';
import './Tags.css';
export function Tags({ category, name }) {
  const setFilter = useFilter();
  return (
    <span className="badge2">
      <span className = "TagInnerBadge">{name}</span>
      <button
        onClick={() =>
          setFilter[1]({
            type: 'REMOVE',
            payload: { category: category, name },
          })
        }
        className="btn-close2"
        type="button"
        aria-label="Close"
        id="close-btn"
      >
        X
      </button>
    </span>
  );
}
