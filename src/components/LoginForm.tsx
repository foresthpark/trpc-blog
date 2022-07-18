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

  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");

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

  const submitEmail = async (data: CreateUserInput) => {
    console.log("🚀 ~ file: LoginForm.tsx ~ line 44 ~ onSubmit ~ data", data);
    mutate({ ...data, redirect: router.asPath });
  };

  return (
    <>
      <div className="h-screen flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="mt-8">
              <div className="mt-6">
                <form
                  onSubmit={handleSubmit(submitEmail)}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        typeof="email"
                        placeholder="example@email.com"
                        {...register("email")}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isLoading ? "Sending OTP to email..." : "Get OTP"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
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
      <Link href="/register">Register</Link> */}
    </>
  );
}
