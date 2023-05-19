import { faCaretDown, faEllipsisV, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const CommentItem = ({comments, handleSpoilerReport, handleProfanityReport, toggleExpanded, isCommentLiked, handleLikesClick, expandedComments, member_id}) => {
  const [itemsToShow, setItemsToShow] = useState(3);

  let gradeImgPath = "";
  switch (comments.grade) {
    case 3:
      gradeImgPath = "동.png";
      break;
    case 2:
      gradeImgPath = "은.png";
      break;
    case 1:
      gradeImgPath = "금.png";
      break;
    default:
      gradeImgPath = "";
      break;
  }

  const renderedComments = comments.slice(0, itemsToShow).map((comment, index) => {
    let gradeImgPath = "";
    switch (comment.grade) {
      case 3:
        gradeImgPath = '동.png';
        break;
      case 2:
        gradeImgPath = '은.png';
        break;
      case 1:
        gradeImgPath = '금.png';
        break;
      default:
        gradeImgPath = "";
        break;
    }

    return (
      <div key={comment.member_id} className='comment-box p-4 mb-3' style={{ position: 'relative' }}>
        {index === 0 && comment.likes !== 0 ? (
        <>
          <img
            src={require('assets/img/crown.png')}
            style={{
              position: 'absolute',
              top: '15px',
              left: '25px',
              width: '30px',
              zIndex: '8',
              transform: 'rotate( -53deg )',
            }}
          />
        </>
        ) : (
          ''
        )}    
        {comment.grade !== 4 ? (
          <img
            src={`${process.env.PUBLIC_URL}/gradeimg/${gradeImgPath}`}
            style={{
              position: 'absolute',
              width: '30px',
              top: '50px',
              left: '70px',
              zIndex: 50,
            }}
          />  
        ) : (
          ''
        )}
        <div className='d-flex align-items-center' style={{ zIndex: 9 }}>
          <Link to={`/profile/${comment.member_id}`}>
            <img
              src={`/profiles/${comment.profile_path}`}
              className='profile-pic rounded-circle mx-3'
              style={{ zIndex: 9 }}
            />
          </Link>
          <div className='ml-1'>
            <div className='mt-1' style={{ color: 'gray', fontSize: '1.1em' }}>
              {comment.nickname}
            </div>
            <div style={{ color: '#e75757', fontSize: '0.9em' }}>
              ★ {comment.rating !== 0 ? comment.rating : '평가없음'}
            </div>
          </div>
          {comment.member_id != member_id && (
            <div className='ml-auto mr-2'>
              <Dropdown>
                <Dropdown.Toggle variant='link' size='sm' style={{ outline: 'none', boxShadow: 'none' }}>
                  <FontAwesomeIcon icon={faEllipsisV} className='m-0' />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => {handleSpoilerReport(comment.member_id);}}>
                    스포일러 신고
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => {handleProfanityReport(comment.member_id);}}>
                    욕설 신고
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
        {comment.state === 2 ? (
          <p className={`comments-content ${expandedComments.includes(comment.member_id) ? 'expanded' : ''} px-3 pt-4`} onClick={() => toggleExpanded(comment.member_id)}>
            {expandedComments.includes(comment.member_id) ? comment.content : (<div className="comments-spoiler">스포일러 주의!</div>)}  
          </p>
        ) : (
          <>
            <p className={`comments-content ${expandedComments.includes(comment.member_id) ? 'expanded' : ''} px-3 pt-4`}>{comment.content}</p>
              {comment.content.split('\n').length > 2 && 
                <div className="more-button mx-3 mb-3" onClick={() => toggleExpanded(comment.member_id)}>
                  {expandedComments.includes(comment.member_id) ? '접기' : '더보기'}
                </div>
              }
          </>
        )}
        <div className="d-flex justify-content-between mt-3">
          <span>
            <FontAwesomeIcon icon={faThumbsUp} className="mr-1 ml-3" style={isCommentLiked(comment.member_id) ? { color: '#fc8080', cursor: 'pointer' } : { cursor: 'pointer' }} onClick={() => handleLikesClick(comment.member_id)} />
            <span className="pt-2 pl-1" style={isCommentLiked(comment.member_id) ? { color: '#fc8080' } : {}}>{comment.likes}</span>
          </span>
        </div>
      </div>
    )
  })

  return (
    <>
      {comments && comments.length > 0 ? (
        <>
          {renderedComments}
          {itemsToShow < comments.length && (
            <div className='more_button' onClick={() => setItemsToShow(itemsToShow + 3)}>More <FontAwesomeIcon icon={faCaretDown}/></div>
          )}
        </>
      ) : (<p className="d-flex justify-content-center py-5">작성된 코멘트가 없습니다.</p>)}
    </>
  )
}

export default CommentItem;