import { Item } from "../models/Item";
export const itemPrices: Record<string, {price: Item["price"], discount?: Item["discount"]}> = {
    "Apple": { "price": 35 },
    "Banana": { "price": 20 },
    "Melon": { "price": 50, "discount": {  "buyItems": 2, "forThePriceOfItems": 1 } },
    "Lime": { "price": 15, "discount": { "buyItems": 3, "forThePriceOfItems": 2 } }
};