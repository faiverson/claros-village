import React from 'react';
import { Input as UIInput } from "@nextui-org/react";

const Input = ({ ...props }) => {
  const { variant, radius, color, ...restProps} = props;
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
          />;
};

export default Input;
