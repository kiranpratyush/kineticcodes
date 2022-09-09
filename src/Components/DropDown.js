import React from 'react';
import './DropDown.css';
import { useFilter } from '../contexts/Filter.context';
export function DropDown(props) {
  const [options, setOptions] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const category = React.useState(props.category);
  const filter = useFilter();
  React.useEffect(() => {
    setOptions([...props.option]);
  }, [props]);
  function handleClassName() {
    if (props.active !== props.index) {
      props.change(props.index);
    } else {
      props.change(-1);
    }
  }
  function handleSearch(e) {
    setSearch(e.target.value);
    setOptions(
      props.option.filter((option) =>
        option.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }
  return (
    <div
      className={props.active === props.index ? 'wrapper active' : 'wrapper'}
      onClick={handleClassName}
    >
      <div className="select-btn">
        <span>{category[0]}</span>
        <i className="fa fa-angle-down"></i>
      </div>
      <div className="content">
        <div className="search" onClick={(e) => e.stopPropagation()}>
          <i className="fa fa-search"></i>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <ul className="options" onClick={(e) => e.stopPropagation()}>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                console.log(props.tags,option)
                filter[1]({
                  type: 'ADD',
                  payload: { basedOn: props.tags, value: option },
                });
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
