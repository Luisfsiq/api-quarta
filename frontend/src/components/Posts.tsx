import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import { FavoriteBorder, Comment } from "@mui/icons-material";
import { postService } from "../../services/postService";
import { useAuth } from "../../contexts/AuthContext";
import { Post } from "../../types/User";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  console.log("🔍 [1] Componente montado, user:", user);

  useEffect(() => {
    console.log("🔍 [2] useEffect executando");
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      console.log("🔍 [3] Buscando posts...");
      const postsData = await postService.getPosts();
      console.log("🔍 [4] Posts recebidos:", postsData.length);
      setPosts(postsData);
    } catch (error) {
      console.error("🔍 [ERROR] Erro ao carregar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    console.log("🔍 [5] Mostrando loading");
    return <CircularProgress />;
  }

  console.log("🔍 [6] Renderizando posts:", posts.length);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Posts</Typography>

      {/* TESTE 1: Post simples sem comentários */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">TESTE 1: Post básico</Typography>
          <Typography>Este deve aparecer</Typography>
        </CardContent>
      </Card>

      {/* TESTE 2: Post com estrutura similar aos reais */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <Avatar sx={{ mr: 2 }}>T</Avatar>
            <Box>
              <Typography variant="h6">Usuário Teste</Typography>
              <Typography variant="caption">Agora</Typography>
            </Box>
          </Box>
          <Typography sx={{ mb: 2 }}>Conteúdo do post teste</Typography>
          
          {/* TESTE 3: Ações */}
          <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
            <IconButton><FavoriteBorder /></IconButton>
            <Typography>0 curtidas</Typography>
            <Comment sx={{ ml: 2 }} />
            <Typography>0 comentários</Typography>
          </Box>

          {/* TESTE 4: Área de comentários SIMPLES */}
          <Box sx={{ bgcolor: "yellow", p: 1, border: "2px solid red" }}>
            <Typography variant="subtitle2">🎯 ÁREA DE COMENTÁRIOS VISÍVEL</Typography>
            <TextField 
              size="small" 
              placeholder="Campo de comentário" 
              fullWidth 
            />
          </Box>
        </CardContent>
      </Card>

      {/* Posts reais */}
      {posts.map((post, index) => {
        console.log("🔍 [7] Renderizando post", index, post.id);
        return (
          <Card key={post.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <Avatar sx={{ mr: 2 }}>
                  {post.author.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6">{post.author.name}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(post.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ mb: 2 }}>
                {post.content}
              </Typography>

              <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                <IconButton><FavoriteBorder /></IconButton>
                <Typography>{post.likes.length} curtidas</Typography>
                <Comment sx={{ ml: 2 }} />
                <Typography>{post.comments.length} comentários</Typography>
              </Box>

              {/* Área de comentários real */}
              <Box sx={{ bgcolor: "lightblue", p: 1 }}>
                <Typography variant="subtitle2">COMENTÁRIOS PARA: {post.author.name}</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder={`Comentar em ${post.author.name}...`}
                />
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default Posts;
