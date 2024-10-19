
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
  Box,
  Paper
} from '@mui/material';
import Layout from '../components/layout/Layout';
import { TextInput, SelectInput, Button } from '../components/common';
import { useAuth } from '../context/AuthContext';
import useModules from '../hooks/useModules';

const PagesPage = () => {
  const { user } = useAuth();
  const { pages, setPages } = useModules();
  const [pageTypes, setPageTypes] = useState([
    'HomePage',
    'GenericPage',
    'Assignment',
    'In-Class Exercise'
  ]);
  const [openPageDialog, setOpenPageDialog] = useState(false);
  const [openTypeDialog, setOpenTypeDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState({ title: '', content: '', type: '' });
  const [newPageType, setNewPageType] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const isTeacher = user?.userType === 'teacher';

  useEffect(() => {
    const storedPageTypes = JSON.parse(localStorage.getItem('pageTypes'));
    if (storedPageTypes) {
      setPageTypes(storedPageTypes);
    }
  }, []);

  const handleOpenPageDialog = (page = { title: '', content: '', type: '' }, editing = false) => {
    setCurrentPage(page);
    setIsEditing(editing);
    setOpenPageDialog(true);
  };

  const handleClosePageDialog = () => {
    setOpenPageDialog(false);
    setCurrentPage({ title: '', content: '', type: '' });
    setIsEditing(false);
  };

  const handleSavePage = () => {
    const updatedPages = isEditing
      ? pages.map(p => p.id === currentPage.id ? currentPage : p)
      : [...pages, { ...currentPage, id: Date.now() }];
    setPages(updatedPages);
    localStorage.setItem('pages', JSON.stringify(updatedPages));
    handleClosePageDialog();
  };

  const handleDeletePage = (id) => {
    const updatedPages = pages.filter(p => p.id !== id);
    setPages(updatedPages);
    localStorage.setItem('pages', JSON.stringify(updatedPages));
  };

  const handleOpenTypeDialog = () => {
    setOpenTypeDialog(true);
  };

  const handleCloseTypeDialog = () => {
    setOpenTypeDialog(false);
    setNewPageType('');
  };

  const handleAddPageType = () => {
    if (newPageType && !pageTypes.includes(newPageType)) {
      const updatedPageTypes = [...pageTypes, newPageType];
      setPageTypes(updatedPageTypes);
      localStorage.setItem('pageTypes', JSON.stringify(updatedPageTypes));
    }
    handleCloseTypeDialog();
  };

  const groupedPages = pages.reduce((acc, page) => {
    (acc[page.type] = acc[page.type] || []).push(page);
    return acc;
  }, {});

  return (
    <Layout>
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Pages
      </Typography>
      {isTeacher && (
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => handleOpenPageDialog()}
            sx={{ mr: 1, color: 'white' }}
            size = 'small'
          >
            Create New Page
          </Button>
          <Button
            variant="contained"
            onClick={handleOpenTypeDialog}
            sx={{ mr: 1, color: 'white' }}
            size = 'small'
          >
            Add New Page Type
          </Button>
        </Box>
      )}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {Object.entries(groupedPages).map(([type, pages]) => (
          <Paper key={type} sx={{ mb: 3, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {type}
            </Typography>
            <List>
              {pages.map((page) => (
                <ListItem
                  key={page.id}
                  alignItems="flex-start"
                  sx={{
                    bgcolor: 'white',
                    mb: 1,
                    borderRadius: 1,
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                >
                  <ListItemText
                    primary={page.title}
                    secondary={page.content}
                  />
                  {isTeacher && (
                    <Box>
                      <Button onClick={() => handleOpenPageDialog(page, true)} sx={{ mr: 1, color: 'white' }} size = 'small'>Edit</Button>
                      <Button onClick={() => handleDeletePage(page.id)} sx={{ mr: 1, color: 'white' }} size = 'small'>Delete</Button>
                    </Box>
                  )}
                </ListItem>
              ))}
            </List>
          </Paper>
        ))}
      </Box>

      <Dialog open={openPageDialog} onClose={handleClosePageDialog}>
        <DialogTitle>{isEditing ? 'Edit Page' : 'Create New Page'}</DialogTitle>
        <DialogContent>
          <TextInput
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={currentPage.title}
            onChange={(e) => setCurrentPage({...currentPage, title: e.target.value})}
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
            value={currentPage.content}
            onChange={(e) => setCurrentPage({...currentPage, content: e.target.value})}
          />
          <SelectInput
            label="Page Type"
            value={currentPage.type}
            onChange={(e) => setCurrentPage({...currentPage, type: e.target.value})}
            options={pageTypes.map(type => ({ value: type, label: type }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePageDialog} sx={{ mr: 1, color: 'white' }} size = 'small'>Cancel</Button>
          <Button onClick={handleSavePage} sx={{ mr: 1, color: 'white' }} size = 'small'>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTypeDialog} onClose={handleCloseTypeDialog}>
        <DialogTitle>Add New Page Type</DialogTitle>
        <DialogContent>
          <TextInput
            autoFocus
            margin="dense"
            id="newPageType"
            label="New Page Type"
            type="text"
            fullWidth
            variant="standard"
            value={newPageType}
            onChange={(e) => setNewPageType(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTypeDialog} sx={{ mr: 1, color: 'white' }} size = 'small'>Cancel</Button>
          <Button onClick={handleAddPageType} sx={{ mr: 1, color: 'white' }} size = 'small'>Add</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default PagesPage;