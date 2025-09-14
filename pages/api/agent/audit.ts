import type { NextApiRequest, NextApiResponse } from "next";
import { auditEnvs } from "@/agents/emviAgent";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  
  try {
    const report = await auditEnvs();
    res.status(200).json({ ok: true, report });
  } catch (error) {
    console.error("Audit error:", error);
    res.status(500).json({ ok: false, error: "Audit failed" });
  }
}