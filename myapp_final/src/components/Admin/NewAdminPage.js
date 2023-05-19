import { Fragment, useEffect, useState } from 'react';
import style from '../../assets/css/notice.module.css';
import axios from 'axios';
import { baseUrl } from 'Apiurl';
import { Button } from 'reactstrap';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';


const NewAdminPage = () => {

    const [reports, setReports] = useState("")
    const [showText, setShowText] = useState(false); // state to keep track of whether text should be shown or hidden
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [reportsPerPage, setReportsPerPage] = useState(5); // 페이지당 공지사항 개수


    //체크박스

    const [spoilerChecked, setSpoilerChecked] = useState(false);
    const [profanityChecked, setProfanityChecked] = useState(false);
    const [completedChecked, setCompletedChecked] = useState(false);
    const [filter, setFilter] = useState("");


    // 페이지네이션 처리 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 현재 페이지에 해당하는 공지사항 배열
    const indexOfLastNotice = currentPage * reportsPerPage;
    const indexOfFirstNotice = indexOfLastNotice - reportsPerPage;
    const currentNotices = reports.slice(indexOfFirstNotice, indexOfLastNotice);


    const [rend, setRender] = useState("")

    // id 키값 받아서 그 항목만 출력


    // config 헤더 정의
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
        },
    };
    //삭제
    const deleteReport = (movie_id, member_id) => {
        if (window.confirm(`정말로 삭제하시겠습니까?`)) {
            setRender({ movie_id: movie_id, member_id: member_id })
            // 삭제 로직 구현
            axios.delete(`${baseUrl}/deletereport/${movie_id}/${member_id}`, config)
                .then((response) => {
                    console.log(response.data)
                })
            alert(`삭제 ${member_id}`);
        }
    }

    // id 키값 받아서 그 항목만 출력
    const handleToggleText = (movie_id, member_id) => {
        setReports((prevReports) =>
            prevReports.map((report) =>
                report.movie_id == movie_id && report.member_id == member_id
                    ? { ...report, showText: !report.showText }
                    : { ...report, showText: false }
            )
        );
    };
    const spoilerReport = (movie_id, member_id) => {
        const info = { movie_id: movie_id, member_id: member_id }
        setRender({ movie_id: movie_id, member_id: member_id })

        // 스포일러 로직 구현
        axios.post("http://localhost:8090/spoilerreport", info, config)
            .then(
                alert("스포일러 처리완료")
            )

    }
    const reReport = (movie_id, member_id) => {
        const info = { movie_id: movie_id, member_id: member_id }
        setRender({ movie_id: movie_id, member_id: member_id })

        // 스포일러 로직 구현
        axios.post("http://localhost:8090/returnreport", info, config)
            .then(
                alert("반려 처리 완료")
            )

    }


    // 체크박스

    const handleSpoilerChange = (event) => {
        setSpoilerChecked(event.target.checked);


    };

    const handleProfanityChange = (event) => {
        setProfanityChecked(event.target.checked);



    };

    const handleCompletedChange = (event) => {
        setCompletedChecked(event.target.checked);


    };

    useEffect(() => {
        axios.post("http://localhost:8090/reportpage", null, config)
            .then((response) => {
                console.log(response.data)
                setReports(response.data)
            })
    }, [rend]);

    return (
        <>
            <div style={{ width: '100%', height: '188px' }}></div>
            <div style={{ margin: 'auto', width: '800px', height: '70vh' }}>
                <div className={style.main_title}>
                    <span className={style.red}>현재 등록된 공지사항</span>
                    {/* <div className={style.line}></div> */}
                </div>
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={spoilerChecked}
                                onChange={handleSpoilerChange}
                            />
                        }
                        label="스포일러"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={profanityChecked}
                                onChange={handleProfanityChange}
                            />
                        }
                        label="욕설"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={completedChecked}
                                onChange={handleCompletedChange}
                            />
                        }
                        label="처리 완료"
                    />
                </div>

                {reports ?
                    reports.filter((report) => {
                        if (spoilerChecked && profanityChecked && completedChecked) {
                            return report.state === 2 || report.state === 3 || report.state === 4;
                        }
                        if (spoilerChecked && profanityChecked) {
                            return report.state === 3 || report.state === 4;
                        }
                        if (spoilerChecked && completedChecked) {
                            return report.state === 2 || report.state === 4;
                        }
                        if (profanityChecked && completedChecked) {
                            return report.state === 2 || report.state === 3;
                        }
                        if (spoilerChecked) {
                            return report.state === 4;
                        }
                        if (profanityChecked) {
                            return report.state === 3;
                        }
                        if (completedChecked) {
                            return report.state === 2;
                        }

                        return true; // 기본적으로 모든 상태를 출력하도록 함
                    })
                        .slice((currentPage - 1) * reportsPerPage, currentPage * reportsPerPage)
                        .map((report, index) => (

                            <Fragment key={index}>
                                <div>
                                    <div className={style.line}></div>
                                    <div className={style.notice}>
                                        <div
                                            className={style.notice_set}
                                            onClick={() => handleToggleText(report.movie_id, report.member_id)}
                                        >
                                            {report.state === 3 && (
                                                <div className={style.title}>욕설</div>
                                            )}
                                            {report.state === 4 && (
                                                <div className={style.title}>스포일러</div>
                                            )}
                                            {report.state === 2 && (
                                                <div className={style.title}>처리완료</div>
                                            )}
                                            <div className={style.title}>{report.title}</div>
                                            <div className={style.date}>{report.member_id}    {report.nickname}</div>

                                        </div>
                                        {report.showText && (
                                            <div className={style.text}>
                                                <div className='mb-5'>{report.content}</div>
                                                {/* <Button className='mr-2' onClick={() => window.location.href = `/adminmodifynotice/${notice.notice_id}`}>수정</Button> */}

                                                {report.state === 3 && (
                                                    <>

                                                        <Button onClick={() => deleteReport(report.movie_id, report.member_id)}>삭제</Button>
                                                        <Button onClick={() => reReport(report.movie_id, report.member_id)}>반려</Button>
                                                    </>
                                                )}

                                                {report.state === 4 && (
                                                    <>
                                                        <Button onClick={() => spoilerReport(report.movie_id, report.member_id)}>처리</Button>
                                                        <Button onClick={() => reReport(report.movie_id, report.member_id)}>반려</Button>
                                                    </>
                                                )}
                                                {report.state === 2 && (
                                                    <div>스포일러 처리완료</div>
                                                )}

                                            </div>
                                        )}
                                    </div>
                                </div>


                            </Fragment>



                        )) : (<div className='text-center' style={{ marginBottom: '300px', marginTop: '100px', fontWeight: 'bold', fontSize: '18px' }}>등록된 공지사항이 없습니다.</div>)}

                <div className={style.line}></div>





            </div>
        </>
    );
};

export default NewAdminPage;
