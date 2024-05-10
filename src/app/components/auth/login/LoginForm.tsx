"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Image, Input } from "@nextui-org/react";
import type { Login } from "utils/types"; // Fix: Change the import statement to a type-only import
import { login } from "app/actions/login";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async (data, ev) => {
    ev?.preventDefault();

    console.log(data);
    if (isDirty) {
      console.log(data);
      const response = await login(data);
      console.log(response);
    }
  };

  console.log(errors);

  return (
    <form
      id="login-form"
      name="login-form"
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-y-8">
        <div className="flex flex-col space-y-1">
          <h2 className="font-semibold">Bienvenido a Claros Village!</h2>
          <h2 className="font-medium text-gray-600">
            Inicie sesión en su cuenta
          </h2>
          <h3 className="font-medium text-gray-600">
            No tenes cuenta? <Link href="/auth/register">Registrate aca</Link>
          </h3>
        </div>
        <div className="flex flex-col gap-y-3 ">
          <Input
            type="email"
            label="Email"
            variant="bordered"
            placeholder="Enter your email"
            radius="sm"
            className="max-w-xs"
            {...register("email", { required: true })}
          />
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            radius="sm"
            className="max-w-xs"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeIcon className="pointer-events-none text-2xl text-default-400" />
                ) : (
                  <EyeSlashIcon className="pointer-events-none text-2xl text-default-400" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            {...register("password", { required: true })}
          />
          <Button radius="sm" className="max-w-xs bg-main-green text-white" type="submit">
            Entrar
          </Button>
        </div>
      </div>
    </form>
  );
}
