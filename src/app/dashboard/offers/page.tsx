
import Page from "@/components/Page/PageAll";
import { offerRoute } from "@/core/apiRoutes";

const Offers = () => {
  const offerColumns = [
    { name: "Percentage", uid: "percentage", type: "text" },
    { name: "Title", uid: "title", type: "text" },
    { name: "Actions", uid: "action", type: "action" },
  ]
  return (
    <Page columns={offerColumns} api={offerRoute} title="Offers" apiKey="offers" />
  );
};

export default Offers;
