import axios from 'axios';
import { API_URL } from './Constants.js';

export const login = (username, password) => {
    return axios.post(`${API_URL}/users/login`, { username, password });
};

export const createMember = (member, token) => {
    return axios.post(`${API_URL}/members`, member, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getMembers = (token) => {
    return axios.get(`${API_URL}/members`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteMember = (id, token) => {
    return axios.delete(`${API_URL}/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getMemberById = (id, token) => {
    return axios.get(`${API_URL}/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateMember = (member, token) => {
    return axios.put(`${API_URL}/members`, member, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
