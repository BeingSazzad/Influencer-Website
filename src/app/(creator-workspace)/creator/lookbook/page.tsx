import { redirect } from 'next/navigation';

export default function CreatorLookbookPage() {
  redirect('/creator/settings?tab=gallery');
}
