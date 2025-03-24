import medicAnimationJson from '@/app/assets/animations/Doctor.json';
import nutritionologAnimationJson from '@/app/assets/animations/Natucirolog.json';
import psychologistAnimationJson from '@/app/assets/animations/Psycholog.json';
import coachAnimationJson from '@/app/assets/animations/Trainer.json';
import nutritionologBottomLightImg from '@/app/assets/images/aiChat/lights/blue-bottom-light.svg';
import nutritionologTopLightImg from '@/app/assets/images/aiChat/lights/blue-top-light.svg';
import psychologistBottomLightImg from '@/app/assets/images/aiChat/lights/orange-bottom-light.svg';
import psychologistTopLightImg from '@/app/assets/images/aiChat/lights/orange-top-light.svg';
import medicBottomLightImg from '@/app/assets/images/aiChat/lights/white-bottom-light.svg';
import medicTopLightImg from '@/app/assets/images/aiChat/lights/white-top-light.svg';
import coachBottomLightImg from '@/app/assets/images/aiChat/lights/yellow-bottom-light.svg';
import coachTopLightImg from '@/app/assets/images/aiChat/lights/yellow-top-light.svg';
import coachImg from '@/app/assets/images/aiChat/message-circles/coach-circle.svg';
import medicImg from '@/app/assets/images/aiChat/message-circles/medic-circle.svg';
import nutritionologImg from '@/app/assets/images/aiChat/message-circles/nutritionolog-circle.svg';
import psychologistImg from '@/app/assets/images/aiChat/message-circles/psychologist-circle.svg';
import coachWelcomeImg from '@/app/assets/images/aiChat/welcome-circles/coach-welcome-circle.svg';
import medicWelcomeImg from '@/app/assets/images/aiChat/welcome-circles/medic-welcome-circle.svg';
import nutritionologWelcomeImg from '@/app/assets/images/aiChat/welcome-circles/nutritionolog-welcome-circle.svg';
import psychologistWelcomeImg from '@/app/assets/images/aiChat/welcome-circles/psychologist-welcome-circle.svg';

export const bots: any = [
  {
    name: 'coach',
    welcomeText:
      'Я твой персональный Тренер. Моя цель - помочь тебе стать лучшей версией себя. Готов отказаться от оправданий и начать действовать? Вперёд к результатам, которые перевернут твою жизнь!',
    translation: 'тренер',
    color: '#AEBD0C',
    animation: coachAnimationJson,
    questions: [
      {
        text: 'Фитнес-цели',
        message: 'Как мне правильно определить фитнес-цели?',
      },
      {
        text: 'Диастаз',
        message: 'Как мне ускорить заживление диастаза?',
      },
      {
        text: 'Правильно отжиматься',
        message: 'Как правильно отжиматься?',
      },
      {
        text: 'Подготовка к марафону',
        message: 'Как правильно подготовиться к марафону?',
      },
    ],
    icon: coachImg,
    welcomeIcon: coachWelcomeImg,
    shadowColor: '0px 0px 11px 0px #D7BF084A',
    topLight: coachTopLightImg,
    bottomLight: coachBottomLightImg,
    gradient: 'transparent linear-gradient(180deg, #D8BF08 0%, #5EB712 100%) 0% 0% no-repeat padding-box',
  },
  {
    name: 'medic',
    welcomeText: 'Я Спортивный Доктор и моя задача - сделать так, чтобы твоё тело работало как часы. Твоё здоровье - мой приоритет!',
    translation: 'доктор',
    color: '#FFF9F7',
    animation: medicAnimationJson,
    questions: [
      {
        text: 'Реабилитация',
        message: 'Как проходит реабилитация после травмы?',
      },
      {
        text: 'Растяжение связок',
        message: 'Как ускорить заживление после растяжения связок?',
      },
      {
        text: 'Хроническая усталость',
        message: 'Какие могут быть причины хронической усталости?',
      },
      {
        text: 'Диабет',
        message: 'Как предотвратить диабет?',
      },
    ],
    icon: medicImg,
    welcomeIcon: medicWelcomeImg,
    shadowColor: '0px 0px 11px 0px #FFFFFF4D',
    topLight: medicTopLightImg,
    bottomLight: medicBottomLightImg,
    gradient: 'transparent linear-gradient(180deg, #F9F9F9 0%, #BCBCBC 100%) 0% 0% no-repeat padding-box',
  },
  {
    name: 'nutritionolog',
    welcomeText:
      'Я Спортивный Нутрициолог. Помогу тебе наладить питание, восполнить дефициты и составлю рекомендации для достижения твоих целей.',
    translation: 'нутрициолог',
    color: '#0173FF',
    animation: nutritionologAnimationJson,
    questions: [
      {
        text: 'Похудеть',
        message: 'Как правильно худеть?',
      },
      {
        text: 'Здоровое питание',
        message: 'Как создать свой идеальный рацион здорового питания?',
      },
      {
        text: 'Набрать вес',
        message: 'Как правильно набирать вес?',
      },
      {
        text: 'Бады',
        message: 'Как мне подобрать бады?',
      },
    ],
    icon: nutritionologImg,
    welcomeIcon: nutritionologWelcomeImg,
    shadowColor: '0px 0px 11px 0px #019CFE4D',
    topLight: nutritionologTopLightImg,
    bottomLight: nutritionologBottomLightImg,
    gradient: 'transparent linear-gradient(180deg, #01D582 0%, #0166FF 100%) 0% 0% no-repeat padding-box',
  },
  {
    name: 'psychologist',
    welcomeText: 'Я Спортивный Психолог. Меняя мысли и осознавая чувства, ты придёшь к победе в спорте, к победе в жизни.',
    translation: 'психолог',
    color: '#ED4A06',
    animation: psychologistAnimationJson,
    questions: [
      {
        text: 'Бессонница',
        message: 'Как справиться с бессонницей?',
      },
      {
        text: 'Стресс',
        message: 'Как правильно справляться со стрессом?',
      },
      {
        text: 'Злость',
        message: 'Как справиться со злостью?',
      },
      {
        text: 'Мешает волнение',
        message: 'Мне мешает волнение, как с ним справиться?',
      },
    ],
    icon: psychologistImg,
    welcomeIcon: psychologistWelcomeImg,
    shadowColor: '0px 0px 11px 0px #F54B0066',
    topLight: psychologistTopLightImg,
    bottomLight: psychologistBottomLightImg,
    gradient: 'transparent linear-gradient(180deg, #F14A03 0%, #95384C 100%) 0% 0% no-repeat padding-box',
  },
];
