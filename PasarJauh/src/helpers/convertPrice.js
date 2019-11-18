export function convertPrice(price = 0, currency = "Rp") {
  price = price
    .toString()
    .replace(/\D/g, "")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  price = price && `${currency} ${price}`;
  return price;
}
