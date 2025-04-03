import logoImg from "@/app/assets/images/aiChat/logo/logo.png";
import { Box, Container, Link, Typography } from "@mui/material";
import LogoFooter from "app/assets/images/common/LogoFooter.svg";
import Image from "next/image";
import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        color: "#fff",
        pt: { md: 6, xs: 4 },
        pb: { md: 4, xs: 12 },
        backgroundColor: "#000",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ ml: "auto", position: "relative", zIndex: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            gap: 5,
          }}
          className={styles.mobile__flex}
        >
          <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
            <Link href="/ai" style={{ display: "flex" }}>
              <Image src={logoImg} alt="logo" height={28} width={52} />
            </Link>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 6.3,
              justifyContent: "flex-end",
            }}
            className={styles.mobile__grid}
          >
            <Box sx={{ flexBasis: "33%!important" }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "normal", mb: 1.25, width: "100%" }}
              >
                НАВИГАЦИЯ
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 1.25, color: "#888888", width: "max-content" }}
              >
                ИИ АССИСТЕНТЫ
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.25, color: "#888888" }}>
                О ПРОДУКТЕ
              </Typography>
              <Typography variant="body1" sx={{ color: "#888888" }}>
                ТАРИФЫ
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "normal", mb: 1.25 }}
              >
                ПОДДЕРЖКА
              </Typography>
              <Link
                variant="body1"
                sx={{ mb: 1.25, color: "#888888" }}
                href="mailto:support@tpsports.com"
                target="_blank"
                underline="none"
              >
                support@tpsports.com
              </Link>
              <Typography variant="body1" sx={{ mt: 1.25, color: "#888888" }}>
                Telegram — поддержка
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "normal", mt: { xs: 6.3, md: 3 }, mb: 1.25 }}
              >
                СОТРУДНИЧЕСТВО
              </Typography>
              <Link
                variant="body1"
                sx={{ color: "#888888" }}
                href="mailto:info@tpsports.com"
                target="_blank"
                underline="none"
              >
                info@tpsports.com
              </Link>
            </Box>

            <Box
              sx={{ textAlign: { xs: "start", md: "end" } }}
              className={styles.footer__flex}
            >
              <Link
                href="https://www.instagram.com/tpsports_com?igsh=aXltNmNnemJiamc5&utm_source=qr"
                variant="body1"
                underline="none"
                sx={{ mb: 1.25 }}
                target="_blank"
                className={styles.footer__link}
              >
                Instagram
              </Link>
              <Link
                href="https://t.me/tpsports_com"
                variant="body1"
                underline="none"
                sx={{ mb: 1.25 }}
                target="_blank"
                className={styles.footer__link}
              >
                Telegram
              </Link>
              <Link
                href="https://youtube.com/@tpsports_com?feature=shared"
                variant="body1"
                underline="none"
                sx={{ mb: 1.25 }}
                target="_blank"
                className={styles.footer__link}
              >
                YouTube
              </Link>
              <Link
                href="https://vk.com/tpsports_com"
                variant="body1"
                underline="none"
                className={styles.footer__link}
                target="_blank"
                sx={{ mb: 1.25 }}
              >
                VK
              </Link>
              <Link
                href="https://x.com/tpsports_com?s=21"
                variant="body1"
                underline="none"
                target="_blank"
                className={styles.footer__link}
              >
                X
              </Link>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 10,
            pt: 2,
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "start", md: "center" },
            gap: 1,
          }}
        >
          <Box className={styles.supFooter}>
            <Typography variant="body2">© 2025 Все права защищены.</Typography>
          </Box>
          <Typography variant="body2">Правовая информация</Typography>
        </Box>
        <Image
          src={LogoFooter}
          alt="logo"
          fill
          className={styles.logo__footer}
        />
      </Container>
    </Box>
  );
};

export default Footer;
