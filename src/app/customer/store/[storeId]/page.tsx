// app/store/[storeId]/page.tsx
interface Props {
  params: { storeId: string };
}

export default function StorePage({ params }: Props) {
  const { storeId } = params;

  return <div>가게 ID: {storeId}</div>;
}
