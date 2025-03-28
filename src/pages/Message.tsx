import React, { useState } from "react";
import axios from "axios";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const MessagePage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post<string>(
        "https://localhost:7002/api/ai/ask",
        input, // Send the input string directly
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const aiMessage: Message = { sender: "ai", text: response.data };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Lỗi hệ thống, thử lại sau!" },
      ]);
      console.error("Error sending message:", error); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      {/* Danh sách tin nhắn */}
      <div className="flex-1 overflow-auto border p-4 bg-white rounded shadow">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-500">Đang phản hồi...</div>}
      </div>

      {/* Ô nhập tin nhắn */}
      <div className="mt-2 flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Đang gửi..." : "Gửi"}
        </button>
      </div>
    </div>
  );
};

export default MessagePage;
