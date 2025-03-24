import { getUserProfile } from "features/User/api";
import PricingTable from "widgets/PricingTable/ui/PricingTable";
import { BackIcon, Tariff } from "widgets/Tariff";
import styles from "./TatiffPage.module.scss";

export const TariffPage = async () => {
  const userProfile = await getUserProfile();
  console.log(userProfile);

  return (
    <div className={styles.root}>
      <BackIcon down={false} />

      <Tariff user={userProfile} />

      <PricingTable />

      <BackIcon down={true} />
    </div>
  );
};
