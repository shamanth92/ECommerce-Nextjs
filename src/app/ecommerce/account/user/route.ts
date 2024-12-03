import { headers } from "next/headers";

export async function POST(request: any) {
    const apiUrl = "http://localhost:5135/ecommerce/saveAccount";
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) {
      try {
        const addAccount = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
          },
          body: JSON.stringify(await request.json()),
        });
        if (!addAccount.ok) {
          throw new Error(`Error from external API: ${addAccount.statusText}`);
        }
        const response = await addAccount.json();
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return error;
      }
    }
  }

  export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const apiUrl = `http://localhost:5135/ecommerce/getAccount?email=${email}`;
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) {
      try {
        const getAccount = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
          },
        });
        if (!getAccount.ok) {
          throw new Error(`Error from external API: ${getAccount.statusText}`);
        }
        const response = await getAccount.json();
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return error;
      }
    }
 
  }