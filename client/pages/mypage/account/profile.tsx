import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import MypageHeader from "../../../components/layout/MypageHeader";
import AccountLeftPannel from "../../../components/layout/AccountLeftPannel";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, modifyUserInfo, setAccessToken, setAlert } from "../../../reducers/store/user";
import { useRouter } from "next/router";
import Alert from "../../../components/Alert";
import { IconButton } from "@material-ui/core";
import App from "../../../components/App";

interface IShowDropDown {
    userInfo: boolean;
    image: boolean;
}

interface IUserInfo {
    name: string;
    nickname: string;
}

const Proflie = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    // 유저 정보
    const user = useSelector(({ user }: any) => user.userInfo);
    // 유저 accessToken
    const accessToken = useSelector(({ user }: any) => user.userToken.accessToken);

    // 드롭다운 보임 유무
    const [showDropDown, setShowDropDown] = useState<IShowDropDown>({
        userInfo: true,
        image: false,
    });

    const toggleDropDown = (e: any): void => {
        if (e.target.id === "userInfo") {
            setShowDropDown({
                ...showDropDown,
                userInfo: !showDropDown.userInfo,
            });
        } else if (e.target.id === "image") {
            setShowDropDown({
                ...showDropDown,
                image: !showDropDown.image,
            });
        }
    };

    // 회원정보 관련
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        name: user.name,
        nickname: user.nickname,
    });

    // 회원정보 수정
    const setState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "name") {
            setUserInfo({
                ...userInfo,
                name: e.target.value,
            });
        } else if (e.target.id === "nickname") {
            setUserInfo({
                ...userInfo,
                nickname: e.target.value,
            });
        }
    };

    // 저장버튼 활성화 유무
    const [isDisable, setIsDisable] = useState<boolean>(false);

    useEffect(() => {
        if (userInfo.name === "" || userInfo.nickname === "") {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [userInfo]);

    // 사진 업로드
    const onChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files) {
            const uploadFile = e.target.files[0];
            const formData = new FormData();
            formData.append("files", uploadFile);

            await axios({
                method: "put",
                url: "/api/files/images",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        }
    };

    // 회원정보 수정요청
    const requestModifyUserInfo = (): void => {
        axios
            .put(
                `https://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/user/updateUserInfo/${user.email}`,
                {
                    name: userInfo.name,
                    nickname: userInfo.nickname,
                },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                }
            )
            .then((res) => {
                // 만료된 access 토큰이 아닐 경우 userInfo를 업데이트 한다.
                dispatch(modifyUserInfo(userInfo));
                setAlertId("userInfo");
                setTimeout(() => {
                    dispatch(setAlert(true));
                }, 50);
            })
            .catch((err) => {
                // 만료된 access 토큰일 경우 refresh 토큰을 조회한다.
                if (err.response.data.message === "invalid access token") {
                    axios
                        .post("https://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/user/accessTokenRequest", null, {
                            withCredentials: true,
                        })
                        .then((response) => {
                            // refresh token이 만료되지 않은 경우 userInfo, accessToken 업데이트
                            dispatch(setUserInfo(response.data.data.userInfo));
                            dispatch(setAccessToken(response.data.data.accessToken));
                            alert("accessToken 재발급 성공");
                        })
                        .catch((error) => {
                            // refresh token이 만료 된 경우 로그아웃 상태 초기화
                            console.log(error);
                            // if (
                            //     error.response.data.message ===
                            //     "invalid refresh token, please log in again"
                            // ) {
                            //     dispatch(logout());
                            //     router.push({
                            //         pathname: "/auth/login",
                            //         query: {
                            //             invaildRefreshToken: true,
                            //         },
                            //     });
                            //     setTimeout(() => {
                            //         dispatch(setAlert(true));
                            //     }, 50);
                            // }
                        });
                }
            });
    };

    // 알림창 회원정보수정, 프로필사진 구분
    const [alertId, setAlertId] = useState<string>("");

    return (
        <>
            <App />
            <MypageHeader />
            <main className="mt-1 text-center py-8">
                <div className="inline-flex w-222">
                    <AccountLeftPannel />
                    <div className="w-5/6 text-left pl-4">
                        <p className="text-lg font-semibold">프로필 설정</p>
                        <div className="mt-5">
                            <div className={`flex items-center p-4 w-96 justify-between border-2 border-slate-300 ${showDropDown.userInfo ? "rounded-t-md" : "rounded-md"}`}>
                                <div className="font-semibold">회원정보 수정</div>
                                {showDropDown.userInfo ? (
                                    <IconButton
                                        size={"small"}
                                        onClick={(e) => {
                                            toggleDropDown(e);
                                        }}
                                    >
                                        <KeyboardArrowUp id="userInfo" className={`text-gray-500 hover:text-black`} />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        size={"small"}
                                        onClick={(e) => {
                                            toggleDropDown(e);
                                        }}
                                    >
                                        <KeyboardArrowDown id="userInfo" className={`text-gray-500 hover:text-black`} />
                                    </IconButton>
                                )}
                            </div>
                            <div className={`w-96 overflow-hidden border-2 -mt-0.5 border-slate-300 border-t-0 rounded-b-md text-center transition-all space-y-5 ${showDropDown.userInfo ? "p-4 h-80 opacity-100" : "p-0 h-0 opacity-0 border-0"}`}>
                                <div className="space-y-1">
                                    <p className="text-gray-600 text-sm text-left font-semibold">이메일</p>
                                    <p className="text-gray-600 text-sm text-left">{user.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray-600 text-sm text-left font-semibold">이름</p>
                                    <input
                                        id="name"
                                        className="border-2 border-slate-200 block w-full h-10 rounded-md pl-2 outline-main text-sm"
                                        type={"text"}
                                        placeholder="변경할 이름을 입력해주세요"
                                        value={userInfo.name}
                                        onChange={(e) => {
                                            setState(e);
                                        }}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray-600 text-sm text-left font-semibold">닉네임</p>
                                    <input
                                        id="nickname"
                                        className="border-2 border-slate-200 block w-full h-10 rounded-md pl-2 outline-main text-sm"
                                        type={"text"}
                                        placeholder="변경할 닉네임을 입력해주세요"
                                        value={userInfo.nickname}
                                        onChange={(e) => {
                                            setState(e);
                                        }}
                                    />
                                </div>
                                <div className="text-right relative top-4">
                                    <button
                                        className={`w-36 h-10 rounded-md   text-sm font-semibold ${isDisable ? "bg-slate-100 text-slate-300 border-0" : "border-slate-500 text-slate-500 border-2"}`}
                                        disabled={isDisable}
                                        onClick={requestModifyUserInfo}
                                    >
                                        저장
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className={`flex items-center p-4 w-96 justify-between border-2 border-slate-300 ${showDropDown.image ? "rounded-t-md" : "rounded-md"}`}>
                                <div className="font-semibold">프로필 사진</div>
                                {showDropDown.image ? (
                                    <IconButton
                                        size={"small"}
                                        onClick={(e) => {
                                            toggleDropDown(e);
                                        }}
                                    >
                                        <KeyboardArrowUp id="image" className={`text-gray-500 hover:text-black`} />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        size={"small"}
                                        onClick={(e) => {
                                            toggleDropDown(e);
                                        }}
                                    >
                                        <KeyboardArrowDown id="image" className={`text-gray-500 hover:text-black`} />
                                    </IconButton>
                                )}
                            </div>
                            <div className={`w-96 overflow-hidden border-2 -mt-0.5 border-slate-300 border-t-0 rounded-b-md text-center transition-all ${showDropDown.image ? "p-4 h-80 opacity-100" : "p-0 h-0 opacity-0 border-0"}`}>
                                <div className="inline-block w-56 h-56 rounded-full border-2 border-slate-300 overflow-hidden">
                                    <Image src="/profile.png" alt="user" width={224} height={224} className="rounded-full" />
                                </div>
                                <form className="text-right mt-5">
                                    <button className={`w-36 h-10 rounded-md border-2 border-slate-500 text-slate-500 text-sm font-semibold relative`}>
                                        사진 업로드
                                        <label htmlFor="profile-upload" />
                                        <input className="bg-red-200 w-36 h-10 overflow-hidden absolute top-0 left-0 z-10 opacity-0" type="file" id="profile-upload" accept="image/*" onChange={onChangeImg} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Alert title={alertId === "userInfo" ? "회원정보 수정" : "프로필 사진"} subTitle={alertId === "userInfo" ? "회원정보가 수정되었습니다." : "프로필 사진이 수정되었습니다."} />
        </>
    );
};

export default Proflie;
