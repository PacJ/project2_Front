import ReviewSummary from './ReviewSummary';
import AnalysisHeader from './AnalysisHeader';
import UserGenre from './UserGenre';
import UserActor from './UserActor';
import UserDirector from './UserDirector';

const AnalysisPage = () => {
  localStorage.getItem('member_id');
  localStorage.getItem('nickname');

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <div style={{ height: '88px', width: '100%' }}></div>
        <AnalysisHeader />
        <ReviewSummary />
        <UserDirector />
        <UserActor />
        <UserGenre />
      </div>
    </>
  );
};

export default AnalysisPage;
