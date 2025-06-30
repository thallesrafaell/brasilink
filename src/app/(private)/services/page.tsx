import getServices from "@/actions/services/getServices";
import { AddServiceSheet } from "@/components/addServiceSheet";
import { DataTable } from "@/components/dataTable";
import HeaderPrivatePages from "@/components/headerPrivatePages";
import { ScrollArea } from "@/components/ui/scroll-area";

import { serviceColumns } from "./_columns";

const MyServicesPage = async () => {
  const response = await getServices();
  const services = JSON.parse(JSON.stringify(response));

  return (
    <div className="container mx-auto flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <HeaderPrivatePages
          title="My Services"
          description="Manage your services here."
        />
        <AddServiceSheet />
      </div>
      <ScrollArea className="w-full flex-1">
        <div>
          <DataTable columns={serviceColumns} data={services} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default MyServicesPage;
