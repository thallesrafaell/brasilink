import { PlusIcon } from "lucide-react";

import getServices from "@/actions/services/getServices";
import { DataTable } from "@/components/dataTable";
import HeaderPrivatePages from "@/components/headerPrivatePages";
import { Button } from "@/components/ui/button";

import { serviceColumns } from "./_columns";

const MyServicesPage = async () => {
  const response = await getServices();
  const services = JSON.parse(JSON.stringify(response));

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between">
        <HeaderPrivatePages
          title="My Services"
          description="Manage your services here."
        />
        <Button className="font-bold dark:text-white">
          <PlusIcon className="font-bold" />
          Add Service
        </Button>
      </div>
      <DataTable columns={serviceColumns} data={services} />
    </div>
  );
};

export default MyServicesPage;
