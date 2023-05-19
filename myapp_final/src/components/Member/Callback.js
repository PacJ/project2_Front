import axios from 'axios';
import React, { useEffect } from 'react';


const Callback = () => {

    useEffect(() => {
        const sendPostRequest = async () => {
            try {

                await axios.post("http://localhost:8090/test");
                window.close(); // 창 닫기
            } catch (error) {
                console.log(error);
            }
        };

        sendPostRequest();
    }, []);

    return <></>;
};

export default Callback;
