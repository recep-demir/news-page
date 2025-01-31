import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadingGif from "../assets/loading.gif";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect } from "react";
import { getirData } from "../features/haberSlice";

const News = () => {
  const dispatch = useDispatch();
  const { loading, haberler } = useSelector((state) => state.haberSlice);
  const [copiedHaber, setCopiedHaber] = useState(null);
  const [detailed, setDetailed] = useState([])

  useEffect(() => {
    dispatch(getirData());
  }, []);

  const handleShareClick = async (haber) => {
    try {
      await navigator.clipboard.writeText(haber.url);
      setCopiedHaber(haber.title);
      setTimeout(() => {
        setCopiedHaber(null);
      }, 2000);
    } catch (error) {
      
    }
  };

  const handleDetailed = (haber) => {
    // Eğer haber zaten seçilmişse, diziden çıkar; değilse, diziye ekle
    if (detailed.includes(haber.title)) {
      setDetailed((prev) => prev.filter((title) => title !== haber.title));
    } else {
      setDetailed((prev) => [...prev, haber.title]);
    }
  };

  return (
    <>
      {loading ? (
        <img src={loadingGif} alt="" height="800px" />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          flexWrap="wrap"
          
        >
          {haberler.map((haber) => (
            <Card key={haber.title} sx={{ maxWidth: 345, height: 450, m: 5,  opacity: detailed.includes(haber.title) ? 0.5 : 1,
              transition: "opacity 0.3s ease",}}>
              <CardMedia
                sx={{ height: 140 }}
                image={haber.urlToImage}
                title="haber"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {haber.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {haber.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleShareClick(haber)}
                >
                  {copiedHaber === haber.title ? "Copied" : "Share"}
                </Button>
                <Button href={haber.url} size="small" target="_blank"
                onClick={() => handleDetailed(haber)}>
                  Detail
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};

export default News;