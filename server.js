import express from "express";
import connection from "./db.js";
import routeCategorie from "./routes/CategorieRoute.js";
import routeProduit from "./routes/ProduitRoute.js";
import routeRequete from "./routes/RequeteRoute.js";

connection.sync().then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
});

const app = express();
app.use(express.json());
app.use("/api/categories", routeCategorie);
app.use("/api/produits", routeProduit);
app.use("/api/requetes", routeRequete);
