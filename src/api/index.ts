import { action } from "@solidjs/router";

// KV 数据类型定义
export interface KvUser {
    email: string;
    password: string;
  }

/**
 * 读取 KV 数据库中的用户信息（email 和 password）
 * @returns {Promise<KvUser|null>} 用户信息对象或 null
 */
export async function getKvUser(): Promise<KvUser | null> {
    "use server";
    // 打开 KV 数据库
    const kv = await Deno.openKv();
    // const kv = await Deno.openKv();
    // 读取 email 和 password
    const [emailRes, passwordRes] = await Promise.all([
      kv.get(["email"]),
      kv.get(["password"]),
    ]);
    if (!emailRes.value || !passwordRes.value) return null;
    return {
      email: emailRes.value as string,
      password: passwordRes.value as string,
    };
  }

  /**
 * 向 KV 数据库添加/更新用户信息（email 和 password）
 * @param {FormData} formData 表单数据对象
 * @returns {Promise<boolean>} 是否写入成功
 */
export const setKvUser = action(async function (
    formData: FormData
  ): Promise<boolean> {
    "use server";
    try {
      // prod mode, do not use access token
    //   const kv = await openKv();
      // dev mode, use access token
      const kv = await Deno.openKv();
  
      console.log(kv);
      await kv.set(["email"], formData.get("email"));
      await kv.set(["password"], formData.get("password"));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  });