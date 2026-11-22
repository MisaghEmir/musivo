import { PlaylistData } from "@/config/data";
import PlaylistPageClient from "./PlaylistPageClient";

export function generateStaticParams() {
  return PlaylistData.map((playlist) => ({
    id: String(playlist._id),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PlaylistPageClient id={id} />;
}