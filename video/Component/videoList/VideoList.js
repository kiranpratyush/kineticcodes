import React from 'react';
import './VideoList.css';
import ImageCard from '../ImageCard/ImageCard';
import { CircularIndeterminate } from '../Loader/Loader';
import { data } from '../../Datas/Sampledata';
const URL = 'https://kineticcodes.pythonanywhere.com/videos/';
export default function VideoList() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="VideoList__container">
      {!loading ? (
        data.map((element, index) => {
          return (
            <>
              <ImageCard
                feat={index === 5}
                down={index % 5 === 0}
                thumbnail={element.thumbnail}
                title={element.title}
                subtitle={element.subTitle}
                key={element.id}
                url={element.link}
                description={element.description}
              />
            </>
          );
        })
      ) : (
        <CircularIndeterminate />
      )}
    </div>
  );
}
