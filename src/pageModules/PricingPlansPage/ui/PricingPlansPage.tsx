import logoImg from "@/app/assets/images/aiChat/logo/logo.png";
import { Box, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";

import { UserSettingsMenu } from "features/User";
import Image from "next/image";
import { Button } from "shared/ui";
import FAQ from "widgets/FAQ/ui/FAQ";
import Footer from "widgets/Footer/ui/Footer";
import { PricingPlans } from "widgets/PricingPlans";
import PricingTable from "widgets/PricingTable/ui/PricingTable";
import styles from "./PricingPlansPage.module.scss";

export const PricingPlansPage = async () => {
  // const userProfile = await getUserProfile();
  // console.log(userProfile);

  return (
    <div className={styles.root}>
      {/* <div className={styles.leftCircle} /> */}
      {/* <div className={styles.rightCircle} /> */}
      <div className={styles.container}>
        <Stack
          sx={{ mt: { xs: 4.4, md: 10 }, mb: { xs: 9, md: 8 } }}
          direction="row"
          justifyContent="space-between"
        >
          <Link href="/ai" style={{ display: "flex" }}>
            <Image src={logoImg} alt="logo" height={28} width={52} />
          </Link>

          <UserSettingsMenu />
        </Stack>

        <Chip className={styles.chip} label="тарифы" variant="outlined" />

        <Typography
          sx={{ mb: { xs: 1.6, md: 2.5 } }}
          variant="h2"
          className={styles.title}
        >
          выберите тарифный план
        </Typography>
        <Typography
          sx={{ mb: { xs: 4, md: 12.5 }, maxWidth: 650 }}
          className={styles.text}
        >
          Ниже вы можете выбрать самый удобный для вас тариф, соотвеветсвующий
          вашим потребностям. Если вы еще не знакомы с нашим продуктом, вы
          можете получить тестовый период бесплатно.
        </Typography>
      </div>

      <PricingPlans />

      <PricingTable />

      <div className={styles.container}>
        <Chip
          className={styles.chip}
          label="вопросы и ответы"
          variant="outlined"
          sx={{ marginTop: 10 }}
        />
        <FAQ />

        <Box
          sx={{
            maxWidth: 601,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            py: { xs: 20, md: 25 },
          }}
        >
          <Chip
            className={styles.chip}
            label="Начни сейчас"
            variant="outlined"
          />
          <Typography
            sx={{
              mb: { xs: 1.6, md: 2.5 },
              textAlign: "center",
              fontSize: { xs: "25px", md: "40px" },
              textTransform: "uppercase",
              maxWidth: 550,
            }}
            variant="h3"
          >
            Твои достижения ближе чем ты думаешь
          </Typography>

          <Typography
            sx={{
              mb: { xs: 2.5, md: 5 },
              color: "#FFFFFF80",
              textAlign: "center",
            }}
            variant="body2"
          >
            Личная команда умных ассистентов TPS готова взять на себя все
            сложные расчёты и вопросы. Забудь о неуверенности, нехватке знаний и
            ошибках – получай персональные решения и рекомендации, созданные для
            твоих целей.
          </Typography>

          <Button color="success" fullWidth className={styles.subscribeButton}>
            Присоединиться
          </Button>
        </Box>
      </div>
      <Footer />
    </div>
  );
};
