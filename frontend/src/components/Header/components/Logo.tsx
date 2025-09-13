import { CheckCircle } from "lucide-react";
import React from "react";

type LogoProps = {
  title: string;
  subtitle: string;
};

const Logo = ({ title, subtitle }: LogoProps) => {
  return (
    <>
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <CheckCircle className="w-5 h-5 text-primary-foreground" />
      </div>
      <div className="flex flex-col items-end">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <span className="text-[12px]">{subtitle}</span>
      </div>
    </>
  );
};

export default Logo;
