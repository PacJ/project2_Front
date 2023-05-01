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
import MemberReviewInfo from './MemberReviewInfo';

const Contents = () => {
  const dispatch = useDispatch();
  const { movie_id } = useParams();
  const [comments, setComments] = useState([]);

  // 로그인 여부 확인 모달
  const [authShow, setAuthShow] = useState(false);
  const handleAuthClose = () => setAuthShow(false);
  const handleAuthShow = () => setAuthShow(true);

  const contents = useSelector((state) => state.movie.contents);
  const memberReview = useSelector((state) => state.movie.memberReview);
  
  const fetchComments = async () => {
    const fetchedComments = await dispatch(MovieActions.getMovieContents(movie_id));
    const fetchedMemberComments = await dispatch(MovieActions.getReviewByMemberId(movie_id, localStorage.getItem("member_id")));
    setComments(fetchedComments, fetchedMemberComments);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchComments();
  }, []);

  return (
    <div className="section">
      <ContentsHeader contents={contents} fetchComments={fetchComments} handleAuthShow={handleAuthShow} />
      {memberReview ? <MemberReviewInfo /> : ''}
      <BasicInfo contents={contents}/>
      <CastInfo contents={contents}/>
      <Comments contents={contents} handleAuthShow={handleAuthShow} />
      <ContentsImage contents={contents}/>
      <SimilarMovie />
      <AuthModal isOpen={authShow} onRequestClose={handleAuthClose} />
    </div>
  )
}

export default Contents;