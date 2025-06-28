import { NotFoundCard } from "@/components/notFoundCard";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-primary text-center text-4xl font-bold">
        Brasilink<span className="text-muted-foreground text-sm">&copy;</span>
      </h1>
      <NotFoundCard />
    </div>
  );
};

export default NotFoundPage;
