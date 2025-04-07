import PricingTable from 'widgets/PricingTable/ui/PricingTable';
import { BackIcon, Tariff } from 'widgets/Tariff';
import styles from './TariffDialog.module.scss';
import { useGetUserProfile } from 'features/User/lib';
import { Dialog, Slide } from '@mui/material';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const TariffDialog = ({ open, setOpen }: Props) => {
  const { data: userProfile } = useGetUserProfile();

  if (!userProfile) {
    return null;
  }

  return (
    <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
      <Slide direction="right" in={open} mountOnEnter unmountOnExit>
        <div className={styles.root}>
          <BackIcon onBack={() => setOpen(false)} down={false} />

          <Tariff user={userProfile} />

          <PricingTable />

          <BackIcon onBack={() => setOpen(false)} down={true} />
        </div>
      </Slide>
    </Dialog>
  );
};
