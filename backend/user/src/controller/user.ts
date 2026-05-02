import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";

// 1. Get Profile
export const getUserProfile = TryCatch(async (req, res, next) => {
  const { userId } = req.params;
  
  const users = await sql`
    SELECT 
        u.*, 
        ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills
    FROM users u
    LEFT JOIN user_skills us ON u.user_id = us.user_id
    LEFT JOIN skills s ON us.skill_id = s.skill_id
    WHERE u.user_id = ${userId}
    GROUP BY 
        u.user_id, u.name, u.email, u.password, u.phone_number, u.role, u.bio, 
        u.resume, u.resume_public_id, u.profile_pic, u.profile_pic_public_id, 
        u.created_at, u.subscription, u.wilaya, u.moatmadia, u.specialty, 
        u.education_type, u.has_permis, u.permis_type, u.activity,
        u.years_experience, u.available_now, u.hourly_rate, u.work_radius,
        u.languages, u.portfolio, u.social_media, u.work_days, u.work_hours,
        u.total_jobs_completed, u.total_rating, u.total_reviews
  `;

  if (users.length === 0) throw new ErrorHandler(404, "المستخدم غير موجود");
  
  const user = users[0];
  user.skills = user.skills || [];
  delete user.password;
  res.json(user);
});

// 2. Add Skill
export const addSkillToUser = TryCatch(async (req: any, res, next) => {
  const userId = req.user.user_id;
  const { skill } = req.body;

  if (!skill) return next(new ErrorHandler(400, "أكتب المهارة قبل ما تزيدها"));

  const [skillRow] = await sql`
    INSERT INTO skills (name) 
    VALUES (${skill.trim()}) 
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING skill_id
  `;

  await sql`
    INSERT INTO user_skills (user_id, skill_id) 
    VALUES (${userId}, ${skillRow.skill_id})
    ON CONFLICT (user_id, skill_id) DO NOTHING
  `;

  res.status(200).json({ 
    success: true, 
    message: "تمت إضافة المهارة بنجاح ✅" 
  });
});

// 3. Delete Skill
export const deleteSkillFromUser = TryCatch(async (req: any, res, next) => {
  const userId = req.user.user_id;
  const { skill } = req.body;

  if (!skill) return next(new ErrorHandler(400, "المهارة غير موجودة"));

  await sql`
    DELETE FROM user_skills 
    WHERE user_id = ${userId} 
    AND skill_id = (SELECT skill_id FROM skills WHERE name = ${skill.trim()})
  `;

  res.status(200).json({ 
    success: true, 
    message: "تم حذف المهارة ✅" 
  });
});

// 4. Update User Profile
export const updateUserProfile = TryCatch(async (req: any, res, next) => {
  const user = req.user;
  const { name, phoneNumber, bio, wilaya, moatmadia, specialty, education_type, has_permis, permis_type, activity } = req.body;

  const [updatedUser] = await sql`
    UPDATE users SET 
      name = COALESCE(${name || null}, name),
      phone_number = COALESCE(${phoneNumber || null}, phone_number),
      bio = COALESCE(${bio || null}, bio),
      wilaya = COALESCE(${wilaya || null}, wilaya),
      moatmadia = COALESCE(${moatmadia || null}, moatmadia),
      specialty = COALESCE(${specialty || null}, specialty),
      education_type = COALESCE(${education_type || null}, education_type),
      has_permis = COALESCE(${has_permis === 'yes' || has_permis === true}, has_permis),
      permis_type = COALESCE(${permis_type || null}, permis_type),
      activity = COALESCE(${activity || null}, activity)
    WHERE user_id = ${user.user_id}
    RETURNING *
  `;

  delete updatedUser.password;
  res.status(200).json({ 
    success: true, 
    message: "تم تحديث البيانات بنجاح ✅", 
    updatedUser 
  });
});

// 5. My Profile
export const myProfile = TryCatch(async (req: any, res, next) => {
  const user = { ...req.user };
  delete user.password;
  res.json(user);
});

