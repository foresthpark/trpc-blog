import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  const { isLoading, data, error } = trpc.useQuery([
    "users.verify-otp",
    {
      hash,
    },
  ]);

  if (isLoading) {
    return <p>Verifying...</p>;
  }

  // router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");

  return <p>Redirecting...</p>;
}

export default function LoginForm() {
  const [success, setSuccess] = useState(false);
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();
  const hash = router.asPath.split("#token=")[1];

  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  const { mutate, error, isLoading } = trpc.useMutation(["users.request-otp"], {
    onError: (err) => {},
    onSuccess: (data) => {
      setSuccess(true);
    },
  });

  const onSubmit = async (data: CreateUserInput) => {
    mutate({ ...data, redirect: router.asPath });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <input
          typeof="email"
          placeholder="example@email.com"
          {...register("email")}
        />
        <br />

        <button type="submit">Login</button>
        {success && <h1 className="text-orange-600">Check your email</h1>}
        {error && <h1 className="text-red-500">{error.message}</h1>}
      </form>
      <Link href="/register">Register</Link>
    </>
  );
}
