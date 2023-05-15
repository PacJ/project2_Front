import { Fragment, useEffect, useState } from 'react';
import style from '../../assets/css/notice.module.css';
import Page from './Page';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import { baseUrl } from 'Apiurl';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';

const EditNotice = () => {
    const { notice_id } = useParams();
    const [imageSrc, setImageSrc] = useState('');
    const [showText, setShowText] = useState(false); // state to keep track of whether text should be shown or hidden
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [noticesPerPage, setNoticesPerPage] = useState(2); // 페이지당 공지사항 개수
    const adminId = localStorage.getItem("adminId")
    const [notices, setNotices] = useState("");

    // 페이지네이션 처리 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 현재 페이지에 해당하는 공지사항 배열
    const indexOfLastNotice = currentPage * noticesPerPage;
    const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
    const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);




    // id 키값 받아서 그 항목만 출력


    // config 헤더 정의
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
        },
    };
    //삭제
    const deleteNotice = (notice_id) => {
        if (window.confirm(`정말로 삭제하시겠습니까?`)) {
            // 삭제 로직 구현
            axios.delete(`${baseUrl}/deletenotice/${notice_id}`, config)
                .then((response) => {
                    console.log(response.data)
                })
            alert(`삭제 ${notice_id}`);
        }
    }

    // id 키값 받아서 그 항목만 출력
    const handleToggleText = (notice_id) => {
        setNotices((prevNotices) =>
            prevNotices.map((notice) =>
                notice.notice_id === notice_id
                    ? { ...notice, showText: !notice.showText }
                    : notice
            )
        );
    };

    useEffect(() => {
        axios.get(`${baseUrl}/selectallnotice`, config)  // 공지사항 전체출력하는 컨트롤러
            .then((response) => {
                console.log(response.data)
                setNotices(response.data)

            })
    }, []);

    return (
        <>
            <div style={{ width: '100%', height: '188px' }}></div>
            <div style={{ margin: 'auto', width: '800px', height:'70vh' }}>
                <p className={style.main_title}>
                    <span className={style.red}>현재 등록된 공지사항</span>
                    <div className={style.line}></div>
                </p>

                {notices ? 
                    notices.slice((currentPage - 1) * noticesPerPage, currentPage * noticesPerPage).map((notice) => (
                    <>
                    <div key={notice.notice_id}>
                        {/* <div className={style.line}></div> */}
                        <div className={style.notice}>
                            <div
                                className={style.notice_set}
                                onClick={() => handleToggleText(notice.notice_id)}
                            >
                                <div className={style.title}>{notice.title}</div>
                                <div className={style.date}>{notice.date}</div>
                            </div>
                            {notice.showText && (
                                <div className={style.text}>
                                    <div className='mb-5'>{notice.content}</div>
                                    <Button className='mr-2' onClick={() => window.location.href = `/adminmodifynotice/${notice.notice_id}`}>수정</Button>
                                    <Button onClick={() => deleteNotice(notice.notice_id)}>삭제</Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <Page
                    noticesPerPage={noticesPerPage}
                    totalNotices={notices.length}
                    paginate={paginate}
                    currentPage={currentPage}
                    /> */}
                    </>
                )) : (<div className='text-center' style={{marginBottom:'300px', marginTop:'100px', fontWeight:'bold', fontSize:'18px'}}>등록된 공지사항이 없습니다.</div>)}
            
                <div className={style.line}></div>
                    <Page
                        noticesPerPage={noticesPerPage}
                        totalNotices={notices.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                
                
            </div>
        </>
    );
};
export default EditNotice;
