import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Form,
  Input,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { baseUrl } from 'Apiurl';

const AdminPage = () => {
  const [Reports, setReports] = useState([{ member_id: 0, content: '' }]);
  const [info, setInfo] = useState({});
  const [spoilerReports, setSpoilerReports] = useState([
    { member_id: 0, content: '' },
  ]);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
    },
    //header에 권한 추가해야함.
  };
  console.log(localStorage.getItem('Authorization'));

  // 스포일러 댓글 블러 처리 로직
  // const handleSpoilerBlur = (id) => {
  //   // const updatedReports = spoilerReports.filter((report) => {
  //   //   if (report.id === id) {
  //   //     return { ...report, content: '블러 처리된 내용' }; // 블러 처리된 내용으로 변경
  //   //   }
  //   //   return report;
  //   // });
  //   // setSpoilerReports(updatedReports);
  //   //
  //   // 스포일러 댓글 블러 처리 로직

  //   //
  //   const updatedSpoilers = spoilerReports.filter(
  //     (report) => report.member_id !== id
  //   ); // 선택한 댓글을 제외한 나머지 댓글들로 새로운 배열 생성
  //   console.log(updatedSpoilers);
  //   setSpoilerReports(updatedSpoilers);
  // };

  //button을 눌러서 블러 처리되는 기능을 디비에 넣는 기능
  const handleSpoilerBlur = async (member_id, movie_id) => {
    if (member_id && movie_id) {
      const newInfo = {
        member_id: member_id,
        movie_id: movie_id,
      };

      setInfo(newInfo);

      await axios.put(`${baseUrl}/blur`, newInfo, config);

      const updatedSpoilers = spoilerReports.map((report) => {
        if (report.member_id === member_id) {
          return { ...report, content: '블러 처리된 내용' }; // 블러 처리된 내용으로 변경
        }
        return report;
      });

      setSpoilerReports(updatedSpoilers);
   }
  };


  const handleSpoilerReturn = async (member_id, movie_id) => {
    if (member_id && movie_id) {
      const newInfo = {
        member_id: member_id,
        movie_id: movie_id,
      };

      setInfo(newInfo);

      axios.put(`${baseUrl}/return`, newInfo, config);

      const updatedSpoilers = spoilerReports.map((report) => {
        if (report.member_id === member_id) {
          return { ...report, content: '블러 처리된 내용' }; // 블러 처리된 내용으로 변경
        }

        return report;
      });

      setSpoilerReports(updatedSpoilers);
    }
  };
  

  const handleReportDelete = async (member_id, movie_id) => {
    // 욕설 댓글 삭제 처리 로직
    if (member_id && movie_id) {
      const newInfo = {
        member_id: member_id,
        movie_id: movie_id,
      };

      setInfo(newInfo);

      await axios
        .delete(
          `http://localhost:8090/deletereview/${member_id}/${movie_id}`, config)
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    axios
      // back쪽 getmapping된 주소로 요청을 한다. -> back쪽 코드가 실행된다.
      .get('http://localhost:8090/adminpage', config)

      // back쪽에서 처리된 정보를 response로 가져온다.
      .then((response) => {
        //console.log(로 들고 온 정보 출력(콘솔에 확인차))

        //신고된 댓글에 가져온 욕설 댓글 리스트를 담는다.
        setReports(response.data.editReport);

        //스포일러 댓글에 가져온 리스트를 담는다.
        setSpoilerReports(response.data.editSpoiler);
        console.log(response.data.editReport);
        console.log(response.data.editSpoiler);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(Reports);
    console.log(spoilerReports);
  }, [info]);

  //get post할떄 axios또는fetch를 사용해야함.
  // 프론트에서 백쪽으로 요청을 보내주는 역할을 함
  // console.log(Reports.length > 0 ? Reports[0].member_id : null);

  return (
    <div
      className=''
      style={{
        backgroundColor: 'white',
        marginTop: '180px',
        marginBottom: '150px',
      }}
    >
      <Container>
        <div className='pb-5'>
          <h2 className='pb-4' style={{ color: 'black' }}>
            욕설 신고 목록
          </h2>
          <div
            className='reports1'
            style={{ border: '1px solid black', padding: '2px' }}
          >
            {Reports && Reports.length > 0 ? (
              Reports.map((report) => (
                <div key={report.review_id}>
                  <li>{report.content}</li>
                  <Button
                    color='danger'
                    size='sm'
                    onClick={() =>
                      handleReportDelete(report.member_id, report.movie_id)
                    }
                    style={{
                      marginRight: '1px',
                      marginLeft: '2px',
                      padding: '1px',
                    }}
                  >
                    댓글삭제
                  </Button>
                </div>
              ))
            ) : (
              <p className='d-flex justify-content-center py-5'>
                욕설 신고된 코멘트가 없습니다.
              </p>
            )}
          </div>
        </div>

        <div className='pb-5'>
          <h2 className='pb-4' style={{ color: 'black' }}>
            스포일러 신고 목록
          </h2>
          <div
            className='reports2'
            style={{ border: '1px solid black', padding: '2px' }}
          >
            {spoilerReports && spoilerReports.length > 0 ? (
              spoilerReports.map((spoilerreport) => (
                <div key={spoilerreport.member_id}>
                  <li>{spoilerreport.member_id}</li>
                  {spoilerreport.state !== 1 &&
                  spoilerreport.state !== 3 &&
                  spoilerreport.state === 2 ? (
                    <li>블러처리</li>
                  ) : (
                    <>
                      <li>{spoilerreport.content}</li>
                      <Button
                        color='danger'
                        size='sm'
                        onClick={() =>
                          handleSpoilerBlur(
                            spoilerreport.member_id,
                            spoilerreport.movie_id
                          )
                        }
                        style={{
                          marginRight: '1px',
                          marginLeft: '2px',
                          padding: '1px',
                        }}
                      >
                        블러처리
                      </Button>
                    </>
                  )}

                  {spoilerreport.state === 4 ? (
                    <>
                      <Button
                        color='danger'
                        size='m'
                        style={{
                          marginRight: '1px',
                          marginLeft: '2px',
                          padding: '1px',
                        }}
                        onClick={() =>
                          handleSpoilerReturn(
                            spoilerreport.member_id,
                            spoilerreport.movie_id
                          )
                        }
                      >
                        반려처리
                      </Button>
                      <br></br>
                    </>
                  ) : (
                    <>
                      <br></br>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className='d-flex justify-content-center py-5'>
                스포일러 신고된 코멘트가 없습니다.
              </p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminPage;
