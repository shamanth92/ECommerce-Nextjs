import { headers } from "next/headers";

export async function POST(request: any) {
  const apiUrl = "http://localhost:5135/ecommerce/wishlist";
  const headersList = headers();
  const referer = headersList.get("authorization");
  if (referer) {
    try {
      const addProductToWishlist = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": referer
        },
        body: JSON.stringify(await request.json()),
      });
      console.log('addProductToWishlist', addProductToWishlist);
      if (!addProductToWishlist.ok) {
        throw new Error(`Error from external API: ${addProductToWishlist.statusText}`);
      }
      const response = await addProductToWishlist.json();
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
  const apiUrl = `http://localhost:5135/ecommerce/wishlist?email=${email}`;
  const headersList = headers();
  const referer = headersList.get("authorization");
  if (referer) {
    try {
      const getWishlist = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": referer
        },
      });
      if (!getWishlist.ok) {
        throw new Error(`Error from external API: ${getWishlist.statusText}`);
      }
      const response = await getWishlist.json();
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
  const email = searchParams.get('email');
  const id = searchParams.get('id');
  const apiUrl = `http://localhost:5135/ecommerce/wishlist?email=${email}&id=${id}`;
  const headersList = headers();
  const referer = headersList.get("authorization");
  if (referer) {
    try {
      const deleteWishlist = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": referer
        },
      });
      // console.log('deleteWishlist', await deleteWishlist.json());
      if (!deleteWishlist.ok) {
        throw new Error(`Error from external API: ${deleteWishlist.statusText}`);
      }
      // const response = await deleteWishlist.json();
      // console.log('response: ', response);
      return new Response(JSON.stringify({ message: 'product deleted from wishlist' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return error;
    }
  }
}
