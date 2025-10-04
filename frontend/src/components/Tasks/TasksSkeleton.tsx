import { cx } from "class-variance-authority";
import SkeletonItem from "./SkeletonItem";

export const TasksSkeleton = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const classNames = cx("space-y-3", className);

  return (
    <div className={classNames} aria-hidden {...props}>
      {[0, 1, 2].map((i) => (
        <SkeletonItem key={i} />
      ))}
    </div>
  );
};
