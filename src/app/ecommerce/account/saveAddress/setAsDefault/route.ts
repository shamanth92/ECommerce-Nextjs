import { headers } from "next/headers";

export async function POST(request: any) {
    const apiUrl = "http://localhost:5135/ecommerce/setAsDefault";
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) {
      try {
        const setAsDefault = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
          },
          body: JSON.stringify(await request.json()),
        });
      //   console.log('await setAsDefault.json();', await setAsDefault.json());
        if (!setAsDefault.ok) {
          throw new Error(`Error from external API: ${setAsDefault.statusText}`);
        }
        const response = await setAsDefault.json();
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return error;
      }
    }
  }