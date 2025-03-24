export interface AiBot {
  name: string;
  welcomeText: string;
  translation: string;
  color: string;
  borderColor: string;
  animation: any;
  questions: AiBotQuestion[];
  icon: string;
  welcomeIcon: string;
  shadowColor: string;
  topLight: string;
  bottomLight: string;
  gradient: string;
  messageLoaderBackground: string;
}

interface AiBotQuestion {
  text: string;
  message: string;
}
