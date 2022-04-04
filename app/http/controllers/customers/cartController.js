const { json } = require("express")

function cartController() {
  return {
    index(req, res) {
      res.render("customers/cart")
    },
    update(req, res) {
      // let cart ={
      //     items:{
      //         foodID: {item: foodObject, qty:0}

      //     },
      //     totalQty: 0,
      //     totalPrice: 0
      // }
      //for the first time creating cart and adding basic object structure
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        }
      }
      let cart = req.session.cart;

      //check if cart does not exist in cart
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1
        }
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
      } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
      }
      return res.json({ totalQty: req.session.cart.totalQty })
    },
    deleteItem(req, res) {
      let cart = req.session.cart;
      if (!cart.items) {
        delete req.session.cart;
      }
      cart.totalQty = cart.totalQty - req.session.cart.items[req.body.id].qty;
      cart.totalPrice =
        cart.totalPrice -
        req.session.cart.items[req.body.id].item.price *
          req.session.cart.items[req.body.id].qty;
      delete req.session.cart.items[req.body.id];
      return res.redirect("/cart");
    },
  }
}
module.exports = cartController
