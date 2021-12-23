import Image from "next/image";
import styles from "../styles/Home.module.css";
import App from "../components/App";
import Header from "../components/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../reducers/store/user";
import axios from "axios";
import Alert from "../components/Alert";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
    const dispatch = useDispatch();
    const router = useRouter();
    const signupQuery = router.query.signup;
    const signoutQuery = router.query.signout;

    // 로그인 유무
    const isLogin = useSelector(({ user }: any) => user.login);
    const email = useSelector(({ user }: any) => user.userInfo.email);

    // create Form 요청
    const createNewForm = () => {
        // 새로운 폼 아이디 생성
        if (isLogin) {
            const fomrId = uuidv4();
            axios
                .put(
                    `https://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/form/create/${fomrId}`,
                    { email: email }
                )
                .then((res) => {
                    router.push(`/forms/${res.data.data.id}`);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            router.push({
                pathname: "/auth/login",
                query: {
                    createNewForm: true,
                },
            });
            setTimeout(() => {
                dispatch(setAlert(true));
            }, 50);
        }
    };
    return (
        <>
            <App />
            <Header />
            <main className="mt-2">
                <div className="text-center bg-slate-600 text-white py-8 space-y-10 shadow-md">
                    <div className="space-y-6 text-2xl">
                        <p>
                            Form Bakery helps to simplify and distribute the
                            survey form you want
                        </p>
                        <p>Create your own survey and share url with</p>
                        <p>participants to collect and analyze information!</p>
                    </div>
                    <button
                        className="bg-sky-500 rounded-md px-3 py-3 text-sm hover:shadow hover:font-semibold transition-all"
                        onClick={createNewForm}
                    >
                        CREATE NEW FORM
                    </button>
                </div>
                <div className="text-center space-y-6">
                    <h1 className="font-bold text-xl mt-5">
                        Form Recommandation
                    </h1>
                    <div>
                        <Image
                            src="/formRecommandaiton.png"
                            alt="formBakery Logo"
                            width={1300}
                            height={200}
                        />
                    </div>
                </div>
            </main>
            <footer className={`mt-5 ${styles.footer}`}>
                <p className="tracking-wide text-sm">
                    <strong className="mr-3">Made by</strong>
                    <Image
                        src="/codestate.png"
                        alt="codestate-logo"
                        width={20}
                        height={10}
                    />{" "}
                    codeBaker
                </p>
            </footer>
            <Alert
                title={
                    signupQuery
                        ? "회원가입"
                        : signoutQuery
                        ? "계정삭제"
                        : "로그인"
                }
                subTitle={
                    signupQuery
                        ? "회원가입에 성공하셨습니다. "
                        : signoutQuery
                        ? "계정이 완전히 삭제되었습니다."
                        : "로그인 하였습니다."
                }
            />
        </>
    );
}
