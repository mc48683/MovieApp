import React from 'react';
import HeroSlide from '../components/HeroSlide';
import tmdbConfigs from '../api/configs/tmdb.config.js';
import uiConfigs from '../configs/ui.configs';
import Container from '../components/Container.jsx';
import { Box } from '@mui/material';
import MediaSlide from '../components/MediaSlide';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user)
  return (
    <>
      <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular}/>
      <Box marginTop="-4rem" sx={{...uiConfigs.style.mainContent}}>
        <Container header="popular movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header="popular series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header="top rated movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>

        <Container header="top rated series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>
      </Box>
    </>
  );
;}

export default HomePage;