"use client";

import { Loader, TriangleAlert } from "lucide-react";

import { useGetChannel } from "@/features/channels/api/use-get-individual-channel";
import { useChannelId } from "@/hooks/use-channel-id";
import { Header } from "./header";

const ChannelIdPage = () => {
  const channelId = useChannelId();

  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  });

  if (channelLoading) {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader className="animate-spin size-5 text-muted-foreground" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="h-full flex-1 gap-y-2 flex flex-col items-center justify-center">
        <TriangleAlert className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Channel not found</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header title={channel.name} />
    </div>
  );
};

export default ChannelIdPage;
