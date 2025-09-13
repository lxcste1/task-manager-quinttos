import React from "react";

type FeatureCardBulletProps = {
  color: "primary" | "secondary" | "destructive" | "muted";
  text: string;
};

const FeatureCardBullet = ({ color, text }: FeatureCardBulletProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className={`w-2 h-2 bg-${color} rounded-full`}></div>
      {text}
    </div>
  );
};

export default FeatureCardBullet;
