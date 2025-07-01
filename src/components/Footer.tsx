interface FooterProps {
  name: string;
  subtitle: string;
  location: string;
  phone: string;
  email: string;
}

export const Footer = ({
  name,
  subtitle,
  location,
  phone,
  email,
}: FooterProps) => {
  return (
    <footer className="bg-gray-900 px-4 py-8 text-white dark:bg-gray-950">
      <div className="mx-auto max-w-6xl text-center">
        <h3 className="mb-2 text-2xl font-bold">{name}</h3>
        <p className="mb-4 text-gray-400 dark:text-gray-500">{subtitle}</p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-400 dark:text-gray-500">
          <span>{location}</span>
          <span>•</span>
          <span>{phone}</span>
          <span>•</span>
          <span>{email}</span>
        </div>
      </div>
    </footer>
  );
};
