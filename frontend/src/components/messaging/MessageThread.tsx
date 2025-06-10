import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  TextField, 
  Button, 
  Divider, 
  IconButton, 
  Paper
} from '@mui/material';
import { Send, Paperclip, MapPin, Image } from 'lucide-react';
import { Message, User } from '../../types/user';
import InterestTag from '../common/InterestTag';

interface MessageThreadProps {
  messages: Message[];
  receiver: User;
  onSendMessage: (content: string) => void;
}

const MessageThread: React.FC<MessageThreadProps> = ({
  messages,
  receiver,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Group messages by date
  const groupedMessages: Record<string, Message[]> = {};
  messages.forEach(message => {
    const date = message.timestamp.toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={receiver.profilePicture}
          alt={`${receiver.firstName} ${receiver.lastName}`}
          sx={{ width: 48, height: 48, mr: 2 }}
        />
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {receiver.firstName} {receiver.lastName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MapPin size={14} style={{ marginRight: 4 }} color="#666" />
            <Typography variant="body2" color="text.secondary">
              {receiver.location}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          bgcolor: 'grey.50',
        }}
      >
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <Box key={date}>
            <Divider sx={{ my: 2 }}>
              <Typography variant="caption" color="text.secondary">
                {formatMessageDate(new Date(date))}
              </Typography>
            </Divider>
            
            {dateMessages.map((message, index) => {
              const isSentByMe = message.senderId === 'current-user';
              const showAvatar = index === 0 || 
                dateMessages[index - 1].senderId !== message.senderId;
              
              return (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    flexDirection: isSentByMe ? 'row-reverse' : 'row',
                    mb: 1.5,
                  }}
                >
                  {!isSentByMe && showAvatar && (
                    <Avatar
                      src={receiver.profilePicture}
                      alt={`${receiver.firstName}`}
                      sx={{ 
                        width: 36, 
                        height: 36, 
                        mr: 1,
                        mt: 'auto'
                      }}
                    />
                  )}
                  
                  {!isSentByMe && !showAvatar && (
                    <Box sx={{ width: 36, mr: 1 }} />
                  )}
                  
                  <Box
                    sx={{
                      maxWidth: '70%',
                      minWidth: '100px',
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: isSentByMe 
                          ? '20px 4px 20px 20px' 
                          : '4px 20px 20px 20px',
                        bgcolor: isSentByMe ? 'primary.main' : 'white',
                        color: isSentByMe ? 'white' : 'text.primary',
                      }}
                    >
                      <Typography variant="body1">
                        {message.content}
                      </Typography>
                    </Paper>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: 'block',
                        mt: 0.5,
                        textAlign: isSentByMe ? 'right' : 'left',
                      }}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {isSentByMe && (
                        message.isRead 
                          ? ' • Read' 
                          : ' • Delivered'
                      )}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Shared interests section */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          gap: 1,
        }}
      >
        <Typography variant="body2" fontWeight={600} noWrap sx={{ flexShrink: 0 }}>
          Shared Interests:
        </Typography>
        {receiver.interests.slice(0, 3).map((interest) => (
          <InterestTag
            key={interest.id}
            interest={interest.name}
            iconName={interest.icon}
            size="small"
            sx={{ flexShrink: 0 }}
          />
        ))}
      </Box>

      {/* Input area */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1,
        }}
      >
        <IconButton color="primary" size="small">
          <Paperclip size={20} />
        </IconButton>
        <IconButton color="primary" size="small">
          <Image size={20} />
        </IconButton>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 4,
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<Send size={16} />}
          onClick={handleSendMessage}
          disabled={newMessage.trim() === ''}
          sx={{
            borderRadius: 4,
            whiteSpace: 'nowrap',
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

// Helper function to format message date
const formatMessageDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  }
};

export default MessageThread;