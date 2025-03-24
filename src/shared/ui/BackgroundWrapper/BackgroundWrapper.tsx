import Image from 'next/image';

import defaultBottomLightImg from '@/app/assets/images/aiChat/lights/green-bottom-light.svg';
import defaultTopLightImg from '@/app/assets/images/aiChat/lights/green-top-light.svg';

export function BackgroundWrapper({ fadeOut }: any) {
  return (
    <div style={{ height: '100%', position: 'absolute', width: '105%', marginTop: -16 }}>
      <Image
        src={defaultTopLightImg}
        alt=""
        width={800}
        height={800}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 0.2s ease-in-out',
        }}
      />
      <Image
        src={defaultBottomLightImg}
        alt=""
        width={600}
        height={600}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          right: 0,
          bottom: -8,
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 0.2s ease-in-out',
        }}
      />
    </div>
  );
}
