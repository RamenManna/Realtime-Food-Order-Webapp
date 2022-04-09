import { loadStripe } from "@stripe/stripe-js";
import { placeOrder } from "./apiService";
import { CardWidget } from "./CardWidget";
export async function initStripe() {
  const stripe = await loadStripe(
    "pk_test_51KmWgrSFHOuuipGTZu41og3brzmJ2tFI3rUGfU5XZz10FgTiNggVTjhuUCaV696wOEhnzhA4mx9DxxW4AJAKDejq00kcXx4N0U"
  );
  let card = null;
  //   function mountWidget() {
  //     const elements = stripe.elements();

  //     let style = {
  //       base: {
  //         color: "#32325d",
  //         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //         fontSmoothing: "antialiased",
  //         fontSize: "16px",
  //         "::placeholder": {
  //           color: "#aab7c4",
  //         },
  //       },
  //       invalid: {
  //         color: "#fa755a",
  //         iconColor: "#fa755a",
  //       },
  //     };
  //     card = elements.create("card", { style, hidePostalCode: true });
  //     card.mount("#card-element");
  //   }

  const paymentType = document.querySelector("#paymentType");
  if (!paymentType) {
    return;
  }

  paymentType.addEventListener("change", (e) => {
    console.log(e.target.value);
    if (e.target.value == "card") {
      //Display Widget
      //   mountWidget();
      card = new CardWidget(stripe);
      card.mount();
    } else {
      card.destroy(); //nothing to display
    }
  });

  //Ajax Call is here!!
  const paymentForm = document.querySelector("#payment-form");
  if (paymentForm) {
    paymentForm.addEventListener("submit", async(e) => {
      e.preventDefault();
      let formData = new FormData(paymentForm);
      let formObject = {};

      for (let [key, value] of formData.entries()) {
        formObject[key] = value;
      }

      if (!card) {
        //Ajax
        placeOrder(formObject);
        return;
      }
      const token = await card.createToken()
      formObject.stripeToken = token.id;
      placeOrder(formObject);
      //verify card here
      //   stripe.createToken(card).then((result)=>{
      //     // console.log(result)
      //     formObject.stripeToken = result.token.id;
      //     placeOrder(formObject);
      //   }).catch(()=>{
      //       console.log(err)
      //   })
    });
  }
}
