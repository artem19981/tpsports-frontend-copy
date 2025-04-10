export interface AiBot {
  name: string;
  welcomeText: string;
  translation: string;
  color: string;
  borderColor: string;
  background: string;
  animation: any;
  questions: AiBotQuestion[];
  shadowColor: string;
  gradient: string;
  messageLoaderBackground: string;
}

interface AiBotQuestion {
  text: string;
  message: string;
}
