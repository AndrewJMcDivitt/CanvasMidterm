
import React, { useState } from 'react';
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
  Paper,
  FormControlLabel,
  Switch,
  IconButton,
  Collapse
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Layout from '../components/layout/Layout';
import { TextInput, Button } from '../components/common';
import { useAuth } from '../context/AuthContext';
import useModules from '../hooks/useModules';

const ModulesPage = () => {
  const { user } = useAuth();
  const { modules, pages, saveModule, deleteModule, togglePublish, assignPageToModule, removePageFromModule } = useModules();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentModule, setCurrentModule] = useState({ title: '', content: '', published: false, pageIds: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);

  const isTeacher = user?.userType === 'teacher';

  const handleOpenDialog = (module = { title: '', content: '', published: false, pageIds: [] }, editing = false) => {
    setCurrentModule(module);
    setIsEditing(editing);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentModule({ title: '', content: '', published: false, pageIds: [] });
    setIsEditing(false);
  };

  const handleSaveModule = () => {
    saveModule(currentModule);
    handleCloseDialog();
  };

  const handleTogglePage = (pageId) => {
    setCurrentModule(prevModule => {
      const pageIds = prevModule.pageIds.includes(pageId)
        ? prevModule.pageIds.filter(id => id !== pageId)
        : [...prevModule.pageIds, pageId];
      return { ...prevModule, pageIds };
    });
  };

  const handleMoveModule = (index, direction) => {
    const newModules = [...modules];
    const [reorderedModule] = newModules.splice(index, 1);
    newModules.splice(index + direction, 0, reorderedModule);
    
    // Update the order in localStorage
    localStorage.setItem('modules', JSON.stringify(newModules));
    
    // Refresh the modules state
    window.location.reload();
  };

  const handleExpandModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <Layout>
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Modules
      </Typography>
      {isTeacher && (
        <Button 
          variant="contained" 
          onClick={() => handleOpenDialog()} 
          sx={{ mb: 2 }}
        >
          Create New Module
        </Button>
      )}
      <List>
        {modules.map((module, index) => (
          (isTeacher || module.published) && (
            <Paper key={module.id} sx={{ mb: 3, p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{module.title}</Typography>
                {isTeacher && (
                  <Box>
                    <IconButton 
                      onClick={() => handleMoveModule(index, -1)} 
                      disabled={index === 0}
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleMoveModule(index, 1)} 
                      disabled={index === modules.length - 1}
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                  </Box>
                )}
                <IconButton onClick={() => handleExpandModule(module.id)}>
                  {expandedModule === module.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Typography>{module.content}</Typography>
              {isTeacher && (
                <Box sx={{ mt: 2 }}>
                  <Button onClick={() => handleOpenDialog(module, true)} sx={{ mr: 1, color: 'white' }} size = 'small'>Edit</Button>
                  <Button onClick={() => deleteModule(module.id)} sx={{ mr: 1, color: 'white' }} size = 'small'>Delete</Button>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={module.published}
                        onChange={() => togglePublish(module.id)}
                        color="primary"
                      />
                    }
                    label={module.published ? "Published" : "Unpublished"}
                  />
                </Box>
              )}
              <Collapse in={expandedModule === module.id}>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>Assigned Pages:</Typography>
                <List>
                  {pages.filter(page => module.pageIds.includes(page.id)).map(page => (
                    <ListItem key={page.id}>
                      <ListItemText 
                        primary={page.title}
                        secondary={page.content}
                      />
                      {isTeacher && (
                        <Button onClick={() => removePageFromModule(module.id, page.id)} sx={{ mr: 1, color: 'white' }} size = 'small'>Remove</Button>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Paper>
          )
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Edit Module' : 'Create New Module'}</DialogTitle>
        <DialogContent>
          <TextInput
            autoFocus
            margin="dense"
            id="title"
            label="Module Title"
            type="text"
            fullWidth
            variant="standard"
            value={currentModule.title}
            onChange={(e) => setCurrentModule({...currentModule, title: e.target.value})}
          />
          <TextInput
            margin="dense"
            id="content"
            label="Module Content"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={currentModule.content}
            onChange={(e) => setCurrentModule({...currentModule, content: e.target.value})}
          />
          <FormControlLabel
            control={
              <Switch
                checked={currentModule.published}
                onChange={(e) => setCurrentModule({...currentModule, published: e.target.checked})}
                color="primary"
              />
            }
            label="Published"
          />
          <Typography variant="h6" sx={{ mt: 2 }}>Assign Pages:</Typography>
          <List>
            {pages.map(page => (
              <ListItem key={page.id}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentModule.pageIds.includes(page.id)}
                      onChange={() => handleTogglePage(page.id)}
                      color="primary"
                    />
                  }
                  label={page.title}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ mr: 1, color: 'white' }} size = 'small'>Cancel</Button>
          <Button onClick={handleSaveModule} sx={{ mr: 1, color: 'white' }} size = 'small'>Save</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default ModulesPage;