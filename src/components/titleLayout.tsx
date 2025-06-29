"use client";

import { usePathname } from "next/navigation";

const TitleLayout = () => {
  const pathName = usePathname();
  const formattedPath = pathName
    .replace(/^\//, "") // Remove leading slash
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

  return (
    <span className="text-muted-foreground flex items-center gap-4 text-sm font-bold">
      {">  "} {formattedPath}
    </span>
  );
};

export default TitleLayout;
