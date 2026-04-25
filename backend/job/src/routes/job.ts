import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import uploadFile from "../middleware/multer.js";
import {
  createCompany, createJob, deleteCompany, getAllActiveJobs,
  getAllApplicationForJob, getAllCompany, getCompanyDetails,
  getSingleJob, updateApplicationStatus, updateJob,
  applyJob, getMyApplications
} from "../controller/job.js";

const jobRouter = express.Router();

jobRouter.post("/company/new", isAuthenticated, uploadFile, createCompany);
jobRouter.delete("/company/:companyId", isAuthenticated, deleteCompany);
jobRouter.post("/new", isAuthenticated, createJob);
jobRouter.put("/update/:jobId", isAuthenticated, updateJob);
jobRouter.get("/company/all", isAuthenticated, getAllCompany);
jobRouter.get("/company/:companyId", getCompanyDetails);
jobRouter.get("/all", getAllActiveJobs);
jobRouter.post("/apply/:jobId", isAuthenticated, applyJob); 
jobRouter.get("/my-applications", isAuthenticated, getMyApplications); 
jobRouter.get("/:id", getSingleJob);
jobRouter.get("/applications/:jobId", isAuthenticated, getAllApplicationForJob);
jobRouter.put("/application/update/:id", isAuthenticated, updateApplicationStatus);

export default jobRouter;