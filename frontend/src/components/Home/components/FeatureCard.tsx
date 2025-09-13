import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import FeatureCardBullet from "./FeatureCardBullet";

export type BulletProps = {
  color: "primary" | "secondary" | "destructive" | "muted";
  text: string;
};

type FeatureCard = {
  title: string;
  description: string;
  icon: React.ReactNode;
  bullets: BulletProps[];
};

const FeatureCard = ({ title, description, icon, bullets }: FeatureCard) => {
  return (
    <Card className="border-2 hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {bullets.map((bullet, index) => (
            <FeatureCardBullet
              key={index}
              color={bullet.color}
              text={bullet.text}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
