import { JsonValue } from "@prisma/client/runtime/library";
import { totalAnalysis } from "./analysis.api";
import { findCompetition } from "./findcomp.ai"
import { writeDataToReport } from "./prisma.functions";
import { sendMail } from "./resend";

export const main = async (prompt:string,userId:string): Promise<{
    id: string;
    userId: string;
    data: JsonValue;
    createdAt: Date;
    updatedAt: Date;
}> => {
    const competitionsList = await findCompetition(prompt)
    const saasDomains = competitionsList.Competitors.map(c=>c.Domain);
    const analysis = await totalAnalysis(saasDomains)
    const writeToDb = await writeDataToReport({competitionsList,analysis},prompt,userId);
    await sendMail(userId,writeToDb.id)
    return writeToDb;
}