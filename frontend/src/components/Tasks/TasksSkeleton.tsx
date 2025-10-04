import { v4 as uuidv4 } from "uuid";
import { cx } from "class-variance-authority";
import SkeletonItem from "./SkeletonItem";

export const TasksSkeleton = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const classNames = cx("space-y-3", className);

  return (
    <div className={classNames} aria-hidden {...props}>
      {[0, 1, 2].map(() => (
        <SkeletonItem key={uuidv4()} />
      ))}
    </div>
  );
};
