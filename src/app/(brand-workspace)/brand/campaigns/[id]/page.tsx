import { redirect } from 'next/navigation';

export default function BrandCampaignDetailPage({ params }: { params: { id: string } }) {
  redirect(`/brand/orders/${params.id}`);
}
