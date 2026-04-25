/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AppContextType, Application, AppProviderProps, User } from "@/type";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

export const auth_service_url = "http://localhost:3001";
export const utils_service_url = "http://localhost:3002"; 
export const user_service_url = "http://localhost:4002";
export const job_service_url = "http://localhost:4003";
export const payment_service_url = "http://localhost:4004";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [application, setApplication] = useState<Application[] | null>(null);
  const token = Cookies.get("token");

  async function fetchUserData() {
    if (!token) {
      setLoading(false);
      setIsAuth(false);
      return;
    }
    try {
      const { data } = await axios.get(`${user_service_url}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  async function addSkill(
    skillValue: string,
    setSkill: React.Dispatch<React.SetStateAction<string>>
  ): Promise<void> {
    if (!token || !skillValue.trim()) return;
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${user_service_url}/api/user/skill/add`,
        { skill: skillValue }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message || "Skill added");
      setSkill("");
      await fetchUserData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error adding skill");
    } finally {
      setBtnLoading(false);
    }
  }

  async function removeSkill(skillValue: string): Promise<void> {
    if (!token) return;
    try {
      await axios.put(
        `${user_service_url}/api/user/skill/delete`,
        { skill: skillValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (user && user.skills) {
        setUser({ ...user, skills: user.skills.filter(s => s !== skillValue) });
      }
      toast.success("Skill removed");
    } catch (error: any) {
      toast.error("Error removing skill");
    }
  }

  async function updateUser(payload: any): Promise<boolean> {
    setBtnLoading(true);
    try {
      const { data } = await axios.put(`${user_service_url}/api/user/update/profile`, payload, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(data.message); 
      await fetchUserData(); 
      return true;
    } catch (error: any) { 
      toast.error("Update failed"); 
      return false; 
    } finally { 
      setBtnLoading(false); 
    }
  }

  async function updateProfilePic(formData: any) {
    setLoading(true);
    try {
      const { data } = await axios.put(`${user_service_url}/api/user/update/profile_pic`, formData, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(data.message); 
      await fetchUserData();
    } catch (error: any) { 
      toast.error("Upload failed"); 
    } finally { 
      setLoading(false); 
    }
  }

  async function updateResume(formData: any) {
    setLoading(true);
    try {
      const { data } = await axios.put(`${user_service_url}/api/user/update/resume`, formData, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(data.message); 
      await fetchUserData();
    } catch (error: any) { 
      toast.error("Resume failed"); 
    } finally { 
      setLoading(false); 
    }
  }

  async function applyJob(job_id: number): Promise<void> {
    if (!token) { toast.error("Login first"); return; }
    setBtnLoading(true);
    try {
      await axios.post(`${job_service_url}/api/job/apply/${job_id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Applied!");
      await fetchApplication();
    } catch (error: any) { 
      toast.error("Apply failed"); 
    } finally { 
      setBtnLoading(false); 
    }
  }

  async function fetchApplication(): Promise<void> {
    if (!token) return;
    try {
      const { data } = await axios.get(`${job_service_url}/api/job/my-applications`, { headers: { Authorization: `Bearer ${token}` } });
      setApplication(data);
    } catch (error: any) { 
      console.error("Fetch Application Error:", error.message); 
    }
  }

  async function logoutUser() {
    Cookies.remove("token"); 
    setUser(null); 
    setIsAuth(false); 
    setApplication(null);
    toast.success("Logged out");
  }

  useEffect(() => {
    fetchUserData();
    if (token) fetchApplication();
  }, [token]);

  return (
    <AppContext.Provider value={{
      user, btnLoading, loading, isAuth, setIsAuth, setLoading, setUser,
      logoutUser, updateProfilePic, updateResume, updateUser, addSkill,
      removeSkill, applyJob, application, fetchApplication,
    }}>
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppData Error");
  return context;
};