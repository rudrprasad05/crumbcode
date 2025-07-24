"use client";

import { useEffect, useState } from "react";
import { MessageList } from "@/components/admin/messages/message-list";
import { MessageDetail } from "@/components/admin/messages/message-detail";
import { ComposeMessage } from "@/components/admin/messages/compose-message";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { ContactMessage, ContactMessageTypes, MetaData } from "@/types";
import { Input } from "@/components/ui/input";
import { GetAllContactMessages } from "@/actions/ContactMessage";

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [showCompose, setShowCompose] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<MetaData>({
    pageNumber: 1,
    totalCount: 0,
    pageSize: 8,
    totalPages: 0,
  });

  useEffect(() => {
    setMessages([]);
    const getData = async () => {
      const data = await GetAllContactMessages({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
      });

      setMessages(data.data as ContactMessage[]);
      setPagination((prev) => ({
        ...prev,
        totalCount: data.meta?.totalCount as number,
        totalPages: Math.ceil(
          (data.meta?.totalCount as number) / pagination.pageSize
        ),
      }));

      setLoading(false);
    };
    getData();
  }, [pagination.pageNumber, pagination.pageSize]);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Messages</h1>
          <Button onClick={() => setShowCompose(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Message List */}
        <div className="w-1/3 border-r">
          <MessageList
            messages={messages}
            selectedMessage={selectedMessage}
            onSelectMessage={setSelectedMessage}
          />
        </div>

        {/* Message Detail */}
        <div className="flex-1">
          {selectedMessage ? (
            <MessageDetail message={selectedMessage} />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4">📧</div>
                <p className="text-lg">Select a message to view its content</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && <ComposeMessage onClose={() => setShowCompose(false)} />}
    </div>
  );
}
