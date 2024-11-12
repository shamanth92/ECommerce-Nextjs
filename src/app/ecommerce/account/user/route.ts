export async function POST(request: any) {
    const apiUrl = "http://localhost:5135/ecommerce/saveAccount";
    try {
      const addAccount = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const apiUrl = `http://localhost:5135/ecommerce/getAccount?email=${email}`;
    try {
      const getAccount = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!getAccount.ok) {
        throw new Error(`Error from external API: ${getAccount.statusText}`);
      }
      console.log(getAccount);
      const response = await getAccount.json();
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return error;
    }
  }