// 6. جلب جميع المستقلين (Freelancers)
export const getAllFreelancers = TryCatch(async (req, res, next) => {
  const { wilaya, specialty, search } = req.query;
  
  let query = sql`
    SELECT 
      user_id, name, email, phone_number, role, bio, profile_pic,
      wilaya, moatmadia, specialty, activity, has_permis, permis_type, created_at,
      years_experience, available_now, hourly_rate, work_radius,
      languages, portfolio, social_media, work_days, work_hours,
      total_jobs_completed, total_rating, total_reviews
    FROM users 
    WHERE role = 'freelancer'
  `;
  
  if (wilaya && wilaya !== "all") {
    query = sql`${query} AND wilaya ILIKE ${'%' + wilaya + '%'}`;
  }
  if (specialty && specialty !== "all") {
    query = sql`${query} AND (specialty ILIKE ${'%' + specialty + '%'} OR activity ILIKE ${'%' + specialty + '%'})`;
  }
  if (search) {
    query = sql`${query} AND (name ILIKE ${'%' + search + '%'} OR specialty ILIKE ${'%' + search + '%'} OR activity ILIKE ${'%' + search + '%'})`;
  }
  
  query = sql`${query} ORDER BY created_at DESC`;
  
  const freelancers = await query;
  
  const formattedFreelancers = freelancers.map((f: any) => {
    // معالجة الحقول JSON
    const languages = f.languages ? (typeof f.languages === 'string' ? JSON.parse(f.languages) : f.languages) : [];
    const socialMedia = f.social_media ? (typeof f.social_media === 'string' ? JSON.parse(f.social_media) : f.social_media) : {};
    const workDays = f.work_days ? (typeof f.work_days === 'string' ? JSON.parse(f.work_days) : f.work_days) : [];
    const workHours = f.work_hours ? (typeof f.work_hours === 'string' ? JSON.parse(f.work_hours) : f.work_hours) : { start: "08:00", end: "17:00" };
    
    return {
      freelancer_id: f.user_id,
      full_name: f.name,
      phone_number: f.phone_number,
      email: f.email,
      wilaya: f.wilaya,
      moatmadia: f.moatmadia,
      specialty: f.specialty || f.activity,
      activity: f.activity,
      description: f.bio,
      has_permis: f.has_permis,
      permis_type: f.permis_type,
      created_at: f.created_at,
      years_experience: f.years_experience || 0,
      available_now: f.available_now,
      hourly_rate: f.hourly_rate,
      work_radius: f.work_radius || 20,
      languages: languages,
      portfolio: f.portfolio,
      social_media: socialMedia,
      work_days: workDays,
      work_hours: workHours,
      total_jobs_completed: f.total_jobs_completed || 0,
      total_rating: f.total_rating || 0,
      total_reviews: f.total_reviews || 0
    };
  });
  
  res.json({ success: true, freelancers: formattedFreelancers });
});

// 7. جلب مستقل واحد بالمعرف
export const getFreelancerById = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  
  const [freelancer] = await sql`
    SELECT 
      user_id, name, email, phone_number, role, bio, profile_pic,
      wilaya, moatmadia, specialty, activity, has_permis, permis_type, created_at,
      years_experience, available_now, hourly_rate, work_radius,
      languages, portfolio, social_media, work_days, work_hours,
      total_jobs_completed, total_rating, total_reviews
    FROM users 
    WHERE user_id = ${id} AND role = 'freelancer'
  `;
  
  if (!freelancer) {
    throw new ErrorHandler(404, "المستقل غير موجود");
  }
  
  // معالجة الحقول JSON
  const languages = freelancer.languages ? (typeof freelancer.languages === 'string' ? JSON.parse(freelancer.languages) : freelancer.languages) : [];
  const socialMedia = freelancer.social_media ? (typeof freelancer.social_media === 'string' ? JSON.parse(freelancer.social_media) : freelancer.social_media) : {};
  const workDays = freelancer.work_days ? (typeof freelancer.work_days === 'string' ? JSON.parse(freelancer.work_days) : freelancer.work_days) : [];
  const workHours = freelancer.work_hours ? (typeof freelancer.work_hours === 'string' ? JSON.parse(freelancer.work_hours) : freelancer.work_hours) : { start: "08:00", end: "17:00" };
  
  const formattedFreelancer = {
    freelancer_id: freelancer.user_id,
    full_name: freelancer.name,
    phone_number: freelancer.phone_number,
    email: freelancer.email,
    wilaya: freelancer.wilaya,
    moatmadia: freelancer.moatmadia,
    specialty: freelancer.specialty || freelancer.activity,
    activity: freelancer.activity,
    description: freelancer.bio,
    has_permis: freelancer.has_permis,
    permis_type: freelancer.permis_type,
    created_at: freelancer.created_at,
    years_experience: freelancer.years_experience || 0,
    available_now: freelancer.available_now,
    hourly_rate: freelancer.hourly_rate,
    work_radius: freelancer.work_radius || 20,
    languages: languages,
    portfolio: freelancer.portfolio,
    social_media: socialMedia,
    work_days: workDays,
    work_hours: workHours,
    total_jobs_completed: freelancer.total_jobs_completed || 0,
    total_rating: freelancer.total_rating || 0,
    total_reviews: freelancer.total_reviews || 0
  };
  
  res.json({ success: true, freelancer: formattedFreelancer });
});

// Placeholders
export const applyForJob = TryCatch(async (req, res, next) => {
  res.json({ success: true, message: "Applied" });
});

export const getAllApplication = TryCatch(async (req, res, next) => {
  res.json({ success: true });
});

export const updateProfilePic = TryCatch(async (req, res, next) => {
  res.json({ success: true, message: "Picture updated" });
});

export const updateResume = TryCatch(async (req, res, next) => {
  res.json({ success: true, message: "Resume updated" });
});