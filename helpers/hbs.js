const hbs = require("hbs");

hbs.registerHelper("includes", function (arr, value) {
  if (arguments.length < 2)
    throw new Error("Handlerbars Helper 'includes' needs 2 parameters");

  return arr.includes(value);
});

hbs.registerHelper("sizeIncluded", function (arr, value) {
  if (arguments.length < 2)
    throw new Error("Handlerbars Helper 'includes' needs 2 parameters");

  return arr.find( elmt => elmt.size === value) === -1 ? false : true;
});

hbs.registerHelper("ternary", (test, yes, no) => (test ? yes : no));

hbs.registerHelper("compare", function (lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  console.log(typeof lvalue,typeof rvalue)
  var operator = options.hash.operator || "==";

  var operators = {
    "==": function (l, r) {
      return l == r;
    },
    "===": function (l, r) {
      return l === r;
    },
    "!=": function (l, r) {
      return l != r;
    },
    "<": function (l, r) {
      return l < r;
    },
    ">": function (l, r) {
      return l > r;
    },
    "<=": function (l, r) {
      return l <= r;
    },
    ">=": function (l, r) {
      return l >= r;
    },
    typeof: function (l, r) {
      return typeof l == r;
    },
  };

  if (!operators[operator])
    throw new Error(
      "Handlerbars Helper 'compare' doesn't know the operator " + operator
    );

  var result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});


hbs.registerHelper("compareFavorites",(favorites,idProduct,options) =>{

console.log(favorites, idProduct)
  for(let favorite of favorites){
    if(favorite.toString() === idProduct.toString()){
    return options.fn(this)
    }
  }
  options.inverse(this)
})