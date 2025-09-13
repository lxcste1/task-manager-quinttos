import React from "react";
import { statsCardData } from "./data/statsData";
import StatsCard from "../common/StatsCard";
import ProgressCard from "../common/ProgressCard";

const StatsSection = () => {
  const cols = statsCardData.length;
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Panel de Estadísticas</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mantén el control de tu productividad con métricas detalladas y
            visualizaciones claras
          </p>
        </div>

        <div className={`grid md:grid-cols-${cols} gap-6 mb-8`}>
          {statsCardData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              description={stat.description}
              icon={stat.icon}
              classNames={{
                cardContainer: "text-center",
                cardTitle: `text-3xl font-bold text-${stat.textColor}`,
                cardIcon: `w-16 h-16 bg-${stat.iconColor} rounded-full flex items-center justify-center mx-auto mb-2`,
              }}
            />
          ))}
        </div>
        <ProgressCard />
      </div>
    </section>
  );
};

export default StatsSection;
