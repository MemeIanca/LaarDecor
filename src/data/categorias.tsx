import type { CardCategoriaProps } from "../Types/CardCategoriaProps";
import quarto from "../assets/img/tentativa/Quarto(1).png";
import quartoinf from "../assets/img/tentativa/Group 4.png";
import banheiro from "../assets/img/tentativa/Banheiro (1).png";
import cozinha from "../assets/img/tentativa/Cozinha (1).png";
import sala from "../assets/img/tentativa/Sala de estar.png";
import area from "../assets/img/tentativa/Área Externa.png";
import escritorio from "../assets/img/tentativa/Escritório.png";


export const categorias: CardCategoriaProps[] = [
    {
        rota: "/produtos/Quarto",
        classeCss: "cards-categoria",
        imgCategoria: <img src={quarto} />,
    },

    {
        rota: "/produtos/Quarto-infantil",
        classeCss: "cards-categoria",
        imgCategoria: <img src={quartoinf} />,
    },

    {
        rota: "/produtos/Banheiro",
        classeCss: "cards-categoria",
        imgCategoria: <img src={banheiro} />,
    },

    {
        rota: "/produtos/Cozinha",
        classeCss: "cards-categoria",
        imgCategoria: <img src={cozinha} />,
    },

    {
        rota: "/produtos/Sala de estar",
        classeCss: "cards-categoria",
        imgCategoria: <img src={sala} />,
    },

    {
        rota: "/produtos/Área externa",
        classeCss: "cards-categoria",
        imgCategoria: <img src={area} />,
    },

    {
        rota: "/produtos/Escritório",
        classeCss: "cards-categoria",
        imgCategoria: <img src={escritorio} />
    }

]
