import {
    Check as CheckIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Todo as TodoType } from '../todo';

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: TodoType = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date() : undefined,
        };
      }
      return todo;
    }));
  };

  const startEditing = (todo: TodoType) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: editText };
      }
      return todo;
    }));
    setEditingId(null);
  };

  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Todo App
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addTodo}
            disabled={!newTodo.trim()}
          >
            Add
          </Button>
        </Box>

        <Typography variant="h6" gutterBottom>
          Pending Tasks
        </Typography>
        <List>
          {pendingTodos.map(todo => (
            <ListItem key={todo.id} divider>
              {editingId === todo.id ? (
                <TextField
                  fullWidth
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => saveEdit(todo.id)}
                  onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                  autoFocus
                />
              ) : (
                <>
                  <ListItemText
                    primary={todo.text}
                    secondary={`Created: ${format(new Date(todo.createdAt), 'PPp')}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => startEditing(todo)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => toggleComplete(todo.id)}>
                      <CheckIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Completed Tasks
        </Typography>
        <List>
          {completedTodos.map(todo => (
            <ListItem key={todo.id} divider>
              <ListItemText
                primary={todo.text}
                secondary={`Completed: ${format(new Date(todo.completedAt!), 'PPp')}`}
                sx={{ textDecoration: 'line-through' }}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => toggleComplete(todo.id)}>
                  <CheckIcon color="success" />
                </IconButton>
                <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Todo; 