import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Blogs/Articles API
export const getBlogs = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}) => {
  try {
    const response = await axios.get(`${API_URL}/blogs`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getBlogById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw error;
  }
};

export const getBlogCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs/get/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    throw error;
  }
};

// Courses/Lessons API
export const getCourses = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  level?: string;
}) => {
  try {
    const response = await axios.get(`${API_URL}/courses`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getCourseById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
    throw error;
  }
};

export const getCourseCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses/get/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course categories:', error);
    throw error;
  }
};

export const getCourseLevels = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses/levels`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course levels:', error);
    throw error;
  }
}; 