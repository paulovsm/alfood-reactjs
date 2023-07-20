import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../http";
import IPrato from "../../../interfaces/IPrato";

export default function AdministracaoPratos() {
    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
        api.get("pratos/")
            .then((resposta) => {
                setPratos(resposta.data);
            })
            .catch((erro) => {
                console.log(erro);
            }
            );
    }, []);

    function excluirPrato(prato: IPrato) {
        api.delete(`pratos/${prato.id}/`)
            .then((resposta) => {
                setPratos(pratos.filter((pratoAtual) => pratoAtual.id !== prato.id));
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
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map((prato) => (
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell><a href={prato.imagem} target="_blank" rel="noreferrer">Link</a></TableCell>
                            <TableCell>
                                [ <Link to={`/admin/pratos/cadastro/${prato.id}`}>editar</Link> ]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluirPrato(prato)}>
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