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
  const {
    name,
    Baseconsole,
    Coque,
    Coque_arriere,
    ecranIPS,
    Boutons,
    Pads,
    accessoires,
    prixFinal,
  } = req.body;

  try {
    const wooCommerceData = {
      name: name,
      type: "simple",
      regular_price: prixFinal.toString(),
      description: "Console personnalisée avec des spécifications uniques.",
      short_description:
        "Console personnalisée avec des spécifications uniques.",
      attributes: [
        {
          id: 1,
          name: "Base console",
          options: [Baseconsole],
          position: 0, // Position dans l'affichage
          visible: true, // Visible sur la page produit
          variation: false, // False si ce n'est pas un attribut de variation
        },
        {
          id: 2,
          name: "Coque",
          options: [Coque],
          position: 1, // Position dans l'affichage
          visible: true, // Visible sur la page produit
          variation: false, // False si ce n'est pas un attribut de variation
        },
        {
          id: 3,
          name: "Coque arrière",
          options: [Coque_arriere],
          position: 2, // Position dans l'affichage
          visible: true, // Visible sur la page produit
          variation: false, // False si ce n'est pas un attribut de variation
        },
        {
          id: 4,
          name: "Ecran IPS rétroéclairé",
          options: [ecranIPS],
          position: 3, // Position dans l'affichage
          visible: true, // Visible sur la page produit
          variation: false, // False si ce n'est pas un attribut de variation
        },
        {
          id: 5,
          name: "Boutons",
          options: [Boutons],
          position: 4, // Position dans l'affichage
          visible: true, // Visible sur la page produit
          variation: false, // False si ce n'est pas un attribut de variation
        },
        {
          id: 6,
          name: "Pads",
          options: [Pads],
          position: 5, // Position dans l'affichage
          visible: true, // Visible sur la page produit
          variation: false, // False si ce n'est pas un attribut de variation
        },
        {
          id: 8,
          name: "Accessoires",
          options: [accessoires.join(", ")],
          position: 6, // Position dans l'affichage
          visible: true, // Visible sur la page produit
          variation: false, // False si ce n'est pas un attribut de variation
        },
      ],
    };
    const response = await WooCommerce.post("products", wooCommerceData);
    res.send(response.data);
  } catch (error: any) {
    console.log(error?.response.data);
    res.status(500).send({ error: error.response.data });
  }
};

export { receiveProduct };
