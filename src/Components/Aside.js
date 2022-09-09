import React from 'react';
import { useFilter } from '../contexts/Filter.context';
import { CircularIndeterminate } from './Loader';
import './Aside.css';
import { DropDown } from './DropDown';
import { Tags } from './Tags';
function convertArray(data, type) {
  const oldArray = [];
  data.forEach((element) => {
    oldArray.push(element[type]);
  });
  return oldArray;
}
function filterArrays(filter) {
  let value2 = [];
  for (let category in filter) {
    const value = filter[category].map((element) => (
      <Tags category={category} name={element}></Tags>
    ));
    value2 = [...value2, ...value];
  }
  return value2;
}
export function Aside({ loading, setLoading }) {
  const [managementTools, setManagementTools] = React.useState([]);
  const [techStatck, setTechStack] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [active, setActive] = React.useState(-1);
  const [filter, setFilter] = useFilter();

  // const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    fetch('https://kineticcodes.pythonanywhere.com/management/')
      .then((response) => response.json())
      .then((data) => setManagementTools(convertArray(data, 'managementTool')));
    fetch('https://kineticcodes.pythonanywhere.com/tech/')
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setTechStack(convertArray(data, 'tech'));
      });
    fetch('https://kineticcodes.pythonanywhere.com/tags/')
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setTags(convertArray(data, 'tags'));
      });
  }, [setLoading]);
  if (loading) {
    return <CircularIndeterminate></CircularIndeterminate>;
  }
  return (
    <aside className="side">
      <div className="filter-container">
        <div className="tags-container">{filterArrays(filter)}</div>
        <button
          className="clear-btn"
          onClick={() => setFilter({ type: 'CLEAR' })}
        >
          CLEAR
        </button>
      </div>

      <DropDown
        option={techStatck}
        category="Technology"
        tags="tech"
        index={0}
        active={active}
        change={setActive}
      />
      {/* <DropDown
        option={value}
        category="Time Taken"
        index={1}
        active={active}
        change={setActive}
      /> */}
      <DropDown
        option={managementTools}
        category="Tools"
        tags="management"
        index={2}
        active={active}
        change={setActive}
      />
       <DropDown
        option={tags}
        category="Tags"
        tags="tags"
        index={3}
        active={active}
        change={setActive}
      />
    </aside>
  );
}
