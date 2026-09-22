import { redirect } from 'next/navigation';

export default function CreatorCampaignDetailPage({ params }: { params: { id: string } }) {
  redirect(`/creator/orders/${params.id}`);
}
