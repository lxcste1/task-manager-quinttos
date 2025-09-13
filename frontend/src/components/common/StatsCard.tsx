import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { makeSlotResolver, SlotsToClasses } from "@/types/slotsToClasses";

type Slots = "cardContainer" | "cardTitle" | "cardDescription" | "cardIcon";
type StatsCardProps = {
  title?: string | number;
  description?: string;
  icon?: React.ReactNode;
  classNames?: SlotsToClasses<Slots>;
};

const DEFAULTS: Record<Slots, string> = {
  cardContainer: "",
  cardIcon: "",
  cardTitle: "",
  cardDescription: "",
};

const StatsCard = ({
  title,
  description,
  icon,
  classNames,
}: StatsCardProps) => {
  const cx = makeSlotResolver<Slots>(DEFAULTS, classNames);

  return (
    <Card className={cx("cardContainer")}>
      <CardHeader>
        <div className={cx("cardIcon")}>{icon}</div>
        <CardTitle className={cx("cardTitle")}>{title}</CardTitle>
        <CardDescription className={cx("cardDescription")}>
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default StatsCard;
