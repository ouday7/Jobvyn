import axios from "axios";
import getBuffer from "../utils/buffer.js";
import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Register (supports jobseeker, recruiter, freelancer)
export const registerUser = TryCatch(async (req, res, next) => {
  console.log("📥 Registration Attempt:", req.body);
  const { 
    name, email, password, phoneNumber, role, bio,
    wilaya, moatmadia, specialty, educationType, hasPermis, permisType,
    activity  // new field for freelancer
  } = req.body;

  // Validation commune pour tous les rôles
  if (!name || !email || !password || !phoneNumber || !role || !wilaya || !moatmadia || !specialty) {
    throw new ErrorHandler(400, "بربي ثبت في معطياتك، فمة حقول ناقصة.");
  }

  // Validation spécifique pour freelancer
  if (role === "freelancer" && !activity) {
    throw new ErrorHandler(400, "بربي أذكر نشاطك (نجار، بلومبي، كهربائي...)");
  }

  const existingUser = await sql`SELECT user_id FROM users WHERE email = ${email} OR phone_number = ${phoneNumber}`;
  if (existingUser.length > 0) throw new ErrorHandler(409, "الإيميل أو الهاتف مسجل مسبقاً.");

  const hashPassword = await bcrypt.hash(password, 10);
  let resumeUrl = null, resumePublicId = null;

  // Seulement les jobseekers peuvent uploader un CV
  if (role === "jobseeker" && req.file) {
    const fileBuffer = getBuffer(req.file);
    const { data } = await axios.post(`${process.env.UPLOAD_SERVICE_URL}/api/utils/upload`, { buffer: fileBuffer.content });
    resumeUrl = data.url; resumePublicId = data.public_id;
  }

  let registeredUser;

  if (role === "freelancer") {
    const [user] = await sql`
      INSERT INTO users (
        name, email, password, phone_number, role, bio, 
        wilaya, moatmadia, specialty, activity,
        has_permis, permis_type
      ) VALUES (
        ${name}, ${email}, ${hashPassword}, ${phoneNumber}, ${role}, ${bio || null},
        ${wilaya}, ${moatmadia}, ${specialty}, ${activity},
        ${hasPermis === 'yes' || hasPermis === 'true'}, ${permisType || null}
      ) 
      RETURNING user_id, name, email, role, activity
    `;
    registeredUser = user;
  } else {
    const [user] = await sql`
      INSERT INTO users (
        name, email, password, phone_number, role, bio, resume, resume_public_id,
        wilaya, moatmadia, specialty, education_type, has_permis, permis_type
      ) VALUES (
        ${name}, ${email}, ${hashPassword}, ${phoneNumber}, ${role}, ${bio || null}, ${resumeUrl}, ${resumePublicId},
        ${wilaya}, ${moatmadia}, ${specialty}, ${educationType || null},
        ${hasPermis === 'yes' || hasPermis === 'true'}, ${permisType || null}
      ) 
      RETURNING user_id, name, email, role
    `;
    registeredUser = user;
  }

  const token = jwt.sign({ id: registeredUser.user_id }, process.env.JWT_SECRET as string, { expiresIn: "15d" });
  res.status(201).json({ success: true, message: "تم التسجيل بنجاح", registeredUser, token });
});

// Login
export const loginUser = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ErrorHandler(401, "إيميل أو كلمة سر مغلطة");
  }
  const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET as string, { expiresIn: "15d" });
  
  // Ne pas envoyer le mot de passe
  delete user.password;
  
  res.status(200).json({ success: true, user, token });
});

export const forgotPassword = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "Forgot password logic here" });
});

export const resetPassword = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "Reset password logic here" });
});