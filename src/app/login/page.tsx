"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Image, Input } from "@nextui-org/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Login } from "utils/types";

export default function Login() {
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
    }
  };

  console.log(errors);

  return (
    <section className="flex flex-1 flex-col items-center p-4 md:p-0">
      <div className="flex h-full w-full items-center ">
        <div className="flex h-full w-full max-w-2xl flex-col items-center justify-center">
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
              </div>
              <div className="flex flex-col space-y-3 ">
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
                <Button radius="sm" className="max-w-xs" type="submit">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex w-1/2">
          <Image
            className="object-cover"
            isBlurred
            src="/static/img/photo-login-page.avif"
            alt="login page image"
          />
        </div>
      </div>
    </section>
  );
}
