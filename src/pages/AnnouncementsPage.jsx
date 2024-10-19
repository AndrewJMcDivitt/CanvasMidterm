import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box
} from '@mui/material';
import Layout from '../components/layout/Layout';
import { TextInput, Button } from '../components/common';
import { useAuth } from '../context/AuthContext';

const AnnouncementsPage = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState({ title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedAnnouncements = JSON.parse(localStorage.getItem('announcements')) || [];
    setAnnouncements(storedAnnouncements);
  }, []);

  const saveAnnouncementsToStorage = (updatedAnnouncements) => {
    localStorage.setItem('announcements', JSON.stringify(updatedAnnouncements));
  };

  const handleOpenDialog = (announcement = { title: '', content: '' }, editing = false) => {
    setCurrentAnnouncement(announcement);
    setIsEditing(editing);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentAnnouncement({ title: '', content: '' });
    setIsEditing(false);
  };

  const handleSaveAnnouncement = () => {
    let updatedAnnouncements;
    if (isEditing) {
      updatedAnnouncements = announcements.map(a => 
        a.id === currentAnnouncement.id ? currentAnnouncement : a
      );
    } else {
      updatedAnnouncements = [...announcements, { ...currentAnnouncement, id: Date.now() }];
    }
    setAnnouncements(updatedAnnouncements);
    saveAnnouncementsToStorage(updatedAnnouncements);
    handleCloseDialog();
  };

  const handleDeleteAnnouncement = (id) => {
    const updatedAnnouncements = announcements.filter(a => a.id !== id);
    setAnnouncements(updatedAnnouncements);
    saveAnnouncementsToStorage(updatedAnnouncements);
  };

  const isTeacher = user?.userType === 'teacher';

  return (
    <Layout>
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Announcements
      </Typography>
      {isTeacher && (
        <Button 
          variant="contained" 
          onClick={() => handleOpenDialog()} 
          sx={{ mb: 2 }}
        >
          Create New Announcement
        </Button>
      )}
      <List sx={{ width: '100%' }}>
        {announcements.map((announcement) => (
          <ListItem key={announcement.id} alignItems="flex-start" sx={{ bgcolor: 'white', mb: 1, borderRadius: 1 }}>
            <ListItemText
              primary={announcement.title}
              secondary={announcement.content}
            />
            {isTeacher && (
              <Box>
                <Button onClick={() => handleOpenDialog(announcement, true)} size = 'small' sx={{ color: 'white'}}>Edit</Button>
                <Button onClick={() => handleDeleteAnnouncement(announcement.id)} size = 'small' sx={{ color: 'white'}}>Delete</Button>
              </Box>
            )}
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Edit Announcement' : 'Create New Announcement'}</DialogTitle>
        <DialogContent>
          <TextInput
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={currentAnnouncement.title}
            onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, title: e.target.value})}
          />
          <TextInput
            margin="dense"
            id="content"
            label="Content"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={currentAnnouncement.content}
            onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, content: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveAnnouncement}>Save</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default AnnouncementsPage;