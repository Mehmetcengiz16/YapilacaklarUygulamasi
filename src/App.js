import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Paper,
  ListItemSecondaryAction,
  Chip,
  Tooltip,
  InputAdornment,
  alpha
} from '@mui/material';
import { 
  Delete, 
  Add, 
  CheckCircle, 
  RadioButtonUnchecked,
  Flag,
  Schedule,
  Label,
  Star,
  StarBorder,
  AccessTime
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6',
    },
    secondary: {
      main: '#22C55E',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    error: {
      main: '#EF4444',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '0.8rem',
          height: '28px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.15)',
          },
        },
        label: {
          padding: '0 12px',
        },
        icon: {
          color: 'inherit',
        },
      },
    },
  },
});

const priorityColors = {
  yüksek: '#DC2626',
  orta: '#F59E0B',
  düşük: '#22C55E',
};

const categories = {
  iş: { color: '#3B82F6', icon: <Schedule />, label: 'İş' },
  kişisel: { color: '#EC4899', icon: <Label />, label: 'Kişisel' },
  acil: { color: '#EF4444', icon: <Flag />, label: 'Acil' },
};

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState({
    text: '',
    priority: 'orta',
    category: 'kişisel'
  });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTask.text.trim() !== '') {
      setTodos([...todos, { 
        ...newTask,
        completed: false, 
        id: Date.now(),
        createdAt: new Date()
      }]);
      setNewTask({
        ...newTask,
        text: ''
      });
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
            animation: 'pulse 8s ease-in-out infinite',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200%',
            height: '200%',
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(124, 58, 237, 0.1) 0deg, transparent 60deg, rgba(16, 185, 129, 0.1) 120deg, transparent 180deg, rgba(124, 58, 237, 0.1) 240deg, transparent 300deg)',
            animation: 'rotate 20s linear infinite',
            pointerEvents: 'none',
          },
          '@keyframes rotate': {
            '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
            '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
          },
          '@keyframes pulse': {
            '0%': { opacity: 0.3 },
            '50%': { opacity: 0.6 },
            '100%': { opacity: 0.3 },
          },
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ mb: 6, position: 'relative' }}>
              <Typography 
                variant="h4" 
                component="h1" 
                align="center" 
                sx={{
                  textShadow: '0 0 40px rgba(124, 58, 237, 0.5)',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #7C3AED 30%, #10B981 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '3px',
                  mb: 2,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #7C3AED, #10B981)',
                    borderRadius: '2px',
                  }
                }}
              >
                Yapılacaklar Listesi
              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}
              >
                <AccessTime sx={{ fontSize: 18 }} />
                {time.toLocaleTimeString('tr-TR', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper 
              elevation={6} 
              sx={{ 
                p: 3, 
                mb: 4,
                borderRadius: 6,
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(124, 58, 237, 0.1)',
                transform: 'perspective(1000px) rotateX(0deg)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'perspective(1000px) rotateX(2deg) translateY(-5px)',
                  boxShadow: '0 12px 40px rgba(124, 58, 237, 0.2)',
                  borderColor: 'rgba(124, 58, 237, 0.2)',
                },
              }}
            >
              <form onSubmit={handleAddTodo}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  p: '8px',
                  border: '1px solid rgba(124, 58, 237, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(124, 58, 237, 0.2)',
                  },
                }}>
                  <TextField
                    fullWidth
                    placeholder="✨ Yeni görev ekle..."
                    value={newTask.text}
                    onChange={(e) => setNewTask({...newTask, text: e.target.value})}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start" sx={{ ml: 1, gap: 1, display: 'flex' }}>
                          <Tooltip title="Öncelik seç" arrow placement="top">
                            <Chip
                              size="small"
                              icon={newTask.priority === 'yüksek' ? <Star sx={{ fontSize: 18 }} /> : <StarBorder sx={{ fontSize: 18 }} />}
                              label={newTask.priority}
                              onClick={(e) => {
                                const priorities = ['düşük', 'orta', 'yüksek'];
                                const currentIndex = priorities.indexOf(newTask.priority);
                                const nextPriority = priorities[(currentIndex + 1) % priorities.length];
                                setNewTask({...newTask, priority: nextPriority});
                              }}
                              sx={{
                                backgroundColor: alpha(priorityColors[newTask.priority], 0.2),
                                color: priorityColors[newTask.priority],
                                fontWeight: 'bold',
                                minWidth: '80px',
                                '& .MuiChip-icon': {
                                  color: priorityColors[newTask.priority],
                                },
                                '&:hover': {
                                  backgroundColor: alpha(priorityColors[newTask.priority], 0.3),
                                }
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Kategori seç" arrow placement="top">
                            <Chip
                              size="small"
                              icon={categories[newTask.category].icon}
                              label={categories[newTask.category].label}
                              onClick={(e) => {
                                const categoryTypes = Object.keys(categories);
                                const currentIndex = categoryTypes.indexOf(newTask.category);
                                const nextCategory = categoryTypes[(currentIndex + 1) % categoryTypes.length];
                                setNewTask({...newTask, category: nextCategory});
                              }}
                              sx={{
                                backgroundColor: alpha(categories[newTask.category].color, 0.2),
                                color: categories[newTask.category].color,
                                fontWeight: 'bold',
                                minWidth: '80px',
                                '& .MuiChip-icon': {
                                  color: categories[newTask.category].color,
                                },
                                '&:hover': {
                                  backgroundColor: alpha(categories[newTask.category].color, 0.3),
                                }
                              }}
                            />
                          </Tooltip>
                        </InputAdornment>
                      ),
                      sx: {
                        px: 2,
                        py: 1.5,
                        fontSize: '1rem',
                        '& input::placeholder': {
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontSize: '1rem',
                        },
                      }
                    }}
                  />
                </Box>
              </form>
            </Paper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper 
              elevation={6} 
              sx={{ 
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <List>
                <AnimatePresence>
                  {todos.map((todo) => (
                    <motion.div
                      key={todo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ListItem
                        sx={{
                          transition: 'all 0.3s ease',
                          background: todo.completed 
                            ? alpha('#22C55E', 0.1)
                            : 'rgba(255, 255, 255, 0.03)',
                          borderLeft: `4px solid ${categories[todo.category].color}`,
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          py: 2.5,
                          px: 3,
                          '&:hover': {
                            background: todo.completed 
                              ? alpha('#22C55E', 0.15)
                              : 'rgba(255, 255, 255, 0.06)',
                            transform: 'translateX(5px)',
                          },
                        }}
                      >
                        <IconButton
                          edge="start"
                          onClick={() => handleToggleTodo(todo.id)}
                          sx={{ 
                            color: todo.completed ? 'secondary.main' : 'rgba(255, 255, 255, 0.3)',
                            transition: 'all 0.3s ease',
                            mr: 2,
                            '&:hover': {
                              transform: 'scale(1.1) rotate(180deg)',
                            },
                          }}
                        >
                          {todo.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                        </IconButton>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                          <ListItemText
                            primary={todo.text}
                            secondary={new Date(todo.createdAt).toLocaleTimeString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                            sx={{
                              '& .MuiTypography-root': {
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                opacity: todo.completed ? 0.7 : 1,
                                transition: 'all 0.3s ease',
                                fontSize: '1rem',
                                fontWeight: 500,
                              },
                              '& .MuiTypography-secondary': {
                                fontSize: '0.75rem',
                                color: 'rgba(255, 255, 255, 0.5)',
                              },
                            }}
                          />
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title={`Öncelik: ${todo.priority}`} arrow>
                              <Chip
                                size="small"
                                icon={todo.priority === 'yüksek' ? <Star /> : <StarBorder />}
                                label={todo.priority}
                                sx={{
                                  backgroundColor: alpha(priorityColors[todo.priority], 0.2),
                                  color: priorityColors[todo.priority],
                                  fontWeight: 'bold',
                                  border: `1px solid ${alpha(priorityColors[todo.priority], 0.4)}`,
                                  '& .MuiChip-icon': {
                                    color: priorityColors[todo.priority],
                                  },
                                  '&:hover': {
                                    backgroundColor: alpha(priorityColors[todo.priority], 0.3),
                                  }
                                }}
                              />
                            </Tooltip>
                            <Tooltip title={`Kategori: ${categories[todo.category].label}`} arrow>
                              <Chip
                                size="small"
                                icon={categories[todo.category].icon}
                                label={categories[todo.category].label}
                                sx={{
                                  backgroundColor: alpha(categories[todo.category].color, 0.2),
                                  color: categories[todo.category].color,
                                  fontWeight: 'bold',
                                  border: `1px solid ${alpha(categories[todo.category].color, 0.4)}`,
                                  '& .MuiChip-icon': {
                                    color: categories[todo.category].color,
                                  },
                                  '&:hover': {
                                    backgroundColor: alpha(categories[todo.category].color, 0.3),
                                  }
                                }}
                              />
                            </Tooltip>
                          </Box>
                        </Box>
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => handleDeleteTodo(todo.id)}
                            sx={{
                              color: 'error.main',
                              opacity: 0.7,
                              '&:hover': {
                                opacity: 1,
                                transform: 'scale(1.1) rotate(8deg)',
                                background: alpha('#CF6679', 0.1),
                              },
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {todos.length === 0 && (
                  <Box 
                    sx={{ 
                      p: 8, 
                      textAlign: 'center', 
                      color: 'rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: 4,
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(124, 58, 237, 0.05), rgba(16, 185, 129, 0.05))',
                        animation: 'gradient 8s ease infinite',
                      },
                      '@keyframes gradient': {
                        '0%': { opacity: 0.5 },
                        '50%': { opacity: 0.8 },
                        '100%': { opacity: 0.5 },
                      }
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography variant="h6" sx={{ mb: 2, color: '#7C3AED' }}>
                        ✨ Henüz hiç görev eklenmemiş
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        Yeni bir görev eklemek için yukarıdaki alanı kullanın
                      </Typography>
                    </motion.div>
                  </Box>
                )}
              </List>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 