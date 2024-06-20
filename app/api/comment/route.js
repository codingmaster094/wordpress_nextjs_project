import { createComment } from "lib/comments";

export async function POST(req) {
    try {
        const body = await req.json(); // Parse JSON body

        
        const resJson = await createComment(body);

        if (resJson.errors) {
            console.error('GraphQL errors:', resJson.errors);
            return new Response(
                JSON.stringify({ message: resJson.errors[0]?.message || 'Unknown error' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const success = resJson.data?.createComment?.success;
        if (success) {
            return new Response(
                JSON.stringify({ message: "Your comment is awaiting approval" }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ message: "An unknown error occurred" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Unexpected error:', error);
        return new Response(
            JSON.stringify({ message: "An error occurred while processing your request", error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
