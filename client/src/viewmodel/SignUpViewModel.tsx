import React from "react";
import { useRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";

import { signUpState } from "../model/signUpModel";

import { SignUpView } from "../view/SignUpView";
import { Modal } from "../components/Modal";

import { LOCAL_API } from "../utils/axios";
import { validateLetter, validateLength } from "../utils/validation";

import "../utils/style/SignUp.scss";

type UserData = {
  responseType?: string;
  email: string;
  authId: string;
  profileImageUrl: string;
  snsType: string;
};

export function SignUpViewModel() {
  const [signUp, setSignUp] = useRecoilState(signUpState);
  const location = useLocation();
  const navigate = useNavigate();

  const { authId, email, profileImageUrl, snsType } = location.state as UserData;

  const signUpEventHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nickName = (event.target as HTMLInputElement).parentElement!.querySelector("input")!.value;

    if (!validateLetter(nickName) || !validateLength(nickName)) {
      alert("최소 2자 이상 최대 12자 이하(영문, 한글, 숫자)로 입력해 주세요.");
      return;
    }

    LOCAL_API.get(`/members/${nickName}`)
      .then(() => {
        const formData = new FormData();
        formData.append("authId", authId);
        formData.append("email", email);
        formData.append("nickName", nickName);
        formData.append("profileImageUrl", profileImageUrl);
        formData.append("snsType", snsType);

        LOCAL_API.post("/members", formData)
          .then(() => {
            alert("회원가입 완료");
            navigate("/");
          })
          .catch((err) => {
            const { message } = err.response.data.fieldErrors[0];
            alert(message);
          });
      })
      .catch(() => {
        alert("이미 존재하는 닉네임입니다.");
      });
  };

  return (
    <Modal showModal={signUp} setShowModal={setSignUp}>
      <SignUpView profileSrc={profileImageUrl} email={email} signUpEventHandler={signUpEventHandler} />
    </Modal>
  );
}
