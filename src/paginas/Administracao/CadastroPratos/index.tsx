import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";
import { ITags } from "../../../interfaces/ITags";

export default function CadastroPrato() {
    const { id } = useParams<{ id: string }>();
    const [nomePrato, setNomePrato] = useState<string>("");
    const [descricaoPrato, setDescricaoPrato] = useState<string>("");
    const [tag, setTag] = useState<string>("");
    const [tags, setTags] = useState<ITags[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [restaurante, setRestaurante] = useState<string>("");
    const [imagem, setImagem] = useState<File | null>();

    useEffect(() => {
        api.get<{ tags: ITags[] }>(`tags/`)
            .then((resposta) => {
                setTags(resposta.data.tags);
            })
            .catch((erro) => {
                console.log(erro);
            });

        api.get<IRestaurante[]>(`restaurantes/`)
            .then((resposta) => {
                setRestaurantes(resposta.data);
            })
            .catch((erro) => {
                console.log(erro);
            });
    }, []);

    useEffect(() => {
        if (id) {
            api.get<IPrato>(`pratos/${id}/`)
                .then((resposta) => {
                    setNomePrato(resposta.data.nome);
                    setDescricaoPrato(resposta.data.descricao);
                    setTag(resposta.data.tag);
                    setRestaurante(`${resposta.data.restaurante}`);
                })
                .catch((erro) => {
                    console.log(erro);
                });
        }
    }, [id]);

    function submeterFormulario(evento: React.FormEvent) {
        evento.preventDefault();
        const formaData = new FormData();
        formaData.append("nome", nomePrato);
        formaData.append("descricao", descricaoPrato);
        formaData.append("tag", tag);
        formaData.append("restaurante", restaurante);
        
        let urlTarget = `pratos/`;
        let methodTarget = `POST`;

        if (id) {
            urlTarget = `pratos/${id}/`;
            methodTarget = `PUT`;
        } else {
            formaData.append("imagem", imagem!);
        }

        api.request({
            method: methodTarget,
            url: urlTarget,
            data: formaData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((resposta) => {
                setNomePrato("");
                setDescricaoPrato("");
                setTag("");
                setRestaurante("");
                setImagem(null);

                console.log(resposta);
            })
            .catch((erro) => {
                console.log(erro);
            });


    }

    function carregarImagem(evento: React.ChangeEvent<HTMLInputElement>) {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0]);
        } else {
            setImagem(null);
        }
    }

    return (

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h4">Formulário de cadastro</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={submeterFormulario}>
                <TextField
                    value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    variant="outlined"
                    label="Nome do prato"
                    required
                    fullWidth
                    margin="dense"
                />
                <TextField
                    value={descricaoPrato}
                    onChange={evento => setDescricaoPrato(evento.target.value)}
                    variant="outlined"
                    label="Descrição do prato"
                    required
                    fullWidth
                    margin="dense"
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" label="Tag" value={tag} onChange={evento => setTag(evento.target.value as string)}>
                        {tags.map((tag) => (
                            <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                    <Select labelId="select-restaurante" label="Restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value as string)}>
                        {restaurantes.map((restaurante) => (
                            <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="upload-imagem">Imagem</InputLabel>
                    <input type="file" onChange={carregarImagem} />
                </FormControl>
                
                <Button variant="outlined" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
                    Cadastrar
                </Button>
            </Box>
        </Box>

    );
}