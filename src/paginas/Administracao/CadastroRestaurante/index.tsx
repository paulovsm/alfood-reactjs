import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function CadastroRestaurante() {
    const { id } = useParams<{ id: string }>();
    const [nomeRestaurante, setNomeRestaurante] = useState<string>("");

    useEffect(() => {
        if (id) {
            api.get<IRestaurante>(`restaurantes/${id}/`)
                .then((resposta) => {
                    setNomeRestaurante(resposta.data.nome);
                })
                .catch((erro) => {
                    console.log(erro);
                });
        }
    }, [id]);

    function submeterFormulario(evento: React.FormEvent) {
        evento.preventDefault();

        if (id) {
            api.put(`restaurantes/${id}/`, {
                nome: nomeRestaurante
            })
                .then((resposta) => {
                    console.log("Atualizado com sucesso!");
                })
                .catch((erro) => {
                    console.log(erro);
                });
            return;
        } else {

            api.post("restaurantes/", {
                nome: nomeRestaurante
            })
                .then((resposta) => {
                    console.log("Cadastrado com sucesso!");
                })
                .catch((erro) => {
                    console.log(erro);
                });
        }
    }

    return (

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h4">Formulário de cadastro</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={submeterFormulario}>
                <TextField
                    value={nomeRestaurante}
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                    variant="outlined"
                    label="Nome do restaurante"
                    required
                    fullWidth />
                <Button variant="outlined" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
                    Cadastrar
                </Button>
            </Box>
        </Box>

    );
}