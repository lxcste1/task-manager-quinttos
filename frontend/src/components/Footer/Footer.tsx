import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t py-8 px-4">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Quinttos Challenge | Developed by{" "}
          <Link
            href={"https://www.linkedin.com/in/tellolucas"}
            target="_blank"
            className="underline"
          >
            lxcste
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
