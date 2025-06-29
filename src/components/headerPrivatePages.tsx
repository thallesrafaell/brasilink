import Title from "./title";

interface HeaderPrivatePagesProps {
  title: string;
  description: string;
}

const HeaderPrivatePages = ({
  title,
  description,
}: HeaderPrivatePagesProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Title title={title} />
      <span className="text-muted-foreground">{description}</span>
    </div>
  );
};

export default HeaderPrivatePages;
