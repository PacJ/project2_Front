import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import KakaoLogin from 'react-kakao-login';
import { useNavigate } from 'react-router-dom';

const KakaoButton = () => {
    const [result, setResult] = useState({}); // result state 초기값 빈 객체로 설정,카카오 API에서 받아오는 데이터를 저장
    const navigator = useNavigate(); //   navigator는 react-router-dom에서 제공하는 Hook으로, 페이지 이동을 담당합니다.
    const [a, setA] = useState();
    const [kmember, setKmember] = useState({
        // kmember state는 카카오 회원가입을 위해 필요한 정보를 저장합니다.
        nickname: '',
        email: '',

        gender: '',
        age_range: '',
    });
    const config = {
        // config는 axios에서 API 호출 시 설정할 header 정보를 저장합니다
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const handleLoginSuccess = async (response) => {
        // 로그인 성공 시 처리할 로직을 작성하세요
        console.log(response);
        console.log(response.profile);
        const newMember = {
            nickname: response.profile.kakao_account.profile.nickname,
            email: response.profile.kakao_account.email,
            password: '0000',
            gender: response.profile.kakao_account.gender,
            age_range: response.profile.kakao_account.age_range,
        };
        let a = response.response.access_token
        localStorage.setItem("access_token", a)
        console.log(a)

        const config = {
            // config는 axios에서 API 호출 시 설정할 header 정보를 저장합니다
            headers: {
                'Content-Type': 'application/json',

            },
        };
        const input = {
            email: 'user!$' + response.profile.kakao_account.email,
            password: '0000'
        }

        await axios.post('http://localhost:8090/kakaoRegister', newMember, config)
            .then((response) => {

                console.log(response.response)
                console.log(response.data)

            });
        await axios.post('http://localhost:8090/login', input, config)
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
                localStorage.setItem("access_token", a);
                localStorage.setItem('Authorization', jwtToken);
                localStorage.setItem('member_id', jwtMemberId);
                localStorage.setItem('email', jwtMemberEmail);
                localStorage.setItem('name', jwtMemberName);
                localStorage.setItem('nickname', jwtMemberNickname);
                localStorage.setItem('authRole', jwtAuthRole);
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem("profile_path", jwtProfile_path);
                localStorage.setItem("grade", jwtGrade);


            })
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

        // setkmember({...kmemeber,[profile_nickname]:response.profile.kakao_account.profile})
        // axios.post('http://localhost:8090/kakaaRegister', kmember, config);
    };

    const handleLoginFailure = (error) => {
        // 로그인 실패 시 처리할 로직을 작성하세요
        console.error(error);
    };

    return (
        <KakaoLogin
            token='fd71cad81036bc5ee291298a6d39db39' // 여기에 카카오 애플리케이션의 키를 입력하세요
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            scope={['gender', 'age_range', 'account_email', 'profile_nickname']}
            render={(props) => <img
                alt='...'
                src={require('assets/img/btnG_K.png')}
                style={{ width: 60, margin: '0px 20px', cursor:'pointer'  }}
                onClick={props.onClick}
            />}
        />
    );
};

export default KakaoButton;