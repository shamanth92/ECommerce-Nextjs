export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  let apiUrl;
  if (!id) {
    apiUrl = `http://localhost:5135/ecommerce/fetchproducts`;
  } else {
    apiUrl = `http://localhost:5135/ecommerce/fetchproducts?id=${id}`;
  }
  console.log('apiUrl: ', apiUrl)
  try {
    const getProducts = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!getProducts.ok) {
      throw new Error(`Error from external API: ${getProducts.statusText}`);
    }
    const response = await getProducts.json();
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return error;
  }
}
