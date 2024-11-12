export async function POST(request: any) {
  const apiUrl = "http://localhost:5135/ecommerce/checkoutcart";
  try {
    const addItemsToCart = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(await request.json()),
    });
    if (!addItemsToCart.ok) {
      throw new Error(`Error from external API: ${addItemsToCart.statusText}`);
    }
    const response = await addItemsToCart.json();
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return error;
  }
}

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const apiUrl = `http://localhost:5135/ecommerce/checkoutcart?email=${email}`;
  try {
    const getCartItems = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log()
    if (!getCartItems.ok) {
      throw new Error(`Error from external API: ${getCartItems.statusText}`);
    }
    const response = await getCartItems.json();
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return error;
  }
}

export async function DELETE(request: any) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const id = searchParams.get('id');
    console.log(email, id);
    const apiUrl = `http://localhost:5135/ecommerce/CheckoutCart?email=${email}&id=${id}`;
    try {
      const deleteItemFromCart = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!deleteItemFromCart.ok) {
        throw new Error(`Error from external API: ${deleteItemFromCart.statusText}`);
      }
    //   const response = await deleteItemFromCart.json();
      return new Response(JSON.stringify({ message: 'Item deleted from cart' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return error;
    }
  }
