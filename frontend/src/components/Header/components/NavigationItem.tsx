import React from "react";

type NavigationItemProps = React.ComponentPropsWithoutRef<"a"> & {
  text: string;
};

const NavigationItem = ({
  href,
  className,
  text,
  ...props
}: NavigationItemProps) => {
  return (
    <a href={href} className={className} {...props}>
      {text}
    </a>
  );
};

export default NavigationItem;
