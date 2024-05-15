import React, {forwardRef} from 'react';
import { InputProps, Input as UIInput } from "@nextui-org/react";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const PasswordInput = forwardRef(({variant, radius, color, ...restProps}: InputProps, inputRef: React.ForwardedRef<HTMLInputElement>) => {
  const themeColor: string = !color || color === 'primary' ? 'main-green' : color;

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return <UIInput
            variant={variant || "bordered"}
            radius={radius || "sm"}
            color={color || "primary"}
            classNames={{
              inputWrapper: [
                `border-${themeColor}/40`,
                `hover:bg-${themeColor}/10`,
              ],
            }}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashIcon className="pointer-events-none text-2xl text-default-400 w-6" />
                ) : (
                  <EyeIcon className="pointer-events-none text-2xl text-default-400 w-6" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            {...restProps}
            ref={inputRef}
          />;
});

export default PasswordInput;
