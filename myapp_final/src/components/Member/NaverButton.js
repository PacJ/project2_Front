import axios from 'axios';
import React, { useRef } from 'react';
import NaverLogin from 'react-naver-login';

const NaverButton = () => {
    const responseNaver = async (response) => {
        console.log(response); // 응답 데이터 확인
        // 여기에서 로그인 성공 후의 작업을 수행할 수 있습니다.
        console.log(response.email);
        console.log(response.age);

        const newMember = {
            nickname: response.nickname,
            email: response.email,
            password: '0000',
            gender: response.gender,
            age_range: response.age,
            name: response.name,
        };

        let a = response.id;

        localStorage.setItem("naver", a);

        console.log(a);

        const config = {
            // config는 axios에서 API 호출 시 설정할 header 정보를 저장합니다
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const input = {
            email: 'user!$' + response.email,
            password: '0000'
        }
        
        await axios.post("http://localhost:8090/naverregister", newMember, config)

        await axios.post("http://localhost:8090/login", input, config)
            .then((response) => {
                console.log('response: ', response.data);
                //let jwtToken = response.headers['Authorization'];
                let jwtToken = response.headers.get('Authorization');
                console.log(jwtToken);

                let jwtMemberId = response.data.member_id;
                let jwtMemberName = response.data.name;
                let jwtMemberNickname = response.data.nickname;
                let jwtMemberEmail = response.data.email;
                let jwtAuthRole = response.data.authRole;
                let jwtProfile_path = response.data.profile_path;
                let jwtGrade = response.data.grade;
                localStorage.setItem('Authorization', jwtToken);
                localStorage.setItem('member_id', jwtMemberId);
                localStorage.setItem('email', jwtMemberEmail);
                localStorage.setItem('name', jwtMemberName);
                localStorage.setItem('nickname', jwtMemberNickname);
                localStorage.setItem('authRole', jwtAuthRole);
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem("profile_path", jwtProfile_path);
                localStorage.setItem("grade", jwtGrade);


            });
            await axios.post("http://localhost:8090/check", localStorage.getItem("member_id"), config)
            .then((response) => {
                // window.location.replace('/');
                if (response.data > 0) {
                    window.location.replace('/')
                } else {
                    window.location.replace('/genreselect')
                }
                console.log(response.data)
            })

            .catch((err) => {
                console.error(err.message);
            });

        window.close(); // 요청 완료 후 창 닫기

    };

    return (
        <NaverLogin
            clientId="FAbbNCBvp4UTv5jUkuBz"
            callbackUrl="http://localhost:3000/login"
            onSuccess={responseNaver}
            onFailure={responseNaver}
            popup={true} // 팝업 대신 리다이렉트 방식으로 동작
            render={({ onClick }) => (
                <img
                    alt='네이버로그인'
                    src={require('assets/img/btnG_N.png')}
                    style={{ width: 60, cursor:'pointer' }}
                    onClick={onClick}
                />
            )}
        />
    );
};

export default NaverButton;
