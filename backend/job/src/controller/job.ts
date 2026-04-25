import axios from "axios";
import { AuthenticatedRequest } from "../middleware/auth.js";
import getBuffer from "../utils/buffer.js";
import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";
import { applicationStatusUpdateTemplate } from "../template.js";
import { publishToTopic } from "../producer.js";

export const createCompany = TryCatch(async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;
    if (!user) throw new ErrorHandler(401, "❌ Authentication required");
    if (user.role !== "recruiter") throw new ErrorHandler(403, "❌ Forbidden: Only recruiter can create a company");
    const { name, description, website } = req.body;
    if (!name || !description || !website) throw new ErrorHandler(400, "Please fill all necessary details");
    const normalizedName = name.trim().toLowerCase();
    const existingCompany = await sql`SELECT company_id FROM companies WHERE name = ${normalizedName}`;
    if (existingCompany.length > 0) throw new ErrorHandler(409, `A company with this name ${normalizedName} already exists`);
    const file = req.file;
    if (!file) throw new ErrorHandler(400, "Company logo file is required");
    const fileBuffer = getBuffer(file);
    const { data } = await axios.post(`${process.env.UPLOAD_SERVICE_URL}/api/utils/upload`, { buffer: fileBuffer.content });
    const [newCompany] = await sql`INSERT INTO companies (name, description, website, logo, logo_public_id, recruiter_id) VALUES (${normalizedName}, ${description}, ${website}, ${data.url}, ${data.public_id}, ${user.user_id}) RETURNING *;`;
    res.json({ message: "Company created successfully", newCompany });
});

export const deleteCompany = TryCatch(async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;
    const { companyId } = req.params;
    const [company] = await sql`SELECT logo_public_id FROM companies WHERE company_id = ${companyId} AND recruiter_id = ${user?.user_id}`;
    if (!company) throw new ErrorHandler(404, "❌ Company not found or unauthorized");
    await sql`DELETE FROM companies WHERE company_id = ${companyId}`;
    res.json({ message: "Company and all associated jobs have been deleted" });
});

export const createJob = TryCatch(async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;
    if (user?.role !== "recruiter") throw new ErrorHandler(403, "❌ Forbidden: Only recruiter can create a job");
    const { title, description, salary, location, role, job_type, work_location, company_id, openings } = req.body;
    const [newJob] = await sql`INSERT INTO jobs (title, description, salary, location, role, job_type, work_location, company_id, posted_by_recruiter_id, openings) VALUES (${title}, ${description}, ${salary}, ${location}, ${role}, ${job_type}, ${work_location}, ${company_id}, ${user.user_id}, ${openings}) RETURNING *;`;
    res.json({ message: "Job created successfully", job: newJob });
});

export const updateJob = TryCatch(async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;
    const { title, description, salary, location, role, job_type, work_location, openings, is_active } = req.body;
    const [updatedJob] = await sql`UPDATE jobs SET title=${title}, description=${description}, salary=${salary}, location=${location}, role=${role}, job_type=${job_type}, work_location=${work_location}, openings=${openings}, is_active=${is_active} WHERE job_id = ${req.params.jobId} AND posted_by_recruiter_id = ${user?.user_id} RETURNING *;`;
    res.json({ message: "Job Updated Successfully!", updatedJob });
});

export const getAllCompany = TryCatch(async (req: AuthenticatedRequest, res, next) => {
    const companies = await sql`SELECT * FROM companies WHERE recruiter_id = ${req.user?.user_id}`;
    res.json({ companies });
});

export const getCompanyDetails = TryCatch(async (req: AuthenticatedRequest, res, next) => {
    const { companyId } = req.params;
    const [companyData] = await sql`SELECT c.*, COALESCE((SELECT json_agg(j.*) FROM jobs j WHERE j.company_id = c.company_id), '[]'::json) AS jobs FROM companies c WHERE c.company_id = ${companyId} GROUP BY c.company_id;`;
    res.json({ companyData });
});

export const getAllActiveJobs = TryCatch(async (req, res, next) => {
    const { title, location } = req.query as any;
    const jobs = await sql`SELECT j.*, c.name AS company_name, c.logo AS company_logo FROM jobs j JOIN companies c ON j.company_id = c.company_id WHERE j.is_active = true AND (j.title ILIKE ${'%' + (title || '') + '%'}) AND (j.location ILIKE ${'%' + (location || '') + '%'}) ORDER BY j.created_at DESC`;
    res.json(jobs);
});

export const getSingleJob = TryCatch(async (req, res, next) => {
    const [job] = await sql`SELECT * FROM jobs WHERE job_id = ${req.params.id}`;
    res.json(job);
});

export const applyJob = TryCatch(async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;
    const { jobId } = req.params;
    const [existing] = await sql`SELECT application_id FROM application WHERE job_id = ${jobId} AND applicant_id = ${user?.user_id}`;
    if (existing) throw new ErrorHandler(400, "⚠️ Already applied");
    const [newApp] = await sql`INSERT INTO application (job_id, applicant_id, applicant_email, resume, status) VALUES (${jobId}, ${user?.user_id}, ${user?.email}, ${user?.resume || 'no-resume'}, 'Submitted') RETURNING *;`;
    res.status(201).json({ success: true, message: "Applied successfully", newApp });
});

export const getMyApplications = TryCatch(async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;
    const applications = await sql`SELECT a.*, j.title, j.location, j.salary, c.name as company_name, c.logo as company_logo FROM application a JOIN jobs j ON a.job_id = j.job_id JOIN companies c ON j.company_id = c.company_id WHERE a.applicant_id = ${user?.user_id} ORDER BY a.applied_at DESC`;
    res.json(applications);
});

export const getAllApplicationForJob = TryCatch(async (req: AuthenticatedRequest, res, next) => {
    const applications = await sql`
        SELECT a.*, u.name as candidate_name, u.email as candidate_email, u.profile_pic as candidate_pic, u.user_id as candidate_id 
        FROM application a 
        JOIN users u ON a.applicant_id = u.user_id 
        WHERE a.job_id = ${req.params.jobId} 
        ORDER BY a.applied_at DESC`;
    res.json(applications);
});

export const updateApplicationStatus = TryCatch(async (req: AuthenticatedRequest, res, next) => {
    const [updated] = await sql`UPDATE application SET status = ${req.body.status} WHERE application_id = ${req.params.id} RETURNING *`;
    res.json({ message: "Application Status updated", updated });
});