import { useState } from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const MovieRating = () => {
  const [value, setValue] = useState();
  const [hover, setHover] = useState(-1);

  const customStarSize = {
    fontSize: '45px',
  };

  return (
    <Box
      sx={{
        width: 250,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        defaultValue={0}
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ ...customStarSize, opacity: 0.55 }} fontSize="inherit" />}
        icon={<StarIcon style={customStarSize} fontSize="inherit" />}
      />
    </Box>
  )
}

export default MovieRating;