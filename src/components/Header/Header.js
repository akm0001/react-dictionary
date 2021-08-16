import {
  createTheme,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from "@material-ui/core";

import React from "react";
import "./header.css";
import categories from "../../data/category";
import { debounce } from "lodash";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Header({
  category,
  setCategory,
  word,
  setWord,
  setMeanings,
  lightMode,
}) {
  const classes = useStyles();
  const theme = createTheme({
    palette: {
      primary: { main: lightMode ? "#000" : "#fff" },
      type: lightMode ? "light" : "dark",
    },
  });

  const handleChange = (e) => {
    setWord("");
    setMeanings([]);
    setCategory(e.target.value);
  };

  const handleText = debounce((text) => {
    setMeanings([]);
    setWord(text);
  }, 500);

  return (
    <div className="header">
      <span className="title">{word ? word : "Word lookup.."}</span>
      <div className="inputs">
        <ThemeProvider theme={theme}>
          <FormControl className={classes.formControl}>
            <TextField
              className="search"
              id="filled-basic"
              // value={word}
              label="Enter a word.."
              onChange={(e) => handleText(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Select language
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              displayEmpty
              className={classes.selectEmpty}
              value={category}
              onChange={(e) => handleChange(e)}
            >
              {categories.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Header;
