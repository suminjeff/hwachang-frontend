"use client";
import Link from "next/link";
import MainPageContent from "./ui/component/organism/mainpage-content";
import Form from "./ui/component/molecule/form/form-index";
import { authenticate } from "./business/auth/login";

export default function Home() {

  return (
    <main className="flex h-screen">
      {/* 왼쪽 절반 */}
      <MainPageContent />

      {/* 오른쪽 절반 */}
      <div className="flex w-1/2 h-full items-center justify-center bg-white px-4 dark:bg-gray-950">
        <div className="w-full max-w-md space-y-6">
          <p className="flex flex-col justify-center items-center text-center text-3xl text-[#1FAB89]">
            로그인
          </p>
          {/* 로그인 Form 영역 */}
          <div className="w-full space-y-10">
            <Form action={authenticate} id={"logIn"} failMessageControl={"alert"} >
                {/* className="flex flex-col gap-4 items-center"> */}
              {/* 아이디 input */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="username" className="font-bold">
                  아이디
                </label>
                <Form.TextInput
                  id="username"
                  className="border rounded-xl p-3"
                  placeholder="아이디를 입력하세요"
                />
              </div>
              {/* 비밀번호 input */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password" className="font-bold">
                  비밀번호
                </label>
                <Form.PasswordInput
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  label=""
                />
              </div>
              <Form.SubmitButton
                className={`text-white w-1/2 py-4 rounded-lg`}
                label="로그인"
              />
            </Form>
            <div className="flex justify-center gap-5">
              <span
                style={{
                  color: "#6E6E6E",
                }}
              >
                혹시 화창이 처음이신가요?
              </span>
              <Link href={"/signup"}>
                <span
                  className="font-bold hover:underline"
                  style={{
                    color: "#1FAB89",
                  }}
                >
                  회원 가입
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
