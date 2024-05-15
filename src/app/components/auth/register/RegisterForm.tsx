"use client";

import { useState } from "react";
import { Button, Modal, ModalHeader, ModalContent, ModalBody, ModalFooter } from "@nextui-org/react";
import Input from "app/components/base/Input";
import PasswordInput from "app/components/base/PasswordInput";
import type { Register } from "utils/types"; // Fix: Change the import statement to a type-only import
import type { User } from '@prisma/client'
import signUp from "app/actions/register";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {useTranslations} from 'next-intl';

export default function RegisterForm() {
  const router = useRouter();

  const t = useTranslations('RegisterForm');

  const {
    register,
    handleSubmit,
    setError,
    formState: { isDirty, errors },
  } = useForm<Register>();
  const [verified, setVerified] = useState<User>();

  const onSubmit: SubmitHandler<Register> = async (data, ev) => {
    if (isDirty) {
      const response = await signUp(data);
      console.log(response);
      if(response.error) {
        if(response.key === 'user_exist' || response.key === 'resident_not_found') {
          setError('email', { type: 'custom', message: t(response.key) });
        } else {
          // replace with toast
          setError('name', { type: 'custom', message: t('error') });
        }
      } else {
        setVerified(response.data);
      }
    }
  };
  const handleCloseConfirmation = () => {
    setVerified(undefined);
    router.push('/');
  };

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
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            {...register("name", { required: true })}
          />
          <Input
            type="email"
            label="Correo Electrónico"
            placeholder="Escribe tu correo electrónico"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            {...register("email", { required: true })}
          />
          <PasswordInput
            label="Contraseña"
            autoComplete="new-password"
            placeholder="Escribe tu contraseña"
            {...register("password", { required: true })}
          />
          <PasswordInput
          id="password_confirm"
            label="Confirmar Contraseña"
            autoComplete="new-password"
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

      {!!verified && <Modal
        backdrop="opaque"
        isOpen={!!verified}
        onClose={handleCloseConfirmation}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Falta solo un poco!</ModalHeader>
              <ModalBody>Revise su correo {verified.email} para finalizar su registro.</ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>}
    </form>
  );
}
