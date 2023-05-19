import ReviewSummary from './ReviewSummary';
import AnalysisHeader from './AnalysisHeader';
import UserGenre from './UserGenre';
import UserActor from './UserActor';
import UserDirector from './UserDirector';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ProfileAction } from 'reduxs/Actions/ProfileAction';
import SimilarUsers from './SimilarUsers';

const AnalysisPage = () => {
  const { member_id } = useParams();
  const dispatch = useDispatch();

  const memberInfo = useSelector((state) => state.profile.memberInfo);

  useEffect(() => {
    dispatch(ProfileAction.getProfileList(member_id));
  }, []);

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <div style={{ height: '88px', width: '100%' }}></div>
        <AnalysisHeader memberInfo={memberInfo}/>
        <ReviewSummary />
        <UserDirector />
        <UserActor />
        <UserGenre />
        <SimilarUsers />
      </div>
    </>
  );
};

export default AnalysisPage;
