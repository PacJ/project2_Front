import { baseUrl } from "Apiurl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../../assets/css/analysis.module.css";

const SimilarUsers = () => {
  const { member_id } = useParams();
  const [simMembers, setSimMembers] = useState([]);

  // const recMember = [...simMembers];
  console.log(simMembers && simMembers);
  useEffect(() => {
    axios
      .get(`${baseUrl}/analysis/${member_id}`)
      .then((response) => {
        setSimMembers(response.data.simMemberList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(simMembers && simMembers);
  return (
    <>
      <div style={{ margin: "10px  auto 0 auto", width: "700px" }}>
        <div className={style.box2}>
          <div className={style.content}>
            <p className={style.title}>나와 취향이 비슷한 유저</p>
            <div className={style.ranking2}>
              <div className={style.rank_left}>
                {/* <div id="rank1" className={style.rankprofile}> */}
                <div
                  className={style.rankpro_left}
                  style={{ display: simMembers.length > 0 ? "" : "none" }}
                >
                  <a
                    href={`${process.env.PUBLIC_URL}/profile/${
                      simMembers.length > 0 && simMembers[0].member_id
                    }`}
                  >
                    <img
                      className={style.rank_img}
                      src={`${process.env.PUBLIC_URL}/profiles/${
                        simMembers.length > 0
                          ? simMembers[0].profile_path
                          : "defaultImg.png"
                      }`}
                    />
                  </a>
                </div>
                <div className={style.rankpro_right}>
                  <p className={style.rankpro_name}>
                    {simMembers.length > 0 ? simMembers[0].nickname : ""}
                  </p>
                  <p>
                    {simMembers.length > 0 &&
                      `${simMembers[0].common_genres}장르・${
                        (simMembers[0].common_genres / 5) * 100
                      }%일치`}
                  </p>
                </div>
                {/* </div> */}
                <div className={style.line}></div>
                {/* <div id="rank2" className={style.rankprofile}> */}
                <div
                  className={style.rankpro_left}
                  style={{ display: simMembers.length > 1 ? "" : "none" }}
                >
                  <a
                    href={`${process.env.PUBLIC_URL}/profile/${
                      simMembers.length > 1 && simMembers[1].member_id
                    }`}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/profiles/${
                        simMembers.length > 1 && simMembers[1].profile_path
                      }`}
                    />
                  </a>
                </div>
                <div className={style.rankpro_right}>
                  <p className={style.rankpro_name}>
                    {simMembers.length > 1 ? simMembers[1].nickname : ""}
                  </p>
                  <p>
                    {simMembers.length > 0 &&
                      `${simMembers[1].common_genres}장르・${
                        (simMembers[1].common_genres / 5) * 100
                      }%일치`}
                  </p>
                </div>
                {/* </div> */}
                <div className={style.line}></div>
                {/* <div id="rank2" className={style.rankprofile}> */}
                <div
                  className={style.rankpro_left}
                  style={{ display: simMembers.length > 2 ? "" : "none" }}
                >
                  <a
                    href={`${process.env.PUBLIC_URL}/profile/${
                      simMembers.length > 2 && simMembers[2].member_id
                    }`}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/profiles/${
                        simMembers.length > 2 && simMembers[2].profile_path
                      }`}
                    />
                  </a>
                </div>
                <div className={style.rankpro_right}>
                  <p className={style.rankpro_name}>
                    {simMembers.length > 2 ? simMembers[2].nickname : ""}
                  </p>
                  <p>
                    {simMembers.length > 0 &&
                      `${simMembers[2].common_genres}장르・${
                        (simMembers[2].common_genres / 5) * 100
                      }%일치`}
                  </p>
                </div>
                {/* </div> */}
              </div>

              <div
                className={style.rank_right}
                style={{ display: simMembers.length > 3 ? "" : "none" }}
              >
                {/* <div id="rank1" className={style.rankprofile}> */}
                <div className={style.rankpro_left}>
                  <a
                    href={`${process.env.PUBLIC_URL}/profile/${
                      simMembers.length > 3 && simMembers[3].member_id
                    }`}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/profiles/${
                        simMembers.length > 3 && simMembers[3].profile_path
                      }`}
                    />
                  </a>
                  {simMembers.length > 0 &&
                    simMembers.map((member, index) =>
                      console.log(member.profile_path, member.member_id)
                    )}
                </div>
                <div className={style.rankpro_right}>
                  <p className={style.rankpro_name}>
                    {simMembers.length > 3 ? simMembers[3].nickname : ""}
                  </p>
                  <p>
                    {simMembers.length > 3
                      ? `${simMembers[3].common_genres}장르・${
                          (simMembers[3].common_genres / 5) * 100
                        }%일치`
                      : ""}
                  </p>
                </div>
                {/* </div> */}
                <div className={style.line}></div>

                <div
                  className={style.rankpro_left}
                  style={{ display: simMembers.length > 4 ? "" : "none" }}
                >
                  <a
                    href={`${process.env.PUBLIC_URL}/profile/${
                      simMembers.length > 4 && simMembers[4].member_id
                    }`}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/profiles/${
                        simMembers.length > 4 && simMembers[4].profile_path
                      }`}
                    />
                  </a>
                </div>
                <div className={style.rankpro_right}>
                  <p className={style.rankpro_name}>
                    {simMembers.length > 4 ? simMembers[4].nickname : ""}
                  </p>
                  <p>
                    {simMembers.length > 4
                      ? `${simMembers[4].common_genres}장르・${
                          (simMembers[4].common_genres / 5) * 100
                        }%일치`
                      : ""}
                  </p>
                </div>
                <div className={style.line}></div>

                <div
                  className={style.rankpro_left}
                  style={{ display: simMembers.length > 5 ? "" : "none" }}
                >
                  <a
                    href={`${process.env.PUBLIC_URL}/profile/${
                      simMembers.length > 5 && simMembers[5].member_id
                    }`}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/profiles/${
                        simMembers.length > 5 && simMembers[5].profile_path
                      }`}
                    />
                  </a>
                </div>
                <div className={style.rankpro_right}>
                  <p className={style.rankpro_name}>
                    {simMembers.length > 5 ? simMembers[5].nickname : ""}
                  </p>
                  <p>
                    {simMembers.length > 5
                      ? `${simMembers[5].common_genres}장르・${
                          (simMembers[5].common_genres / 5) * 100
                        }%일치`
                      : ""}
                  </p>
                </div>
                {/* </div> */}
                {/* )} */}
              </div>
              {/* <div className={style.rank_right}> */}
              {/* <div id="rank1" className={style.rankprofile}> */}

              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimilarUsers;
