import crypto from "crypto";
import dotenv from "dotenv";

// 加载环境变量
dotenv.config();

// 配置密钥和 IV
const ENCRYPTION_KEY = process.env.SECRET_KEY || "defaultkey1234567"; // 必须是 16, 24 或 32 字节
const IV = process.env.IV || crypto.randomBytes(16).toString("hex"); // 若未定义，则生成随机 IV
const IV_LENGTH = 16; // AES 的 IV 长度始终为 16 字节

/**
 * 加密函数
 * @param text 明文字符串
 * @returns 加密后的字符串，格式为 "IV:加密内容"
 */
export function encrypt(text: string): string {
  const ivBuffer = Buffer.from(IV, "hex"); // 将 IV 转换为 Buffer
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    ivBuffer
  );
  let encrypted = cipher.update(text, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${IV}:${encrypted.toString("hex")}`;
}

/**
 * 解密函数
 * @param text 加密后的字符串，格式为 "IV:加密内容"
 * @returns 解密后的明文字符串
 */
export function decrypt(text: string): string {
  const [iv, encryptedText] = text.split(":");
  if (!iv || !encryptedText) {
    throw new Error("Invalid encrypted data format");
  }
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(Buffer.from(encryptedText, "hex"));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf8");
}
