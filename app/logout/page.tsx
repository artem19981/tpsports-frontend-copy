import { redirect } from 'next/navigation';

export default async function Logout() {
  redirect('/login');
}
