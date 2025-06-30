import LogoutButton from "@/components/logoutButton";
import { createClient } from "@/lib/supabase/server";

const DashboardPage = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.user_metadata?.email || "No email found";
  const name = data.user?.user_metadata?.name || "No name found";
  const id = data.user?.id || "No user ID found";
  return (
    <div className="flex h-screen flex-col items-center justify-center p-32">
      <h1 className="mb-4 text-4xl font-bold">Dashboard</h1>
      <p className="text-lg">Your User ID: {id}</p>
      <p className="text-lg">Welcome to your dashboard! {name}</p>
      <p className="text-lg">Your email: {email}</p>
      <p className="text-lg">This is a private page.</p>
      <p className="text-lg">
        You can only access this page if you are logged in.
      </p>
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
