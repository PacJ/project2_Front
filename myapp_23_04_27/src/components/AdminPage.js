import React, { useEffect, useState } from "react";
import user from "../../assets/img/user.jpg";
import unlock from "../../assets/img/unlock.png";
import axios from "axios";

import { baseUrl } from "../../apiurl";

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
} from "reactstrap";

const AdminPage = () => {
  const [Reports, setReports] = useState([
    // { id: 1, content: '댓글1' },
    // { id: 2, content: '댓글2' },
    // { id: 3, content: '댓글3' },
    // 댓글 욕설 신고 목록 데이터를 가져오거나 설정하는 로직을 구현 setreports가
    //reports안에 있는 내용을 수정해줄수 있게 하는 함수임
  ]);

  const [spoilerReports, setSpoilerReports] = useState([
    // { id: 1, content: '댓글4' },
    // { id: 2, content: '댓글5' },
    // { id: 3, content: '댓글6' },
    // 스포일러 신고 목록 데이터를 가져오거나 설정하는 로직을 구현
  ]);

  // 스포일러 댓글 블러 처리 로직
  const handleSpoilerBlur = (id) => {
    const updatedReports = spoilerReports.map((report) => {
      if (report.id === id) {
        return { ...report, content: "블러 처리된 내용" }; // 블러 처리된 내용으로 변경
      }
      return report;
    });
    setSpoilerReports(updatedReports);
  };

  // 욕설 댓글 삭제 처리 로직
  const handleReportDelete = (id) => {
    const updatedReports = Reports.filter((report) => report.id !== id); // 선택한 댓글을 제외한 나머지 댓글들로 새로운 배열 생성
    setReports(updatedReports);
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };

  useEffect(() => {
    axios.get("http://localhost:8090/adminpage", config).then((response) => {
      console.log(response.data);
    });
  }, []);

  //get post할떄 axios또는fetch를 사용해야함.
  // 프론트에서 백쪽으로 요청을 보내주는 역할을 함

  return (
    <div>
      <Container>
        <div>
          <h2 style={{ color: "black" }}>댓글 욕설 신고 목록</h2> <br />
          <br />
        </div>

        <div className="reports1" style={{ border: "1px solid black" }}>
          {Reports.map((report) => (
            <div key={report.id}>
              <li>{report.content}</li>
              <Button
                color="danger"
                size="sm"
                onClick={() => handleReportDelete(report.id)}
              >
                삭제
              </Button>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ color: "black" }}>스포일러 신고 목록</h2>

          <br />
        </div>

        <div className="reports2" style={{ border: "1px solid black" }}>
          {spoilerReports.map((spoilerreport) => (
            <div key={spoilerreport.id}>
              <li>{spoilerreport.content}</li>
              <Button
                color="danger"
                size="sm"
                onClick={() => handleSpoilerBlur(spoilerreport.id)}
              >
                블러 처리
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AdminPage;

// return
//   <div>
//     <Container>
//       <div>
//         <h2 style={{ color: 'black' }}>댓글 욕설 신고 목록</h2> <br />
//         <br />
//       </div>

//       <div className='reports1' style={{ border: '1px solid black' }}>
//         {Reports.map((report) => (
//           <li key={report.id}>{report.content}</li>
//         ))}
//         {/* 배열 메서드인 map 이용  아이디는 들어가있지만 출력이되진 않음 */}
//       </div>

//       <div>
//         <h2 style={{ color: 'black' }}>스포일러 신고 목록</h2>

//         <br />
//       </div>

//       <div className='reports2' style={{ border: '1px solid black' }}>
//         {spoilerReports.map((spoilerreport) => (
//           <li key={spoilerreport.id}>{spoilerreport.content}</li>
//         ))}
//       </div>
//     </Container>
//   </div>
