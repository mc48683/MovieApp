import { LoadingButton } from "@mui/lab";
import { Grid, Chip, Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.config";
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";
import HeroSlide from "../components/HeroSlide";
import MediaGrid from "../components/MediaGrid";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import usePrevious from "../hooks/usePrevious";
import genreApi from "../api/modules/genre.api";



const MediaList = () => {
  const { mediaType } = useParams();

  const [genre, setGenre] = useState(false);
  const [genres, setGenres] = useState([]);
  const [medias, setMedias] = useState([]);
  const [newMedias, setNewMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const prevMediaType = usePrevious(mediaType);
  const dispatch = useDispatch();

  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const category = ["popular", "top rated"];




  const handleClick = (genreId) => {
    setGenre(true)
    setNewMedias(medias.filter((media) => {
      if (media.genre_ids.includes(genreId)) {
        return media
      }
    }))
  }

  const handleMedia = () => {
      setGenre(false)
    }

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);

      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage
      });

      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        if (currPage !== 1) {
          setMedias(m => [...m, ...response.results]);
        }
        else {
          setMedias([...response.results]);
        }
      }
      setNewMedias(medias)
    };

    if (mediaType !== prevMediaType) {
      setCurrCategory(0);
      setCurrPage(1);
    }


    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await genreApi.getList({ mediaType });
      if (response) {
        setGenres(response.genres);
      }
      if (err) {
        toast.error(err.message);
        setGlobalLoading(false);
      }
    };

    getMedias();
    getGenres();
  }, [
    mediaType,
    currCategory,
    prevMediaType,
    currPage,
    mediaCategories,
    dispatch,
  ]);

 
  console.log(medias)
  
  console.log(newMedias)

  

  const onCategoryChange = (categoryIndex) => {
    if (currCategory === categoryIndex) return;
    setMedias([]);
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <>
      <HeroSlide mediaType={mediaType} mediaCategory={mediaCategories[currCategory]} />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ margin: 4 }}
        >
          <Typography fontWeight="700" variant="h4">
            {mediaType === tmdbConfigs.mediaType.movie ? "Movies" : "TV Series"}
          </Typography>
          <Stack direction="row" spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={index}
                size="large"
                variant={currCategory === index ? "contained" : "text"}
                sx={{
                  color: currCategory === index ? "primary.contrastText" : "text.primary"
                }}
                onClick={() => onCategoryChange(index)}
              >
                {cate}
              </Button>
            ))}
          </Stack>
        </Stack>
        <Typography 
          onClick={() => handleMedia()} 
          sx={{ 
            textDecoration: "underline", 
            color: "#ff0000",
            cursor: "pointer",
            '&:hover': {
              color: "white",
            }
          }} 
          marginLeft="3rem" 
          variant="subtitle1">
            Browse all {mediaType === tmdbConfigs.mediaType.movie ? "Movies" : "TV Series"}
        </Typography>
        <Grid container spacing={1} margin="2rem" width="70vw">
          {genres.map((genre, index) => (
            <Grid item>
            <Chip key={index} label={genre.name} variant="outlined" onClick={() => handleClick(genre.id)} />
            </Grid>
            ))}
          </Grid>
        <MediaGrid
          medias={genre === false ? medias : newMedias}
          mediaType={mediaType}
        />
        <LoadingButton
          sx={{ marginTop: 8 }}
          fullWidth
          color="primary"
          loading={mediaLoading}
          onClick={onLoadMore}
        >
          load more
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;