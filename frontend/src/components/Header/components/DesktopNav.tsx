import React from "react";
import { useRouter } from "next/navigation";
import { cx } from "class-variance-authority";
import { Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { getInitial } from "@/helpers/getInitial";

const DesktopNav = ({ className }: React.ComponentPropsWithoutRef<"div">) => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const initial = getInitial(user?.name);

  const classNames = cx("items-center gap-4", className);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className={classNames}>
      {!isAuthenticated ? (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/login")}
            className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 cursor-pointer"
          >
            Login
          </Button>
          <Button
            onClick={() => router.push("/register")}
            className="bg-primary hover:bg-primary/90 px-3 py-2 cursor-pointer"
          >
            Registro
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span
            title={user?.name}
            className="font-semibold text-sm rounded-full w-8 h-8 bg-secondary/10 border flex items-center justify-center"
          >
            {initial}
          </span>
          <Button
            onClick={handleLogout}
            className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 cursor-pointer"
          >
            Cerrar sesión
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={() => (location.href = "/tasks")}
          >
            <Plus className="w-4 h-4" />
            Nueva Tarea
          </Button>
        </div>
      )}
    </div>
  );
};

export default DesktopNav;
