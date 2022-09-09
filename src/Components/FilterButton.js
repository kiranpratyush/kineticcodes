import React from 'react';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';
import './FilterButton.css';
export function FilterButton({ value }) {
  return (
    <Tooltip title='Filter'placement="top">
      <Badge badgeContent={value} color="primary">
        <Fab size="large" aria-label="add">
          <FilterAltOutlinedIcon />
        </Fab>
      </Badge>
    </Tooltip>
  );
}
