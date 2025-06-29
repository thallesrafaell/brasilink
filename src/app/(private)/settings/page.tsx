import HeaderPrivatePages from "@/components/headerPrivatePages";
import SettingsForm from "@/components/settingsForm";
import { createClient } from "@/lib/supabase/server";

const SettingsPage = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const metaData = data.user?.user_metadata;
  const appMetadata = data.user?.app_metadata;

  console.log("User data:", data.user);
  const userMetadata = {
    avatar_url: String(metaData?.avatar_url ?? ""),
    email: String(data.user?.email ?? ""),
    full_name: String(metaData?.full_name ?? ""),
    name: String(metaData?.name ?? ""),
    picture: String(metaData?.picture ?? ""),
    provider: String(appMetadata?.provider ?? ""),
  };

  return (
    <div>
      <HeaderPrivatePages
        title="Settings"
        description="Config your settings here"
      />
      <div className="flex justify-center">
        <SettingsForm userMetadata={userMetadata} />
      </div>
    </div>
  );
};

export default SettingsPage;
