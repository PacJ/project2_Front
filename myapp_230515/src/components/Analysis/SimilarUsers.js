import { baseUrl } from "Apiurl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../../assets/css/analysis.module.css";

const SimilarUsers = () => {
  const { member_id } = useParams();
  const [simMembers, setSimMembers] = useState([]);

  const recMember = [...simMembers];
  console.log(recMember);
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

  console.log(recMember.length > 0 ? recMember.profile_path : "없소");
  console.log(simMembers && simMembers);
  return (
    <>
      <div style={{ margin: "10px  auto 0 auto", width: "700px" }}>
        <div className={style.box2}>
          <div className={style.content}>
            <p className={style.title}>나와 취향이 비슷한 유저</p>
            <div className={style.ranking2}>
              <div className={style.rank_left}>
                <div id="rank1" className={style.rankprofile}>
                  <div className={style.rankpro_left}>
                    <img
                      className={style.rank_img}
                      src={`${process.env.PUBLIC_URL}/profiles/${
                        recMember.length > 0
                          ? recMember[0].profile_path
                          : "defaultImg.png"
                      }`}
                    />
                  </div>
                  <div className={style.rankpro_right}>
                    <p className={style.rankpro_name}>
                      {recMember.length > 0 ? recMember[0].nickname : ""}
                    </p>
                    <p>
                      {recMember.length > 0 ? recMember[0].common_genres : ""}
                      장르 일치
                      {/* <span style={{ fontWeight: "bold" }}>・</span>{" "}
                      {actor.length > 0 ? actor[0].actorRating_cnt : ""}편 */}
                    </p>
                  </div>
                </div>
                <div className={style.line}></div>
                <div id="rank2" className={style.rankprofile}>
                  <div className={style.rankpro_left}>
                    <img
                      src={`${process.env.PUBLIC_URL}/profiles/${
                        recMember && recMember[1].profile_path
                      }`}
                    />
                  </div>
                  <div className={style.rankpro_right}>
                    <p className={style.rankpro_name}>
                      {recMember.length > 0 ? recMember[1].nickname : ""}
                    </p>
                    <p>
                      {recMember.length > 0 ? recMember[1].common_genres : ""}
                      장르 일치
                      {/* <span style={{ fontWeight: "bold" }}>・</span>{" "}
                      {actor.length > 0 ? actor[1].actorRating_cnt : ""}편 */}
                    </p>
                  </div>
                </div>
                <div className={style.line}></div>
                <div id="rank2" className={style.rankprofile}>
                  <div className={style.rankpro_left}>
                    <img
                      src={`${process.env.PUBLIC_URL}/profiles/${
                        recMember && recMember[2].profile_path
                      }`}
                    />
                  </div>
                  <div className={style.rankpro_right}>
                    <p className={style.rankpro_name}>
                      {recMember.length > 0 ? recMember[2].nickname : ""}
                    </p>
                    <p>
                      {recMember.length > 0 ? recMember[2].common_genres : ""}
                      장르 일치
                      {/* <span style={{ fontWeight: "bold" }}>・</span>{" "}
                      {actor.length > 0 ? actor[2].actorRating_cnt : ""}편 */}
                    </p>
                  </div>
                </div>
              </div>
              <div className={style.rank_right}>
                <div id="rank1" className={style.rankprofile}>
                  <div className={style.rankpro_left}>
                    <img
                      src={`${process.env.PUBLIC_URL}/profiles/${
                        recMember && recMember[3].profile_path
                      }`}
                    />
                  </div>
                  <div className={style.rankpro_right}>
                    <p className={style.rankpro_name}>
                      {recMember.length > 0 ? recMember[3].nickname : ""}
                    </p>
                    <p>
                      {recMember.length > 0 ? recMember[3].common_genres : ""}
                      장르 일치
                      {/* <span style={{ fontWeight: "bold" }}>・</span>{" "} */}
                      {/* {actor.length > 0 ? actor[3].actorRating_cnt : ""}편 */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimilarUsers;
