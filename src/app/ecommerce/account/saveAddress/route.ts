export async function POST(request: any) {
    const apiUrl = "http://localhost:5135/ecommerce/addAddress";
    try {
      const addAddress = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(await request.json()),
      });
      if (!addAddress.ok) {
        throw new Error(`Error from external API: ${addAddress.statusText}`);
      }
      const response = await addAddress.json();
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return error;
    }
  }

  export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const apiUrl = `http://localhost:5135/ecommerce/addAddress?email=${email}`;
    try {
      const getAddresses = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!getAddresses.ok) {
        throw new Error(`Error from external API: ${getAddresses.statusText}`);
      }
      const response = await getAddresses.json();
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return error;
    }
  }