import { formatosService } from '../../services/formatosService';
import type { CardProdutoProps } from '../../Types/CardProdutoProps';
import './CardProduto.css';
import decoracao_default from "../../assets/img/Pagina-quarto/sofa-icone.jpg"

export default function CardProduto({ nome, descricao, preco, imagem, id, }: CardProdutoProps) {
    
    // console.log("Imagem: " + imagem);
  const imageUrl = imagem.length > 0
    ? `http://localhost:5103/${imagem}`
    : decoracao_default;

    return (

        <div key={id} className="card-produto">
            <img src={imageUrl} alt={nome} />
            <p>{(descricao.length > 0) ? descricao : "Descrição não informada"}</p>
            
            <h2>{nome}</h2>
            <div>
                <span className='valor'> {formatosService.PrecoBR(preco)} </span>
                <br />
            </div>
        </div>
    )
}
 