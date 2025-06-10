import React, { useState } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Typography, 
  Badge, 
  Divider,
  TextField,
  InputAdornment
} from '@mui/material';
import { Search } from 'lucide-react';
import { Conversation } from '../../types/user';
import { mockUsers } from '../../data/mockData';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conversation) => {
    const otherParticipantId = conversation.participants.find(id => id !== 'current-user');
    
    if (!otherParticipantId) return false;
    
    const user = mockUsers.find(user => user.id === otherParticipantId);
    
    if (!user) return false;
    
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <Box 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Messages
        </Typography>
        <TextField
          fullWidth
          placeholder="Search conversations"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
      </Box>
      
      <List sx={{ overflow: 'auto', flexGrow: 1 }}>
        {filteredConversations.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No conversations found
            </Typography>
          </Box>
        ) : (
          filteredConversations.map((conversation) => {
            const otherParticipantId = conversation.participants.find(id => id !== 'current-user');
            const user = mockUsers.find(user => user.id === otherParticipantId);
            
            if (!user) return null;
            
            return (
              <React.Fragment key={conversation.id}>
                <ListItem
                  button
                  selected={selectedConversationId === conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  sx={{
                    px: 2,
                    py: 1.5,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      color={conversation.unreadCount > 0 ? 'primary' : 'default'}
                    >
                      <Avatar src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" noWrap>
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatMessageTime(conversation.lastMessage.timestamp)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography 
                          variant="body2" 
                          color={conversation.unreadCount > 0 ? 'text.primary' : 'text.secondary'}
                          noWrap
                          fontWeight={conversation.unreadCount > 0 ? 500 : 400}
                          sx={{ maxWidth: '180px' }}
                        >
                          {conversation.lastMessage.content}
                        </Typography>
                        {conversation.unreadCount > 0 && (
                          <Badge
                            badgeContent={conversation.unreadCount}
                            color="primary"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            );
          })
        )}
      </List>
    </Box>
  );
};

// Helper function to format message time
const formatMessageTime = (timestamp: Date) => {
  const now = new Date();
  const timeDiff = now.getTime() - timestamp.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  
  if (dayDiff === 0) {
    // Today - show time
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (dayDiff === 1) {
    // Yesterday
    return 'Yesterday';
  } else if (dayDiff < 7) {
    // Within a week - show day name
    return timestamp.toLocaleDateString([], { weekday: 'short' });
  } else {
    // Older - show date
    return timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

export default ConversationList;