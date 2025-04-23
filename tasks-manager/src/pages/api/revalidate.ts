import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        console.log("Revalidating rute /");
        await res.revalidate("/")
        return res.json({ revalidate: true})
    } catch (error) {
        console.error("Error revalidating:", error);
        return res.status(500).send({
            error: "Error revalidating",
            details: error instanceof Error ? error.message : "Unknown error"
        })
    }
}
