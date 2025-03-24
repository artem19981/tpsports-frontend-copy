'use client';

import React, { useState } from 'react';
import { Box, Button, Modal, Slide } from '@mui/material';
import { AnimatedLogo } from 'shared/ui';
import baseAnimationJson from '@/app/assets/animations/data.json';
import baseAnimationJson2 from '@/app/assets/animations/data2.json';
import baseAnimationJson3 from '@/app/assets/animations/data3.json';
import imageSrc from './assets/ellipse.png';
import Image from 'next/image';
import styles from './styles.module.scss';

export const Test: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '90vw',
        height: '90vh',
        backgroundColor: '#111',
        margin: 'auto',
        marginTop: '5vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: 3,
        gap: 20,
      }}
    >
      <Image src={imageSrc} alt="www" width={150} height={150} />
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `radial-gradient(
            50% 50% at 50% 50%, 
            #d9d9d9 0%, 
            #d9d9d9 30%,
            #30303000 80%, 
            #30303000 90%, 
            #30303000 100% 
          )`,
          opacity: 0.4,
          // boxShadow: 'rgb(217, 217, 217) 0px 0px 50px 25px',

          // boxShadow: 'rgb(217, 217, 217) 0px 0px 50px 0px',
        }}
      ></div>
      <div
        className={styles.element}
        // style={{
        //   // position: 'absolute',
        //   // left: '65%',
        //   width: 20,
        //   height: 20,
        //   borderRadius: '50%',
        //   background:
        //     'radial-gradient(50% 50% at 50% 50%, #d9d9d9 0%,rgb(150, 150, 150) 100%)',
        //   opacity: 0.4,
        //   boxShadow: 'rgb(217, 217, 217) 0px 0px 50px 25px',
        // }}
      ></div>

      {/* <Button variant="contained" onClick={() => setOpen(true)}>
        Открыть модальное окно
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'flex-end', // Модальное окно появляется снизу
          justifyContent: 'center',
        }}
      >
        <Slide direction="right" in={open} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: 'absolute',
              top: 80,
              width: '90vw', // Уменьшаем ширину на 20px с каждой стороны
              height: 'calc(90vh - 20px)', // Уменьшаем высоту на 20px сверху и снизу
              backgroundColor: 'white',
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
              zIndex: 1301, // Поверх основного блока
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(false)}
            >
              Закрыть
            </Button>
          </Box>
        </Slide>
      </Modal> */}
    </Box>
  );
};
