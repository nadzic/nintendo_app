export const calculateTotal = (products) => {
  if (!products || !Array.isArray(products)) {
    return 0;
  }
  let sum = 0;
  products.forEach(product => {
    sum += product.price;
  });

  return parseFloat(sum.toFixed(2));
};

export const getIndexInUpcs = (upcCode, upcs) => {
  if (!upcCode || !upcs) {
    return 0;
  }
  let index = 0;
  for (let i = 0; i < upcs.length; i++) {
    if (upcs[i].toString() === upcCode.toString()) {
      index = i;
      break;
    }
  }

  return index;
};

export const alreadyInProducts = (upcCode, products) => {
  if (!upcCode || !products) {
    return false;
  }
  let isIn = false;
  products.forEach(product => {
    if (product.upcCode === upcCode.toString()) {
      isIn = true;
    }
  });

  return isIn;
};
