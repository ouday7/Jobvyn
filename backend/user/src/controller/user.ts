import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";

// 1. Get Profile (Tjib el user bel skills mte3ou)
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
        u.education_type, u.has_permis, u.permis_type
  `;

  if (users.length === 0) throw new ErrorHandler(404, "المستخدم غير موجود");
  
  const user = users[0];
  user.skills = user.skills || []; // N'assurerou ennou dima famma array
  res.json(user);
});

// 2. Add Skill (L'endpoint elli y3ayétlou el frontend: /api/user/skill/add)
export const addSkillToUser = TryCatch(async (req: any, res, next) => {
  const userId = req.user.user_id;
  const { skill } = req.body; // El frontend yab3ath { skill: "React" }

  if (!skill) return next(new ErrorHandler(400, "أكتب المهارة قبل ما تزيدها"));

  // [A] Inseri el skill fil table 'skills' ken mch mawjouda
  const [skillRow] = await sql`
    INSERT INTO skills (name) 
    VALUES (${skill.trim()}) 
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING skill_id
  `;

  // [B] Erbet el user bel skill fil table 'user_skills'
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

// 3. Delete Skill (L'endpoint elli y3ayétlou el frontend: /api/user/skill/delete)
export const deleteSkillFromUser = TryCatch(async (req: any, res, next) => {
  const userId = req.user.user_id;
  const { skill } = req.body; // El frontend yab3ath { skill: "React" }

  if (!skill) return next(new ErrorHandler(400, "المهارة غير موجودة"));

  // Nfasskhou el lien bin el user wel skill
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

// 4. Update User Profile (Data el 3adiya)
export const updateUserProfile = TryCatch(async (req: any, res, next) => {
  const user = req.user;
  const { name, phoneNumber, bio, wilaya, moatmadia, specialty } = req.body;

  const [updatedUser] = await sql`
    UPDATE users SET 
      name = ${name || user.name},
      phone_number = ${phoneNumber || user.phone_number},
      bio = ${bio || user.bio},
      wilaya = ${wilaya || user.wilaya},
      moatmadia = ${moatmadia || user.moatmadia},
      specialty = ${specialty || user.specialty}
    WHERE user_id = ${user.user_id}
    RETURNING *
  `;

  res.status(200).json({ 
    success: true, 
    message: "تم تحديث البيانات بنجاح ✅", 
    updatedUser 
  });
});

// 5. My Profile
export const myProfile = TryCatch(async (req: any, res, next) => {
  res.json(req.user);
});

// --- Placeholders (Khallihom kima homa ken ma 3andekch el logic mte3hom tawa) ---
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