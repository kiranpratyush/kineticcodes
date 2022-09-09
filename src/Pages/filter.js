import React from 'react';

import './filter.css';
import { Aside } from '../Components/Aside';
import { Card } from '../Components/Card';
import { useResponse } from '../contexts/Response.context';
import { CircularIndeterminate } from '../Components/Loader';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FilterMobile } from '../Components/FilterFull';
import { ScrollToTop } from '../Components/ScrollToTop';
export default function FilterPage() {
  const [response, , loading] = useResponse();
  const [loading2, setLoading2] = React.useState(false);
  const matches = useMediaQuery('(min-width:1000px)');
  const [close, setClose] = React.useState(true);

  return (
    <>
      {!matches ? (
        <FilterMobile
          close={close}
          setClose={setClose}
          loading={loading2}
          setLoading={setLoading2}
        />
      ) : null}
      <div className="parent__container" style={{}}>
        {!matches ? null : (
          <Aside loading={loading2} setLoading={setLoading2} />
        )}
        <div
          className="main_container"
          style={!close ? { display: 'none' } : null}
        >
          {!loading && !loading2 ? (
            response.map((res) => (
              <Card
                res={res}
                id={res.id}
                key={res.title}
                title={res.title}
                image={[...res.techStack, ...res.managementTools]}
                tools={res.managementTools}
                tech={res.techStack}
                time={res.time}
                tags={res.tags}
                main={[...res.images]}
                className=""
              />
            ))
          ) : (
            <CircularIndeterminate></CircularIndeterminate>
          )}
        </div>
      </div>
      <ScrollToTop />
    </>
  );
}
