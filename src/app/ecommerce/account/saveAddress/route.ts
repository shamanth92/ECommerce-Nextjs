import { headers } from "next/headers";

export async function POST(request: any) {
    const apiUrl = "http://localhost:5135/ecommerce/addAddress";
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) { 
      try {
        const addAddress = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
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
  }

  export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const apiUrl = `http://localhost:5135/ecommerce/addAddress?email=${email}`;
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) {
      try {
        const getAddresses = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
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
  }

  export async function DELETE(request: any) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const apiUrl = `http://localhost:5135/ecommerce/deleteAddress?id=${id}`;
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) {
      try {
        const deleteAddress = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
          },
        });
        if (!deleteAddress.ok) {
          throw new Error(`Error from external API: ${deleteAddress.statusText}`);
        }
        return new Response(JSON.stringify({ message: 'address deleted' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return error;
      }
    }
  }

  export async function PUT(request: any) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const apiUrl = `http://localhost:5135/ecommerce/updateAddress?id=${id}`;
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) {
      try {
        const updateAddress = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
          },
          body: JSON.stringify(await request.json()),
        });
        if (!updateAddress.ok) {
          throw new Error(`Error from external API: ${updateAddress.statusText}`);
        }
        return new Response(JSON.stringify({ message: 'address updated' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return error;
      }
    }
  }