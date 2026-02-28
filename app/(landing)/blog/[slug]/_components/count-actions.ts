import prisma from "@/lib/db";
import { success } from "zod";

export async function CountActions(slug:string){
    try{
        const response = await prisma.blogPost.update({
            where: { slug },
            data: {
                views: {
                    increment: 1,
                },
        }    });
        return { success: true, views: response.views };
    }catch(error){
        console.error("Error updating blog post views:", error);
        return { success: false, error: "Failed to update views" };

    }
}