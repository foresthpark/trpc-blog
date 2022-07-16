import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import LoginForm from "../components/LoginForm";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../components/LoginForm"), {
  ssr: false,
});

export default function RegisterPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
