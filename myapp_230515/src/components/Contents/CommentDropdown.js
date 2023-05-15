import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

const CommentDropdown = ({ isDropdownVisible, setIsDropdownVisible, handleShow, onDelete }) => {
  const hideEditDeleteDropdown = () => {
    setIsDropdownVisible(false);
  };

  const handleDelete = () => {
    onDelete();
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isDropdownVisible && !event.target.closest('.dropdown')) {
        hideEditDeleteDropdown();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDropdownVisible]);

  return (
    <div>
      {isDropdownVisible && (
        <div className="dropdown-menu">
          <div className='d-flex justify-content-center flex-column align-items-center'>
            <div className="dropdown-edit p-2 mb-1" onClick={() => {handleShow(true);}}>
              <FontAwesomeIcon icon={faPen} className="mr-2" />코멘트 수정</div>
            <div className="dropdown-del p-2" href="#" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrashCan} className="mr-2" />코멘트 삭제</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentDropdown;
