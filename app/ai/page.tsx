import { Metadata } from 'next';
import { AiPage } from 'pageModules/AiPage';

export const metadata: Metadata = {
  title: 'Your Experts, on AI',
};

export default async function Ai() {
  return <AiPage />;
}
