import { api } from "../../services/api";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

export default function Home() {
  const [marvelCharacters, setMarvelCharacters] = useState([]);
  const [page, setPage] = useState(1);

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    async function getListPaginate() {
      const { data } = await api.get("/v1/public/characters", {
        params: {
          offset: page * 20,

          limit: 20,
        },
      });
      setMarvelCharacters(data);
    }
    getListPaginate();
  }, [page]);

  return (
    <Container>
      <Typography color="primary" variant="h1">
        Marvel List
      </Typography>
      <Grid container gap={4} justifyContent="center">
        {marvelCharacters?.data?.results.map((item) => (
          <Grid item xs={3} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Link href={`character/${item.id}`}>
                  <a>
                    <Button size="small" variant="contained">
                      More details
                    </Button>
                  </a>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box justifyContent="center" display="flex" width="100%" marginTop="1rem">
        <Pagination
          onChange={handleChangePagination}
          count={+Math.floor(+marvelCharacters?.data?.total / 20)}
          shape="rounded"
          page={page}
          variant="outlined"
        />
      </Box>
    </Container>
  );
}

export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
