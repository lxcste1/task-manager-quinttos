import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const SkeletonItem = () => {
  return (
    <Card className="border border-border">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Skeleton className="h-[16px] w-[16px] rounded-[4px] bg-primary/10" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col flex-1 gap-3">
                <Skeleton className="h-[16px] w-[200px] rounded-[4px] bg-primary/10" />
                <Skeleton className="h-[16px] w-[230px] rounded-[4px] bg-primary/10" />
                <div className="flex items-center gap-4 mt-3">
                  <Skeleton className="h-[20px] w-[55px] rounded-[4px] bg-primary/10" />
                  <Skeleton className="h-[20px] w-[55px] rounded-[4px] bg-primary/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonItem;
