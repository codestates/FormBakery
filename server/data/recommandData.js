/*
    reco type = phone, event, goods, feedback
*/
module.exports = {
  default: {
    title: "이름없는 설문지 제목",
    subTitle: "",
    questions: [
      {
        question: "제목없는 질문",
        type: "radio",
        order: 1,
        section: 1,
        isNeccessary: "n",
        formOptions: ["옵션 1"],
      },
    ],
  },
  phone: {
    title: "연락처 정보",
    subTitle: "연락처 정보 소제목",
    questions: [
      {
        question: "이름",
        type: "short",
        order: 1,
        section: 1,
        isNeccessary: "n",
      },
      {
        question: "연락처",
        type: "short",
        order: 2,
        section: 1,
        isNeccessary: "n",
      },
      {
        question: "주소",
        type: "short",
        order: 3,
        section: 1,
        isNeccessary: "n",
      },
      {
        question: "의견",
        type: "long",
        order: 4,
        section: 1,
        isNeccessary: "n",
      },
    ],
  },
  event: {
    title: "행사 등록",
    subTitle: "행사 등록 소제목",
    questions: [
      {
        question: "이름",
        type: "short",
        order: 1,
        section: 1,
        isNeccessary: "n",
      },
      {
        question: "이메일",
        type: "short",
        order: 2,
        section: 1,
        isNeccessary: "n",
      },
      {
        question: "소속",
        type: "short",
        order: 3,
        section: 1,
        isNeccessary: "n",
      },
      {
        question: "참석일자",
        type: "check",
        order: 4,
        section: 1,
        isNeccessary: "n",
        formOptions: ["1일차", "2일차", "3일차", "4일차"],
      },
      {
        question: "현장에서 등록료($$)를 지불해야 한다는 것을 이해합니다.",
        type: "check",
        order: 5,
        section: 1,
        isNeccessary: "y",
        formOptions: ["예"],
      },
    ],
  },
  goods: {
    title: "신발 신청",
    subTitle: "신발 신청 소제목",
    questions: [
      {
        question: "이름",
        type: "short",
        order: 1,
        section: 1,
        isNeccessary: "n",
      },
      {
        question: "사이즈",
        type: "radio",
        order: 2,
        section: 1,
        isNeccessary: "y",
        formOptions: ["S", "M", "L", "XL", "XXL"],
      },
      {
        question: "의견",
        type: "long",
        order: 3,
        section: 1,
        isNeccessary: "n",
      },
    ],
  },
  feedback: {
    title: "서비스 피드백",
    subTitle: "서비스 피드백 소제목",
    questions: [
      {
        question: "이름",
        type: "short",
        order: 1,
        section: 1,
        isNeccessary: "n",
      },
      {
        question: "담당자 이름",
        type: "short",
        order: 2,
        section: 1,
        isNeccessary: "y",
      },
      {
        question: "만족도 정도를 선택해 주세요",
        type: "radio",
        order: 3,
        section: 1,
        isNeccessary: "y",
        formOptions: ["상", "중", "하"],
      },
      {
        question: "기타 의견",
        type: "long",
        order: 4,
        section: 1,
        isNeccessary: "n",
      },
    ],
  },
};
