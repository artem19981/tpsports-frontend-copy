import { AiBot } from 'shared/model/aiBot';

import medicAnimationJson from '@/app/assets/animations/Doctor.json';
import nutritionologAnimationJson from '@/app/assets/animations/Natucirolog.json';
import psychologistAnimationJson from '@/app/assets/animations/Psycholog.json';
import coachAnimationJson from '@/app/assets/animations/Trainer.json';
import { ChatType } from 'entities/chat/model/ChatType';

export const BOTS: AiBot[] = [
  {
    name: ChatType.Trainer,
    welcomeText:
      'Я твой персональный Тренер. Моя цель - помочь тебе стать лучшей версией себя. Вперёд к результатам, которые перевернут твою жизнь!',
    translation: 'тренер',
    color: '#fff',
    borderColor: 'rgb(174, 189, 12)',
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
    shadowColor: '0px 0px 11px 0px #D7BF084A',
    gradient:
      'transparent linear-gradient(180deg, #D8BF08 0%, #5EB712 100%) 0% 0% no-repeat padding-box',
    messageLoaderBackground:
      'radial-gradient(50% 50% at 50% 50%, rgba(219, 191, 8, 0.65) 0%, rgba(41, 41, 41, 0) 100%)',
  },
  {
    name: ChatType.Doctor,
    welcomeText:
      'Я Спортивный Доктор и моя задача - сделать так, чтобы твоё тело работало как часы. Твоё здоровье - мой приоритет!',
    translation: 'доктор',
    color: '#000000',
    borderColor: 'rgb(255, 249, 247)',
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
    shadowColor: '0px 0px 11px 0px #FFFFFF4D',
    gradient:
      'transparent linear-gradient(180deg, #F9F9F9 0%, #BCBCBC 100%) 0% 0% no-repeat padding-box',
    messageLoaderBackground:
      'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.65) 0%, rgba(41, 41, 41, 0) 100%)',
  },
  {
    name: ChatType.Nutritionolog,
    welcomeText:
      'Я Спортивный Нутрициолог. Помогу тебе наладить питание, восполнить дефициты и составлю рекомендации для достижения твоих целей.',
    translation: 'нутрициолог',
    color: '#fff',
    borderColor: 'rgb(1, 115, 255)',
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
    shadowColor: '0px 0px 11px 0px #019CFE4D',
    gradient:
      'transparent linear-gradient(180deg, #01D582 0%, #0166FF 100%) 0% 0% no-repeat padding-box',
    messageLoaderBackground:
      'radial-gradient(50% 50% at 50% 50%, rgba(1, 103, 255, 0.65) 0%, rgba(21, 72, 148, 0.338) 55.5%, rgba(41, 41, 41, 0) 100%)',
  },
  {
    name: ChatType.Psychologist,
    welcomeText:
      'Я Спортивный Психолог. Меняя мысли и осознавая чувства, ты придёшь к победе в спорте, к победе в жизни.',
    translation: 'психолог',
    color: '#fff',
    borderColor: 'rgb(237, 74, 6)',
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
    shadowColor: '0px 0px 11px 0px #F54B0066',
    gradient:
      'transparent linear-gradient(180deg, #F14A03 0%, #95384C 100%) 0% 0% no-repeat padding-box',
    messageLoaderBackground:
      'radial-gradient(50% 50% at 50% 50%, rgba(239, 74, 5, 0.65) 0%, rgba(236, 74, 7, 0.26) 46.5%, rgba(41, 41, 41, 0) 100%)',
  },
];
