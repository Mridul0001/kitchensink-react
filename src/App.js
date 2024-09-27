import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MemberForm from './components/MemberForm';
import MemberTable from './components/MemberTable';
import { createMember, deleteMember, getMemberById, getMembers, updateMember } from './api';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box, Grid, Divider } from '@mui/material';

const theme = createTheme();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');
  const [members, setMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const isAuthenticated = !!token;

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('jwtToken', token);
    fetchMembers(token);
  };

  const fetchMembers = async (token) => {
    try {
      const response = await getMembers(token);
      setMembers(response.data);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  const handleSave = async (member) => {
    try{
      await createMember(member, token)
    }catch(error){
      throw error;
    }
    fetchMembers(token);
    setCurrentMember(null);
    setIsEdit(false);
  };

  const handleUpdate = async (member) => {
    member.id = currentMember.id;
    try{
      await updateMember(member, token)
    }catch(error){
      throw error;
    }
    fetchMembers(token);
    setCurrentMember(null);
    setIsEdit(false);
  };

  const handleEdit = (member) => {
    setCurrentMember(member);
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    await deleteMember(id, token);
  }

  const handleGetById = async (id) => {
    return await getMemberById(id, token);
  }

  // Check token expiration
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
          setToken('');
          localStorage.removeItem('jwtToken');
          alert('Session expired, please log in again');
        }
      }
    };
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [token]);

  // Fetch members when the token is updated
  useEffect(() => {
    fetchMembers(token);
  }, [token]); // Runs when the token changes

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
              JBoss Migration Demo
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          {/* Public route for login */}
          <Route path="/login" element={<Box
            sx={{
              height: '90vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <LoginForm onLogin={handleLogin} />
              </Grid>
            </Grid>
          </Box>} />

          {/* Members page, only accessible if authenticated */}
          <Route
            path="/members"
            element={
              isAuthenticated ? (
                <Box sx={{ padding: '20px' }}>
                                <Grid container spacing={2} alignItems="flex-start">
                                    {/* Member Form - 40% width */}
                                    <Grid item xs={12} sm={5} md={4}>
                                        <Box sx={{ width: '100%' }}>
                                            <MemberForm
                                                token={token}
                                                currentMember={currentMember}
                                                onSave={handleSave}
                                                isEdit={isEdit}
                                                onUpdate={handleUpdate}
                                            />
                                        </Box>
                                    </Grid>

                                    {/* Vertical Divider */}
                                    <Divider orientation="vertical" flexItem />

                                    {/* Member Table - 60% width */}
                                    <Grid item xs={12} sm={7} md={7}>
                                        <Box sx={{ width: '100%' }}>
                                            <MemberTable
                                                members={members}
                                                token={token}
                                                onEdit={handleEdit}
                                                onRefresh={() => fetchMembers(token)}
                                                onDelete={handleDelete}
                                                onGetById={handleGetById}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Catch-all route redirects to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;