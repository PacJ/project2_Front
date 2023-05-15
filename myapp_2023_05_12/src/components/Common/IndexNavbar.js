import React, { useState } from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import ComboBox from "./AutoComplete";
import { Link } from "react-router-dom";

function IndexNavbar({ transparent, isAdmin }) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const initialRender = React.useRef(true);
  const [admin, setAdmin] = useState(false);

  // 검색어 입력
  const [query, setQuery] = useState("");
  const handleInputChange = (value) => {
    setQuery(value);
  };

  // index일때는 transparent 적용, 그외 페이지는 bg-dark (scss/paper-kit/_navbars.scss/&.navbar-transparent 항목 수정)
  const updateNavbarColor = () => {
    if (
      transparent &&
      (document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299)
    ) {
      setNavbarColor("navbar-dark bg-dark");
    } else if (
      transparent &&
      (document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300)
    ) {
      setNavbarColor("navbar-transparent");
    } else if (!transparent && initialRender.current) {
      setNavbarColor("navbar-dark bg-dark");
    }
  };

  React.useEffect(() => {
    updateNavbarColor();
    initialRender.current = false;
    if (isAdmin) {
      setAdmin(true);
    }
    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, [transparent]); // 두번째 파라미터에 빈 배열을 넣어 최초 렌더링 이후에만 이벤트 리스너가 등록되도록 설정

  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/"
            title="부귀영화"
            style={{ margin: 0, padding: 0 }}
          >
            <img
              alt="..."
              src={require("assets/img/logo.gif")}
              style={{ width: "180px" }}
            />
          </NavbarBrand>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          {!admin && (
            <Nav navbar>
              {/* 네비 버튼 */}
              {/* <NavLink href="/search">[검색]</NavLink> */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* 자동완성 입력란! */}
                <ComboBox
                  style={{
                    height: "20px !important",
                    marginTop: "0px",
                    marginRight: "10px",
                    backgroundColor: "black",
                    opacity: "0.7",
                    color: "white",
                    borderRadius: "5px",
                    border: "none",
                    padding: "10px 10px",
                  }}
                  placeholder="검색어를 입력하세요..."
                  // 검색값 변동시 query값 변동
                  query={query}
                  onQueryChange={handleInputChange}
                />
                <NavLink
                  // 검색 경로
                  href={`/search/${encodeURIComponent(query)}`}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    right: "3%",
                    transform: "translateY(-50%)",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={require("assets/img/search.png")}
                    alt="검색 버튼"
                    style={{
                      width: "17px",
                      height: "17px",
                      filter: "invert(50%)",
                      marginLeft: "10px",
                    }}
                  />
                </NavLink>
              </div>
              {localStorage.getItem("member_id") !== null ? (
                <>
                  <NavItem>
                    <NavLink
                      href="/profile"
                      style={{
                        marginRight: 10,
                        marginLeft: 10,
                        fontSize: "11pt",
                      }}
                    >
                      {`${localStorage.getItem("nickname")} 님의 마이페이지`}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <Button
                      className="btn-round"
                      style={{ borderRadius: 3 }}
                      color="danger"
                      href="/logout"
                    >
                      LOGOUT
                    </Button>
                  </NavItem>
                </>
              ) : (
                <NavItem>
                  <Button
                    className="btn-round"
                    style={{ borderRadius: 3, marginLeft: 20 }}
                    color="danger"
                    href="/login"
                  >
                    LOGIN
                  </Button>
                </NavItem>
              )}
            </Nav>
          )}
          {admin && (
            <Nav navbar>
              {/* 네비 버튼 */}
              {/* <NavLink href="/search">[검색]</NavLink> */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* 자동완성 입력란! */}
                <NavItem>
                  <Button
                    className="btn-round"
                    style={{ borderRadius: 3, marginLeft: 10 }}
                    color="#212529"
                    href="/adminpage"
                  >
                    댓글 관리
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    className="btn-round"
                    style={{ borderRadius: 3, marginLeft: 10 }}
                    color="#212529"
                    href="/admineditinfo"
                  >
                    관리자 정보 수정
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    className="btn-round"
                    style={{ borderRadius: 3, marginLeft: 10 }}
                    color="#212529"
                    href="/adminnotice"
                  >
                    공지사항작성
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    className="btn-round"
                    style={{ borderRadius: 3, marginLeft: 10 }}
                    color="#212529"
                    href="/admineditnotice"
                  >
                    공지사항관리
                  </Button>
                </NavItem>
              </div>
              {localStorage.getItem("adminId") !== null ? (
                <>
                  <NavItem>
                    <NavLink
                      href="/profile"
                      style={{
                        marginRight: 10,
                        marginLeft: 10,
                        fontSize: "11pt",
                      }}
                    >
                      {` 환영합니다. ${localStorage.getItem(
                        "adminName"
                      )} 관리자님`}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <Button
                      className="btn-round"
                      style={{ borderRadius: 3 }}
                      color="danger"
                      href="/logout"
                    >
                      LOGOUT
                    </Button>
                  </NavItem>
                </>
              ) : (
                <NavItem>
                  <Button
                    className="btn-round"
                    style={{ borderRadius: 3, marginLeft: 20 }}
                    color="danger"
                    href="/login"
                  >
                    LOGIN
                  </Button>
                </NavItem>
              )}
            </Nav>
          )}
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
