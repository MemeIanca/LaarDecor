import whatsapp from '../../assets/img/what.png';
import termo from '../../assets/img/WhatsApp Image 2025-12-16 at 14.51.06.jpeg';
import './Produtos.css';
import { useEffect, useState } from 'react';
import type { Decoracao } from '../../Types/Decoracao';
import { getDecoracao } from '../../services/decoracaoService';
import CardProduto from '../../Components/CardProduto/CardProduto';
import Carrosel from '../../Components/Carrosel/Carrosel';
import Header from '../../Components/Header/Header';
import { useLocation, useParams } from 'react-router-dom';

import Footer from '../../Components/Footer/Footer';

export default function Produtos() {

    const [decoracao, setDecoracao] = useState<Decoracao[]>([]);
    const location = useLocation();
    const { categoria } = useParams<{ categoria: string }>();

    const parametrosPesquisados = new URLSearchParams(location.search);
    const termo_Pesquisado = parametrosPesquisados.get('query');

    const fetchDecoracao = async () => {
        try {
            const dados = await getDecoracao();
            console.log("Lista de Decoração vinda da API: ", dados);
            if (categoria) {
                const dados_filtrados = dados.filter(d => d.categorias.some(cat => cat.toLowerCase() === categoria.
                    toLowerCase()));
                setDecoracao(dados_filtrados);
                console.log(dados_filtrados)
            }
            else if (termo_Pesquisado) {
                const dados_filtrados = dados.filter(d =>
                    d.nome.toLowerCase().includes(termo_Pesquisado.toLowerCase()) ||
                    d.descricao.toLowerCase().includes(termo_Pesquisado.toLowerCase()) ||
                    d.categorias.some(cat => cat.toLowerCase().includes(termo_Pesquisado.toLowerCase()))

                );
                setDecoracao(dados_filtrados);

                console.log(dados_filtrados)
            } else {
                setDecoracao(dados);
            }

        } catch (error) {
            console.error("Erro ao executar getDecoracao: ", error);
        }
    }
    useEffect(() => {
        fetchDecoracao();
        console.log("Termo pesquisado: ", termo_Pesquisado);

    }, [termo_Pesquisado])

    return (
        <>
            <Header />
            <Carrosel />
            <main>

                <section className="container-laardecor ">
                    <h1 className="acessivel">produtos do quarto</h1>
                    <div className="titulo">
                        <span>
                            {
                                categoria
                                    ? categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase()
                                    : termo_Pesquisado
                                        ? `Resultados para: "${termo_Pesquisado}"`
                                        : "Nenhum filtro aplicado"
                            }
                        </span>
                        <hr />
                    </div>

                    <div className="cards-produto">
                        {
                            decoracao.map((d: Decoracao) => (
                                <CardProduto
                                    key={d.id}
                                    descricao={d.descricao}
                                    preco={d.preco}
                                    imagem={d.imagens[0] ?? ""} nome={''} />

                            ))
                        }
                        {
                            decoracao.length == 0 &&
                            <div className='algo' ><h3>O termo pesquisado<br />não foi encontrado</h3>
                                <img src={termo} alt="foto_termo_nao_encontrado" />
                            </div>
                        }


                    </div>
                </section>

                <a className="whatsapp" href="https://wa.me/5511999999999?text=Olá%20quero%20saber%20mais!" target="_blank">
                    <img src={whatsapp} alt="" />

                </a>

            </main >
            <Footer />
        </>
    )
}
