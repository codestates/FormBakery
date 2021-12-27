import React, { useEffect } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserInfo,
  setAccessToken,
  logout,
  setAlert,
} from "../reducers/store/user";
import { useRouter } from "next/router";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // 리덕스_typescript는 후에 적용하겠습니다.
  const accessToken = useSelector(
    ({ user }: any) => user.userToken.accessToken
  );

  // 모든 페이지에서 redux에 저장된 accessToken을 조회한다.
  useEffect((): void => {
    if (accessToken) {
      axios
        .post("https://nspark.shop/user/getUserInfo", null, {
          headers: {
            Authorization: accessToken,
          },
          withCredentials: true,
        })
        .then((res) => {
          dispatch(setUserInfo(res.data.data.userInfo));
        })
        .catch((err) => {
          // refresh token도 만료가 됐을경우 로그아웃을 시킨다.
          if (
            err.response.data.message ===
            "invalid refresh token, please log in again"
          ) {
            dispatch(logout());
            router.push({
              pathname: "/auth/login",
              query: {
                invaildRefreshToken: true,
              },
            });
            setTimeout(() => {
              dispatch(setAlert(true));
            }, 50);
          }
        });
    }
  }, []);
  return (
    <>
      <Head>
        <title>Form Bakery</title>
        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
        <meta name="keyword" content="Form Bakery, free Form" />
        <meta name="description" content="first codestate team project" />
        <meta name="author" content="codeBaker" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.ico" />
      </Head>
    </>
  );
};

export default App;
