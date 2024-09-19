import { Request, Response } from "express";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import dotenv from "dotenv";
dotenv.config();
const WooCommerce = new WooCommerceRestApi({
  url: process.env.URL || "", // L'URL de ta boutique WooCommerce
  consumerKey: process.env.CONSUMER_KEY || "", // Ta clé publique (Consumer Key)
  consumerSecret: process.env.CONSUMER_SECRET || "", // Ta clé secrète (Consumer Secret)
  version: "wc/v3", // Version de l'API WooCommerce
});
const receiveProduct = async (req: Request, res: Response) => {
  try {
    const data = {
      name: "Amir Quality Console",
      type: "simple",
      regular_price: "21.99",
      description:
        "Console personnalisée avec des spécifications uniques. Choisissez la couleur de la coque et des boutons.",
      short_description: "Console customisée avec des options de couleurs.",
    };
    const response = await WooCommerce.post("products", data);
    res.send(response.data);
  } catch (error: any) {
    res.status(500).send({ error: error.response.data });
  }
};

export { receiveProduct };
