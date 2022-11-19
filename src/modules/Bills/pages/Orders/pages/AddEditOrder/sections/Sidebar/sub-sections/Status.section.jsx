import { Input } from "components";
import { useQuery } from "components/TicketDetails/sections/Details/Details.section";
import { useSelector } from "react-redux";
import { SearchableField } from ".";

export const Status = () => {
  const { clients } = useSelector((state) => state?.users);
  const query = useQuery();
  const clientId = query.get("client");
  return (
    <div className="p-[32px] bg-[#1E1E2D] rounded-[8px]">
      <SearchableField
        name="assignedToClientId"
        placeholder="Search client"
        label="Client"
        data={clients}
        defaultValue={
          clients?.filter((client) => client.id === clientId)[0]?.fullName
        }
      />
      <Input
        name="paymentType"
        placeholder="Payment Type"
        type="select"
        label="Payment Type"
        className="mb-[20px]"
        options={[
          { label: "One Time", value: 0 },
          { label: "Recurring", value: 1 },
        ]}
      />
      <Input
        name="billingCycle"
        placeholder="Billing Cycle"
        type="select"
        label="Billing Cycle"
        options={[
          { label: "Hourly", value: 0 },
          { label: "Monthly", value: 1 },
          { label: "Quarterly", value: 2 },
          { label: "SemiAnnually", value: 3 },
          { label: "Annually", value: 4 },
          { label: "Biennially", value: 5 },
          { label: "Triennially", value: 6 },
        ]}
      />
    </div>
  );
};
