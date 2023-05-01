import ReviewSummary from './ReviewSummary';
import AnalysisHeader from './AnalysisHeader';
import UserGenre from './UserGenre';
import UserActor from './UserActor';

const AnalysisPage = () => {
  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <div style={{ height: '88px', width: '100%' }}></div>
        <AnalysisHeader />
        <ReviewSummary />
        <UserActor />
        <UserGenre />
      </div>
    </>
  );
};

export default AnalysisPage;
