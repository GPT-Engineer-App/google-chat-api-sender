import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [message, setMessage] = useState("");
  const toast = useToast();

  const sendMessage = async () => {
    const webhookUrl = "YOUR_WEBHOOK_URL_HERE"; // Replace with your Google Chat webhook URL

    if (!message) {
      toast({
        title: "Message is empty.",
        description: "Please enter a message to send.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });

      if (response.ok) {
        toast({
          title: "Message sent.",
          description: "Your message has been sent to Google Chat.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setMessage("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error.",
        description: "Failed to send message to Google Chat.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Google Chat API Messenger</Text>
        <Input placeholder="Enter your message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button leftIcon={<FaPaperPlane />} colorScheme="teal" onClick={sendMessage}>
          Send Message
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
