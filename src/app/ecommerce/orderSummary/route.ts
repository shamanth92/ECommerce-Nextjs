import { headers } from "next/headers";

export async function POST(request: any) {
  const apiUrl = "http://localhost:5135/ecommerce/ordersummary";
  const headersList = headers();
  const referer = headersList.get("authorization");
  if (referer) {
    try {
      const storeOrderSummary = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": referer
        },
        body: JSON.stringify(await request.json()),
      });
      if (!storeOrderSummary.ok) {
        throw new Error(
          `Error from external API: ${storeOrderSummary.statusText}`
        );
      }
      const response = await storeOrderSummary.json();
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return error;
    }
  }
}

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const apiUrl = `http://localhost:5135/ecommerce/ordersummary?email=${email}`;
  const headersList = headers();
  const referer = headersList.get("authorization");
  if (referer) {
    try {
      const getOrders = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": referer
        },
      });
      if (!getOrders.ok) {
        throw new Error(`Error from external API: ${getOrders.statusText}`);
      }
      const response = await getOrders.json();
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return error;
    }
  }
}
