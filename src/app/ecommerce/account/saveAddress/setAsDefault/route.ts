export async function POST(request: any) {
    const apiUrl = "http://localhost:5135/ecommerce/setAsDefault";
    try {
      const setAsDefault = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

//   {
//     id: '673506b4ce021028ac874cb8',
//     property: 'setAsDefault',
//     value: true,
//     email: 'rainyweather@abc.com'
//   }