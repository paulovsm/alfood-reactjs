import { Button, Select, TextField } from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

interface IParametrosBusca {
  search?: string;
  ordering?: string;
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState<string>('');
  const [paginaAnterior, setPaginaAnterior] = useState<string>('');
  const [pesquisa, setPesquisa] = useState<string>('');
  const [ordenacao, setOrdenacao] = useState<string>('');

  const atualizarPagina = (pagina: string, parametros: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(pagina, parametros)
      .then(resposta => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  useEffect(() => {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(resposta => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
      })
      .catch(erro => {
        console.log(erro);
      });
  }, []);

  const pesquisarRestaurante = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parametros = {params: {} as IParametrosBusca};

    if (pesquisa) {
      parametros.params.search = pesquisa;
    }

    if (ordenacao) {
      parametros.params.ordering = ordenacao;
    }
    
    atualizarPagina(`http://localhost:8000/api/v1/restaurantes/`, parametros);
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={(event) => { pesquisarRestaurante(event) }}>
      <TextField variant="outlined" label="Pesquisar" onChange={(event) => setPesquisa(event.target.value)} />
      <Select native defaultValue="nome"  value={ordenacao} onChange={(event) => setOrdenacao(event.target.value as string)}>
        <option value="nome">Nome</option>
        <option value="id">ID</option>
      </Select>
      <Button variant="outlined" color="primary" type="submit">Pesquisar</Button>
    </form>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={() => atualizarPagina(proximaPagina)}>Proxima Pagina</button>}
    {paginaAnterior && <button onClick={() => atualizarPagina(paginaAnterior)}>Pagina Anterior</button>}
  </section>)
}

export default ListaRestaurantes