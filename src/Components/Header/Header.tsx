import { Nav, Navbar } from 'react-bootstrap';
import './Header.css';
import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavItem } from 'react-bootstrap';
import logo from '../../assets/img/laar logo.png';
import Cookies from 'js-cookie';

export default function Header() {

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const isLoggedIn = useMemo(() => {
        return !!Cookies.get('auth_token');
    }, []);

    const handleLogout = () => {
        Cookies.remove('auth_token'); 
        navigate('/');
        window.location.reload();
    };

    const handleSearch = () => {
        if (!searchTerm.trim()) return; // ignora buscas vazias
        // console.log('Buscando por:', searchTerm);
        navigate(`/produtos/pesquisa?query=${encodeURIComponent(searchTerm)}`); //apenas executa o navigate concatenando a URL fixa de pesquisa com o termo pesquisado
        setSearchTerm("");
    }

    const handleKeyDown = (evento: React.KeyboardEvent<HTMLInputElement>) => {
        if (evento.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <header>
            <Navbar expand="md" className="container_geral container-header">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto conteudo-nav">
                        {/*1/3*/}
                        <Nav.Item>
                            <Link to={"/"} title='Ir para página inicial'>
                                <svg className="icone-home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
                                </svg>
                            </Link>
                        </Nav.Item>
                        {/*2/3*/}
                        <NavItem className="box-busca" id="box-busca">
                            <svg className="icone-lupa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path
                                    d="M432 272C432 183.6 360.4 112 272 112C183.6 112 112 183.6 112 272C112 360.4 183.6 432 272 432C360.4 432 432 360.4 432 272zM401.1 435.1C365.7 463.2 320.8 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272C480 320.8 463.2 365.7 435.1 401.1L569 535C578.4 544.4 578.4 559.6 569 568.9C559.6 578.2 544.4 578.3 535.1 568.9L401.1 435.1z" />
                            </svg>
                            <input className="campo-busca"
                                type="text"
                                value={searchTerm}
                                onChange={p => setSearchTerm(p.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder='Busque por Produtos'
                            />
                        </NavItem>
                        {/*3/3*/}
                        {
                            isLoggedIn ? (
                                // 3/3: Se logado, botões para pg. Cadastro e Logout
                                <Nav.Item className='botoes_direita'>
                                    <Link to={"/produtos/cadastro"} title='Cadastrar novos bolos'>
                                        <svg className="add" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor" d="M240 48c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 192-192 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l192 0 0 192c0 8.8 7.2 16 16 16s16-7.2 16-16l0-192 192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-192 0 0-192z" />
                                        </svg>
                                    </Link>
                                    <button onClick={handleLogout} title='Sair / Finalizar sessão'>
                                        <svg className="logout" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M18.3 261.7c-3.1-3.1-3.1-8.2 0-11.3l144-144c2.3-2.3 5.7-3 8.7-1.7l0 0c3 1.2 4.9 4.2 4.9 7.4l0 88c0 4.4 3.6 8 8 8l120 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-120 0c-4.4 0-8 3.6-8 8l0 88c0 3.2-1.9 6.2-4.9 7.4s-6.4 .6-8.7-1.7l-144-144zM151 95L7 239c-9.4 9.4-9.4 24.6 0 33.9l0 0 144 144c6.9 6.9 17.2 8.9 26.2 5.2S192 409.7 192 400l0-80 112 0c26.5 0 48-21.5 48-48l0-32c0-26.5-21.5-48-48-48l-112 0 0-80c0-9.7-5.8-18.5-14.8-22.2S157.9 88.2 151 95zM328 464c-4.4 0-8 3.6-8 8s3.6 8 8 8l88 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-88 0c-4.4 0-8 3.6-8 8s3.6 8 8 8l88 0c44.2 0 80 35.8 80 80l0 256c0 44.2-35.8 80-80 80l-88 0z" />
                                        </svg>
                                    </button>
                                </Nav.Item>
                            ) : (
                                 // 3/3: Se não logado, botão para pg. Login
                                <Nav.Item>
                                    <Link to={"/login"} title='Fazer login' >
                                        <img className="icone-logo" src={logo} alt="" />
                                    </Link>
                                </Nav.Item>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
        </header>

    )
}
