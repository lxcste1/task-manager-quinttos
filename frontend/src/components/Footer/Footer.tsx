import React from "react";

const Footer = () => {
  return (
    <footer className="border-t py-8 px-4">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Quinttos Challenge | Developed by
          lxcste
        </p>
      </div>
    </footer>
  );
};

export default Footer;
