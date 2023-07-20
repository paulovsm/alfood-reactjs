import { AppBar, Box, Button, Container, Link, Paper, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

export default function PaginaBaseAdmin() {

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            Administração
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: 'flex' }} >
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{ my: 2, color: 'white' }} color="inherit">Restaurantes</Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/cadastro">
                                <Button sx={{ my: 2, color: 'white' }} color="inherit">Novo Restaurante</Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos">
                                <Button sx={{ my: 2, color: 'white' }} color="inherit">Pratos</Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos/cadastro">
                                <Button sx={{ my: 2, color: 'white' }} color="inherit">Novo Prato</Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth="lg" sx={{ marginTop: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>

            </Box>
        </>
    );
}