import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function AdministracaoRestaurantes() {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        api.get("restaurantes/")
            .then((resposta) => {
                setRestaurantes(resposta.data);
            })
            .catch((erro) => {
                console.log(erro);
            }
            );
    }, []);

    function excluirRestaurante(restaurante: IRestaurante) {
        api.delete(`restaurantes/${restaurante.id}/`)
            .then((resposta) => {
                setRestaurantes(restaurantes.filter((restauranteAtual) => restauranteAtual.id !== restaurante.id));
            })
            .catch((erro) => {
                console.log(erro);
            });
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map((restaurante) => (
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.nome}</TableCell>
                            <TableCell>
                                [ <Link to={`/admin/restaurantes/cadastro/${restaurante.id}`}>editar</Link> ]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluirRestaurante(restaurante)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}