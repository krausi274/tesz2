import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Badge,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  Divider,
  useTheme,
  useMediaQuery,
  Chip
} from '@mui/material';
import { Send, Image, MoreVertical, Smile, Blocks as Block, Flag, X, Check, CheckCheck, Circle } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { format, isToday, isYesterday } from 'date-fns';
import { mockUsers } from '../../data/mockData';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  isRead: boolean;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastSeen: Date;
  isOnline: boolean;
  compatibilityScore: number;
  commonInterests: string[];
}

const ChatInterface: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate chat users based on compatibility
  const chatUsers: ChatUser[] = mockUsers.slice(0, 3).map(user => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    avatar: user.profilePicture,
    lastSeen: new Date(),
    isOnline: Math.random() > 0.5,
    compatibilityScore: Math.floor(Math.random() * 20) + 80, // 80-100
    commonInterests: user.interests.slice(0, 3).map(i => i.name)
  }));

  // Initialize messages for each user
  useEffect(() => {
    const initialMessages: Record<string, Message[]> = {};
    chatUsers.forEach(user => {
      initialMessages[user.id] = generateSampleMessages(user.id);
    });
    setMessages(initialMessages);
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChat]);

  // Handle sending new message
  const handleSendMessage = () => {
    if (!selectedChat || !newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date(),
      senderId: 'current-user',
      isRead: false
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg]
    }));

    setNewMessage('');
    setShowEmojiPicker(false);
  };

  // Handle emoji selection
  const onEmojiClick = (emojiData: any) => {
    setNewMessage(prev => prev + emojiData.emoji);
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload the file to a server
      console.log('File selected:', file.name);
    }
  };

  // Handle user actions (block, report)
  const handleUserAction = (action: 'block' | 'report') => {
    setMenuAnchor(null);
    // In a real app, this would call an API
    console.log(`User ${action}ed:`, selectedChat);
  };

  // Format message timestamp
  const formatMessageTime = (date: Date) => {
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    }
    return format(date, 'MMM d');
  };

  // Generate sample messages for demo
  const generateSampleMessages = (userId: string): Message[] => {
    const now = new Date();
    return [
      {
        id: '1',
        content: 'Hey there! I noticed we have similar travel interests!',
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        senderId: userId,
        isRead: true
      },
      {
        id: '2',
        content: 'Hi! Yes, I love hiking and photography too!',
        timestamp: new Date(now.getTime() - 23 * 60 * 60 * 1000),
        senderId: 'current-user',
        isRead: true
      },
      {
        id: '3',
        content: 'Have you been to any national parks recently?',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        senderId: userId,
        isRead: true
      }
    ];
  };

  const selectedUser = chatUsers.find(user => user.id === selectedChat);

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        height: 'calc(100vh - 200px)',
        display: 'flex',
        borderRadius: 3,
        overflow: 'hidden'
      }}
    >
      {/* Chat list */}
      <Box 
        sx={{ 
          width: isMobile ? '100%' : 320,
          borderRight: '1px solid',
          borderColor: 'divider',
          display: isMobile && showMobileChat ? 'none' : 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>
            Your Matches
          </Typography>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {chatUsers.map(user => (
            <Box
              key={user.id}
              onClick={() => {
                setSelectedChat(user.id);
                if (isMobile) setShowMobileChat(true);
              }}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'action.hover'
                },
                bgcolor: selectedChat === user.id ? 'action.selected' : 'transparent'
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                color={user.isOnline ? 'success' : 'default'}
              >
                <Avatar src={user.avatar} alt={user.name} />
              </Badge>
              <Box sx={{ ml: 2, flex: 1, overflow: 'hidden' }}>
                <Typography variant="subtitle1" noWrap>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {messages[user.id]?.[messages[user.id].length - 1]?.content}
                </Typography>
              </Box>
              <Box sx={{ ml: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Typography variant="caption" color="text.secondary">
                  {messages[user.id]?.[messages[user.id].length - 1]?.timestamp &&
                    formatMessageTime(messages[user.id][messages[user.id].length - 1].timestamp)}
                </Typography>
                {messages[user.id]?.some(msg => !msg.isRead && msg.senderId !== 'current-user') && (
                  <Badge
                    badgeContent={messages[user.id].filter(msg => !msg.isRead && msg.senderId !== 'current-user').length}
                    color="primary"
                    sx={{ mt: 0.5 }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Chat area */}
      <Box 
        sx={{ 
          flex: 1,
          display: isMobile && !showMobileChat ? 'none' : 'flex',
          flexDirection: 'column'
        }}
      >
        {selectedChat && selectedUser ? (
          <>
            {/* Chat header */}
            <Box
              sx={{
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {isMobile && (
                <IconButton 
                  edge="start" 
                  onClick={() => setShowMobileChat(false)}
                  sx={{ mr: 1 }}
                >
                  <X size={20} />
                </IconButton>
              )}
              <Avatar
                src={selectedUser.avatar}
                alt={selectedUser.name}
                onClick={() => setShowProfile(true)}
                sx={{ cursor: 'pointer' }}
              />
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {selectedUser.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedUser.isOnline ? 'Online' : 'Last seen ' + formatMessageTime(selectedUser.lastSeen)}
                </Typography>
              </Box>
              <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                <MoreVertical size={20} />
              </IconButton>
            </Box>

            {/* Messages area */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: 'grey.50' }}>
              {messages[selectedChat]?.map((message, index) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    flexDirection: message.senderId === 'current-user' ? 'row-reverse' : 'row',
                    mb: 1.5
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      bgcolor: message.senderId === 'current-user' ? 'primary.main' : 'white',
                      color: message.senderId === 'current-user' ? 'white' : 'inherit',
                      p: 2,
                      borderRadius: 3,
                      boxShadow: 1
                    }}
                  >
                    <Typography variant="body1">
                      {message.content}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: message.senderId === 'current-user' ? 'flex-end' : 'flex-start',
                        mt: 0.5,
                        gap: 0.5
                      }}
                    >
                      <Typography
                        variant="caption"
                        color={message.senderId === 'current-user' ? 'inherit' : 'text.secondary'}
                        sx={{ opacity: 0.8 }}
                      >
                        {format(message.timestamp, 'HH:mm')}
                      </Typography>
                      {message.senderId === 'current-user' && (
                        message.isRead ? (
                          <CheckCheck size={16} />
                        ) : (
                          <Check size={16} />
                        )
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Input area */}
            <Box
              sx={{
                p: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'flex-end',
                gap: 1
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                accept="image/*,video/*"
              />
              <IconButton onClick={() => fileInputRef.current?.click()}>
                <Image size={20} />
              </IconButton>
              <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <Smile size={20} />
              </IconButton>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message..."
                variant="outlined"
                size="small"
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send size={20} />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
              bgcolor: 'grey.50'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Select a conversation to start chatting
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              We've matched you with travelers who share your interests and travel style
            </Typography>
          </Box>
        )}
      </Box>

      {/* Emoji Picker Popover */}
      {showEmojiPicker && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '80px',
            right: '20px',
            zIndex: 1000
          }}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </Box>
      )}

      {/* User Actions Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => handleUserAction('block')}>
          <Block size={16} style={{ marginRight: 8 }} />
          Block User
        </MenuItem>
        <MenuItem onClick={() => handleUserAction('report')}>
          <Flag size={16} style={{ marginRight: 8 }} />
          Report User
        </MenuItem>
      </Menu>

      {/* User Profile Dialog */}
      <Dialog
        open={showProfile}
        onClose={() => setShowProfile(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Profile Information
          <IconButton
            onClick={() => setShowProfile(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Avatar
                src={selectedUser.avatar}
                alt={selectedUser.name}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                {selectedUser.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Compatibility Score: {selectedUser.compatibilityScore}%
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Common Interests
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {selectedUser.commonInterests.map((interest, index) => (
                  <Chip key={index} label={interest} size="small" />
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowProfile(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ChatInterface;