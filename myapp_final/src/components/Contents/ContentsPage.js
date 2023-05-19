import { useEffect, useState } from 'react';
import ContentsHeader from './ContentsHeader';
import BasicInfo from './MovieInfo';
import CastInfo from './CastInfo';
import Comments from './Comments';
import SimilarMovie from './SimilarMovie';

import '../../assets/css/contents.css';
import '../../assets/css/modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { MovieActions } from 'reduxs/Actions/MovieAction';
import { useParams } from 'react-router-dom';
import ContentsImage from './ContentsImage';
import AuthModal from './AuthModal';
import ReactPlayer from 'react-player';
import ProviderInfo from './ProviderInfo';

const Contents = () => {
  const dispatch = useDispatch();
  const { movie_id } = useParams();
  const member_id = localStorage.getItem("member_id");
  const [comments, setComments] = useState([]);

  // 로그인 여부 확인 모달
  const [authShow, setAuthShow] = useState(false);
  const handleAuthClose = () => setAuthShow(false);
  const handleAuthShow = () => setAuthShow(true);

  const contents = useSelector((state) => state.movie.contents);
  const memberLikes = useSelector((state) => state.movie.memberLikes);

  // 렌더링 트리거 함수 > 이름을 잘못지었음..
  const fetchComments = async () => {
    const fetchedComments = await dispatch(MovieActions.getMovieContents(movie_id));

    if (member_id) {
      const fetchedMemberComments = await dispatch(MovieActions.getReviewByMemberId(movie_id, member_id));
      const fetchedMemberWish = await dispatch(MovieActions.getWishByMemberId(movie_id, member_id));
      const fetchedLikes = await dispatch(MovieActions.getLikesByMemberId(movie_id, member_id));
      const fetchedFavorite = await dispatch(MovieActions.getFavoriteByMemberId(member_id));
      setComments(fetchedComments, fetchedMemberComments, fetchedMemberWish, fetchedLikes, fetchedFavorite);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchComments();
  }, [setComments]);

  return (
    <div className="section" style={{ position: 'relative' }}>
      <ContentsHeader contents={contents} fetchComments={fetchComments} handleAuthShow={handleAuthShow} />
      {contents.trailerPath && (
        <ReactPlayer
          style={{
            top: '350px',
            margin: 'auto',
            left: '650px',
            right: '0px',
            zIndex: 2,
            position: 'absolute',
            backgroundColor: 'black',
          }}
          url={`https://www.youtube.com/watch?v=${contents.trailerPath}`}
          width='400px'
          height='200px'
          loop={true}
          playing={true}
          playIcon={true}
          muted={true}
          controls={true}
        />
      )}
      <ProviderInfo contents={contents}/>
      <BasicInfo contents={contents}/>
      <CastInfo contents={contents}/>
      <Comments contents={contents} handleAuthShow={handleAuthShow} memberLikes={memberLikes} fetchComments={fetchComments}/>
      <ContentsImage contents={contents}/>
      <SimilarMovie contents={contents} />
      <AuthModal isOpen={authShow} onRequestClose={handleAuthClose} />
    </div>
  )
}

export default Contents;