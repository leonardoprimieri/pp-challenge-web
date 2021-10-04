import ArrowBack from "@mui/icons-material/ArrowBack";
import PlusIcon from "@mui/icons-material/ControlPointSharp";
import Image from "next/image";
import Link from "next/link";

import { TabPanel } from "../../components/TabPanel";
import { Button, CardActions, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import { api } from "../../../services/api";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

export default function Character({ characterData }) {
  const character = characterData.data.results[0];
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <Container>
      <Link href="/">
        <a>
          <Button style={{ margin: "1rem 0" }} variant="outlined" startIcon={<ArrowBack />}>
            Go back
          </Button>
        </a>
      </Link>
      <Grid>
        <Box
          display="grid"
          justifyContent="center"
          alignItems="center"
          gridTemplateColumns="1fr 1fr"
          gap="2rem"
        >
          <Image
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            width="750"
            height="400"
            objectFit="cover"
          />
          <Box>
            <Typography color="primary" variant="h3">
              {character.name}
            </Typography>
            <Typography color="#212121" variant="h6">
              {character.description
                ? character.description
                : "This character does not have a description available."}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Series" {...a11yProps(0)} />
            <Tab label="Stories" {...a11yProps(1)} />
            <Tab label="Comics" {...a11yProps(2)} />
            <Tab label="Events" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <Box>
          {character.series.items.length > 0 ? (
            character.series.items.map((item) => (
              <TabPanel key={item.name} value={value} index={0}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography> {item.name}</Typography>
                </Box>
              </TabPanel>
            ))
          ) : (
            <TabPanel value={value} index={0}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography>This character does not have series available.</Typography>
              </Box>
            </TabPanel>
          )}
          {character.stories.items.length > 0 ? (
            character.stories.items.map((item) => (
              <TabPanel key={item.name} value={value} index={1}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography> {item.name}</Typography>
                </Box>
              </TabPanel>
            ))
          ) : (
            <TabPanel value={value} index={1}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography>This character does not have stories available.</Typography>
              </Box>
            </TabPanel>
          )}
          {character.comics.items.length > 0 ? (
            character.comics.items.map((item) => (
              <TabPanel key={item.name} value={value} index={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography> {item.name}</Typography>
                </Box>
              </TabPanel>
            ))
          ) : (
            <TabPanel value={value} index={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography>This character does not have comics available.</Typography>
              </Box>
            </TabPanel>
          )}
          {character.events.items.length > 0 ? (
            character.events.items.map((item) => (
              <TabPanel key={item.name} value={value} index={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography> {item.name}</Typography>
                </Box>
              </TabPanel>
            ))
          ) : (
            <TabPanel value={value} index={3}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography>This character does not have events available.</Typography>
              </Box>
            </TabPanel>
          )}
        </Box>
      </Grid>
    </Container>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(context) {
  const { data: characterData } = await api.get(`/v1/public/characters/${context.params.id}`);
  return {
    props: { characterData },
    revalidate: 60 * 60 * 24, // 24 hours,
  };
}
