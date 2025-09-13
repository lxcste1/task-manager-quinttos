import Hamburger from "@/components/ui/hamburger";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { navData } from "../data/navigationData";
import { useRouter } from "next/navigation";

const MobileNav = ({ className }: React.ComponentPropsWithoutRef<"div">) => {
  const { isAuthenticated, login, logout } = useAuth();

  const router = useRouter();

  return (
    <div className={className}>
      <Hamburger side="left" closeOnNavigate>
        <Hamburger.Trigger aria-label="Abrir menú" />
        <Hamburger.Panel className="max-w-sm">
          {isAuthenticated ? (
            <>
              {navData.map((item) => (
                <Hamburger.Item key={item.href} {...item}>
                  {item.text}
                </Hamburger.Item>
              ))}
              <Hamburger.Item onClick={logout}>Cerrar sesión</Hamburger.Item>
            </>
          ) : (
            <Hamburger.Item onClick={() => router.push("/login")}>
              Iniciar sesión
            </Hamburger.Item>
          )}
          <div className="mt-auto pt-2 text-xs text-neutral-500">
            © {new Date().getFullYear()} Quinttos Challenge | Developed by
            lxcste
          </div>
        </Hamburger.Panel>
      </Hamburger>
    </div>
  );
};

export default MobileNav;
