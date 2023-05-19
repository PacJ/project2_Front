import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseUrl } from 'Apiurl';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// reactstrap components
import {
  Row,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

function Footer() {
  const member_id = localStorage.getItem('member_id');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // 회원 탈퇴 확인 모달 상태

  // 회원 탈퇴 확인 모달 열기
  const openConfirmModal = () => {
    setConfirmModalOpen(true);
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
    },
  };

  // 회원 탈퇴 확인 모달 닫기
  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
  };

  // 회원 탈퇴 처리
  const handleDelete = async () => {
    const member = {
      member_id: localStorage.getItem('member_id'),
    };

    await axios.post(`${baseUrl}/profile/delete`, member, config).then(() => {
      console.log('회원 탈퇴 성공');
      // 회원 탈퇴 성공 처리
      window.location.replace('/logout');
    });
  };

  return (
    <footer className='footer footer-black footer-white'>
      <Container>
        <Row>
          <nav className='footer-nav'>
            <ul>
              <li>
                <a
                  href='https://www.creative-tim.com?ref=pkr-footer'
                  target='_blank'
                >
                  Creative Tim
                </a>
              </li>
              <li>
                <a
                  href='http://blog.creative-tim.com/?ref=pkr-footer'
                  target='_blank'
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href='https://www.creative-tim.com/license?ref=pkr-footer'
                  target='_blank'
                >
                  Licenses
                </a>
              </li>
            </ul>
          </nav>
          <div className='credits ml-auto'>
            <span className='copyright'>
              © {new Date().getFullYear()}, made with{' '}
              <i className='fa fa-heart heart' /> by Creative Tim
            </span>
          </div>
        </Row>
      </Container>
      <div
        style={{
          width: '100%',

          backgroundColor: '#343A40',
          padding: '50px',
        }}
      >
        <div style={{ width: '1300px', margin: 'auto', position: 'relative' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              color: 'white',
              marginTop: '10px',
            }}
          >
            주식회사 부귀영화 | 대표 김서영 | 제휴 문의 | 01039542088 <br />
            대표메일 | 서영님 yeommy90@gmail.com
            <br />
            사업장 | 서울 서초구 서초대로77길 54 1402호 <br /> 고객센터 |
            cs@boogimovie.co.kr, 02-515-9985 (평일 09시~18시)
            <br /> 제휴 및 대외 협력 | fbrnjsghks@gmail.com <br /> TMDB | WATCHA
            | NETFLIX | Copyright© 주식회사 부귀영화 All rights reserved
          </div>

          <img
            className='footer_logo'
            alt='...'
            src={require('assets/img/logo.gif')}
            style={{
              width: '180px',
              position: 'absolute',
              top: 0,
              right: 0,
              cursor: 'pointer',
            }}
          />

          {localStorage.getItem('member_id') && (
            // <Tooltip title='지금까지 남긴게 모두 사라져요!' arrow>
            <span>
              <Button
                // onClick={handleDelete}
                onClick={openConfirmModal} // 확인 모달 열기
                className='btn-round bg-dark'
                type='button'
                style={{
                  position: 'absolute',
                  marginLeft: ' 20px',
                  right: '60px',
                  bottom: '0px',
                }}
              >
                회원탈퇴
              </Button>
            </span>
            // </Tooltip>
          )}
          {/* 회원 탈퇴 확인 모달 */}
          <Modal isOpen={confirmModalOpen} toggle={closeConfirmModal}>
            <ModalHeader
              toggle={closeConfirmModal}
              style={{ fontWeight: 'bold' }}
            >
              회원 탈퇴
            </ModalHeader>
            <ModalBody style={{ mergin: 'auto' }}>
              지금까지 남겨온 추억이 전부 사라집니다! <br />
              정말 탈퇴 하시겠습니까?
              {/* 추가적인 메시지 또는 안내를 여기에 포함할 수 있습니다. */}
            </ModalBody>
            <ModalFooter>
              <div style={{ margin: 'auto' }}>
                <Button
                  style={{ margin: '10px' }}
                  color='secondary'
                  onClick={closeConfirmModal}
                >
                  취소
                </Button>
                <Button color='danger' onClick={handleDelete}>
                  확인
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </footer>
  );
}

export default Footer