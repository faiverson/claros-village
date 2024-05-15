import React, {forwardRef} from 'react';
import { InputProps, Input as UIInput } from "@nextui-org/react";

const Input = forwardRef(({variant, radius, color, ...restProps}: InputProps, inputRef: React.ForwardedRef<HTMLInputElement>) => {
    const themeColor: string = !color || color === 'primary' ? 'main-green' : color;

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
              {...restProps}
              ref={inputRef}
            />;
  });

export default Input;
