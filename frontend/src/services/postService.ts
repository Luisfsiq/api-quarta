import api from "./api";
import { Post } from "../types/User";

export const postService = {
  async getPosts(): Promise<Post[]> {
    const response = await api.get("/posts");
    return response.data;
  },

  async createPost(content: string, image?: string): Promise<Post> {
    const userData = localStorage.getItem("user");
    
    if (!userData) {
      throw new Error("User not logged in");
    }

    const user = JSON.parse(userData);
    
    if (!user?.id) {
      throw new Error("User ID not found");
    }

    const response = await api.post("/posts", { 
      content, 
      image, 
      authorId: user.id 
    });
    
    return response.data;
  },

  async likePost(postId: string): Promise<Post> {
    const userData = localStorage.getItem("user");
    
    if (!userData) {
      throw new Error("User not logged in");
    }

    const user = JSON.parse(userData);
    
    const response = await api.patch(`/posts/${postId}/like`, { 
      userId: user.id 
    });
    
    return response.data;
  },

  async addComment(postId: string, content: string): Promise<Post> {
    const userData = localStorage.getItem("user");
    
    if (!userData) {
      throw new Error("User not logged in");
    }

    const user = JSON.parse(userData);
    
    const response = await api.post(`/posts/${postId}/comments`, { 
      content,
      authorId: user.id 
    });
    
    return response.data;
  },

  async deletePost(postId: string): Promise<void> {
    await api.delete(`/posts/${postId}`);
  }
};
