import { ChatVariant } from 'features/Chat/model';
import { ChatPage } from 'pageModules/ChatPage';

interface Props {
  params: {
    chatType: string[];
  };
}
const nameByChatVariant: Record<ChatVariant, string> = {
  coach: 'Coach',
  medic: 'Sports Doctor',
  psychologist: 'Sports Psychologist',
  nutritionolog: 'Sports Nutritionist',
};

export async function generateMetadata({ params }: Props) {
  return {
    title: 'AI ' + nameByChatVariant[params.chatType[0] as ChatVariant],
    // icons: [
    //   {
    //     rel: 'apple-touch-icon',
    //     sizes: '180x180',
    //     url: '/greenFavicon.png',
    //     type: 'image/png',
    //   },
    //   {
    //     rel: 'icon',
    //     sizes: '180x180',
    //     url: '/greenFavicon.svg',
    //     type: 'image/svg+xml',
    //   },
    //   {
    //     rel: 'icon',
    //     sizes: '180x180',
    //     url: '/greenFavicon.png',
    //     type: 'image/png',
    //   },
    // ],
  };
}

async function Page(props: Props) {
  return <ChatPage chatVariant={props.params.chatType[0] as ChatVariant} />;
}

export default Page;
