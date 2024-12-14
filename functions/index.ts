import { JsonValue } from "@prisma/client/runtime/library";
import { totalAnalysis } from "./analysis.api";
import { findCompetition } from "./findcomp.ai"
import { writeDataToReport } from "./prisma.functions";
import { sendMail } from "./mail";
import { getInsights } from "./insight.ai";

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
    const insights = await getInsights(JSON.stringify({userIdea:prompt,competitionKPI:analysis.analysis_report}))
    const writeToDb = await writeDataToReport({competitionsList,analysis,insights},prompt,userId);
    await sendMail(userId,writeToDb.id)
    return writeToDb;
}