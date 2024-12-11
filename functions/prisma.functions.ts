import prisma from "../prisma/index"
export const writeDataToReport = async (data:any,prompt:string,userId:string) => {
    return await prisma.report.create({
        data:{
            userId,
            data,
            prompt
        }
    })
}