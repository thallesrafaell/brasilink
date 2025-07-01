import { ModeToggle } from "@/components/toggleTheme";

export const FixedThemeToggle = () => {
  return (
    <div className="fixed top-4 right-4 z-50 rounded-full bg-white/20 p-1 shadow-lg backdrop-blur-sm">
      <ModeToggle />
    </div>
  );
};
