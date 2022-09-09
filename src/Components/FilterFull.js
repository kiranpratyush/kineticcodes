import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { FilterButton } from './FilterButton';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { Aside } from './Aside';
import './FilterFull.css';
import { useFilter } from '../contexts/Filter.context';

export function FilterMobile({ close, setClose, loading, setLoading }) {
  const state = useFilter();
  return (
    <>
      <div
        className="filterMobile"
        style={close ? { display: 'none' } : { display: 'inherit' }}
      >
        {close ? null : <Aside loading={loading} setLoading={setLoading} />}
      </div>
      <div
        className="close"
        role="button"
        onClick={() => {
          setClose((close) => !close);
        }}
      >
        {!close ? null : (
          <FilterButton
            value={
              state[0].tags.length +
              state[0].management.length +
              state[0].tech.length
            }
          />
        )}

        {close ? null : (
          <Tooltip title="Apply" placement="top">
            <Fab className="close__first" role="button" color="black">
              <DoneOutlinedIcon />
            </Fab>
          </Tooltip>
        )}
      </div>
    </>
  );
}
