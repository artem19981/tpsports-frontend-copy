import bottleSrc from '../assets/bottle.png';
import WhiteBottle from '../assets/fullWhiteBottle.svg?component';
import style from '../FoodForm.module.scss';
import Image from 'next/image';

type BottleProps = {
  liters: number;
};

export function Bottle({ liters }: BottleProps) {
  const maxFillHeight = 65;
  const fillHeight = (liters / 3.5) * maxFillHeight;

  const isFullBottle = liters >= 3;
  const isShowText = liters >= 1;

  return (
    <div className={style.bottleContainer}>
      {isFullBottle ? (
        <WhiteBottle width={33} height={65} className={style.whiteBottle} />
      ) : (
        <Image src={bottleSrc} width={33} height={65} alt="" />
      )}

      {!isFullBottle && !!fillHeight && (
        <div className={style.bottleWhitePart} style={{ height: fillHeight }} />
      )}

      {isShowText && <p className={style.bottleText}>{liters} л</p>}
    </div>
  );
}
