"use client";
import NavLinks from "./nav-link";
import Image from "next/image";
import Logo from "@/app/utils/public/Logo.png";
import People from "@/app/utils/public/People.png";
import Link from "next/link";
import { useCustomerStore } from "@/app/stores/customerStore";
import { logoutCustomer } from "@/app/business/auth/customer/customer-auth-logout";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  const { customerName } = useCustomerStore();
  const logout = () => {
    logoutCustomer();
    router.push("/");
  }

  return (
    <div className="flex h-full flex-col bg-hwachang-darkgreen">
      <div className="flex h-32 justify-center items-center">
        <Link href="/customer/main">
          <Image src={Logo} alt="Logo" width={110} height={100} className="mt-5" />
        </Link>
      </div>

      <div className="flex grow justify-between flex-col space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-emerald-10 md:block"></div>
        <div className="flex items-center ml-5 mb-5">
          <Image src={People} alt="Profile" width={50} height={50} className="ml-4 mr-4 mb-5" />
          <span className="text-white text-lg mr-8 mb-5 sm:text-base">{customerName}님</span>{" "}
          <button
            className="bg-hwachang-darkgreen text-white text-base font-bold ml-auto mr-5 mb-5"
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
