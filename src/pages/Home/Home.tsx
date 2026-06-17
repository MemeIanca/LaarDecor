import { Link } from 'react-router-dom'
import './Home.css'
import banner1 from "../../assets/banner 1.png";
import banner2 from "../../assets/banner 2.png";
import banner3 from "../../assets/banner 3.png";
import whatszapp from "../../assets/img/what.png"

import quarto from "../../assets/img/tentativa/Quarto(1).png";
import quartoinf from "../../assets/img/tentativa/Group 4.png";
import banheiro from "../../assets/img/tentativa/Banheiro (1).png";
import cozinha from "../../assets/img/tentativa/Cozinha (1).png";
import sala from "../../assets/img/tentativa/Sala de estar.png";
import area from "../../assets/img/tentativa/Área Externa.png";
import escritorio from "../../assets/img/tentativa/Escritório.png";
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';


export default function Home() {
  return (
    <>
      <Header />
      <main >
        <section className="banner">
          <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={banner1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={banner2} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={banner3} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>

        <section className="container-cabecalho">
          <section className="cards-categoria">

            <div className="linha1">
              <Link to={''} className="quarto">
                <img src={quarto} alt="" />
              </Link>

              <Link to={''} className="quarto-inf">
                <img src={quartoinf} alt="" />
              </Link>
            </div>
            <div className="linha2">
              <Link to={''} className="banheiro">
                <img src={banheiro} alt="" />
              </Link>

              <Link to={''} className="cozinha">
                <img src={cozinha} alt="" />
              </Link>

              <Link to={''} className="sala">
                <img src={sala} alt="" />
              </Link>
            </div>
            <div className="linha3">
              <Link to={''} className="area">
                <img src={area} alt="" />
              </Link>

              <Link to={''} className="escrit">
                <img src={escritorio} alt="" />
              </Link>
            </div>

          </section>
        </section>

        <Link to={"https://wa.me/5511940028922?text=Olá%21%20Gostaria%20de%20saber%20mais%20sobre%20o%20produto"} className="whatsapp" >
          <img src={whatszapp} alt="icone do whatsapp" />
        </Link >


      </main >

      <Footer />

    </>
  )
}
