"use client";

import { Button } from "@nextui-org/react";
import Input from "app/components/base/Input";
import PasswordInput from "app/components/base/PasswordInput";
import type { Register } from "utils/types"; // Fix: Change the import statement to a type-only import
import { login } from "app/actions/login";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

export default function RegisterForm() {

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<Register>();

  const onSubmit: SubmitHandler<Register> = async (data, ev) => {
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
        <div className="flex flex-col gap-y-1">
          <h2 className="font-semibold">Bienvenido a Claros Village!</h2>
          <h3 className="font-medium text-gray-600">
            Ya tenes cuenta? <Link href="/auth/login">Logueate aca</Link>
          </h3>
        </div>
        <div className="flex flex-col gap-y-3 w-1/2 ">
          <Input
            label="Nombre completo"
            placeholder="Introduce tu nombre completo"
            {...register("name", { required: true })}
          />
          <Input
            type="email"
            label="Correo Electrónico"
            placeholder="Escribe tu correo electrónico"
            {...register("email", { required: true })}
          />
          <PasswordInput
            label="Contraseña"
            placeholder="Escribe tu contraseña"
            {...register("password", { required: true })}
          />
          <PasswordInput
            label="Confirmar Contraseña"
            placeholder="Escribe nuevamente tu contraseña"
            {...register("password_confirm", { required: true })}
          />
          <div className="w-full text-right">
            <Button radius="sm" className="w-fit bg-main-green text-white" type="submit">
              Registrarse
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
