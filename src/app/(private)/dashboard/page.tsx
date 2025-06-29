import LogoutButton from "@/components/logoutButton";
import { createClient } from "@/lib/supabase/server"; // Adjust the import path as necessary

const DashboardPage = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  const email = data.session?.user.email;
  const id = data.session?.user.id;
  const userMetadata = data.session?.user.user_metadata;

  return (
    <div className="flex h-screen flex-col items-center justify-center p-32">
      <h1 className="mb-4 text-4xl font-bold">Dashboard</h1>
      <p className="text-lg">Welcome to your dashboard! {email}</p>
      <p className="text-lg">Your User ID: {id}</p>
      {/** nao quer exibir o name quero vero o que tem user metadata */}
      <p className="text-lg">
        Your User Metadata: {JSON.stringify(userMetadata)}
      </p>
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
