import { json } from "@remix-run/node";
import { encrypt, decrypt } from "~/routes/utils.encryption";
import { connectToDatabase } from "~/routes/utils.db";
import { ObjectId } from "mongodb";

// 定义 Job 类型
interface Job {
  id?: string;
  title: string;
  description: string;
  skillsRequired: string;
  location: string;
  employmentType: string;
  salary?: string;
}

// Loader: 处理 GET 请求以获取职位列表
export async function loader() {
  try {
    // 连接数据库
    const db = await connectToDatabase();
    const jobsCollection = db.collection("jobs");

    // 从数据库获取加密的职位数据
    const encryptedJobs = await jobsCollection.find({}).toArray();

    // 解密职位数据
    const decryptedJobs = encryptedJobs.map((job) => ({
      id: job._id.toString(),
      title: decrypt(job.title),
      description: decrypt(job.description),
      skillsRequired: decrypt(job.skillsRequired),
      location: decrypt(job.location),
      employmentType: decrypt(job.employmentType),
      salary: job.salary ? decrypt(job.salary) : undefined, // 处理可选字段
    }));

    // 返回成功响应
    return json({ success: true, jobs: decryptedJobs });
  } catch (error) {
    console.error("Error loading jobs:", error);
    return json({ success: false, error: "Failed to load jobs" }, { status: 500 });
  }
}

// Action: 处理 POST 请求以创建新的职位
export async function action({ request }: { request: Request }) {
  if (request.method === "POST") {
    try {
      // 检查 Content-Type 是否为 JSON
      const contentType = request.headers.get("Content-Type");
      if (contentType !== "application/json") {
        return json(
          { success: false, error: "Invalid content type. Expected application/json." },
          { status: 400 }
        );
      }

      // 解析请求体
      const body = await request.json();

      // 提取并验证字段
      const {
        title,
        description,
        skillsRequired,
        location,
        employmentType,
        salary,
        consent,
      } = body;

      // 验证必填字段是否存在
      if (!title || !description || !skillsRequired || !location || !employmentType) {
        return json(
          { success: false, error: "Missing required fields." },
          { status: 400 }
        );
      }

      // 验证用户同意条款
      if (consent !== true) {
        return json(
          { success: false, error: "User consent is required to post a job." },
          { status: 403 }
        );
      }

      // 加密敏感字段
      const encryptedJob = {
        title: encrypt(title),
        description: encrypt(description),
        skillsRequired: encrypt(skillsRequired),
        location: encrypt(location),
        employmentType: encrypt(employmentType),
        salary: salary ? encrypt(salary) : null, // 可选字段加密
      };

      // 连接数据库并插入新职位
      const db = await connectToDatabase();
      const jobsCollection = db.collection("jobs");
      const result = await jobsCollection.insertOne(encryptedJob);

      // 构造返回的解密职位数据
      const newJob: Job = {
        id: result.insertedId.toString(),
        title,
        description,
        skillsRequired,
        location,
        employmentType,
        salary,
      };

      // 返回成功响应
      return json({ success: true, job: newJob }, { status: 201 });
    } catch (error) {
      console.error("Error processing job post:", error);
      return json(
        { success: false, error: "Failed to post job." },
        { status: 500 }
      );
    }
  }

  // 返回方法不允许的错误
  return json({ success: false, error: "Method not allowed." }, { status: 405 });
}
