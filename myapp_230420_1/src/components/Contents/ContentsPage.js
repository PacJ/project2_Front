import { useEffect } from 'react';
import ContentsHeader from './ContentsHeader';
import BasicInfo from './MovieInfo';
import CastInfo from './CastInfo';
import Comments from './Comments';
import SimilarMovie from './SimilarMovie';

import '../../assets/css/contents.css';

const Contents = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section">
      <ContentsHeader />
      <BasicInfo />
      <CastInfo />
      <Comments />
      <SimilarMovie />
    </div>
  )
}

export default Contents;