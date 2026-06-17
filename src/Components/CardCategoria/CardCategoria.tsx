import type { CardCategoriaProps } from '../../Types/CardCategoriaProps';
import './CardCategoria.css'
import { Link } from 'react-router-dom'

export default function CardCategoria({ rota, classeCss, imgCategoria }: CardCategoriaProps) {
  return (
    <Link to={rota} className={`card-categoria ${classeCss}`}>
      {imgCategoria}
    </Link>
  )
}