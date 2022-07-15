import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

export default function RegisterPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();

  // const { mutate, error, isLoading } = trpc.useMutation(
  //   ["users.register-user"],
  //   {
  //     onError: (err) => {},
  //     onSuccess: (data) => {
  //       router.push("/login");
  //     },
  //   }
  // );

  const onSubmit = async (data: CreateUserInput) => {
    // mutate(data);
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
        {/* {error && error.message} */}
      </form>
      <Link href="/register">Register</Link>
    </>
  );
}
