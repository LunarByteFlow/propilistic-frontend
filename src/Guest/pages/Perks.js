
import React from "react";
import { FormControlLabel, Checkbox, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  subtitle: {
    marginBottom: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  checkbox: {
    color: theme.palette.primary.main,
  },
}));

const Perks = ({ selected, onChange }) => {
  const classes = useStyles();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange(selected.filter((selectedName) => selectedName !== name));
    }
  };

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          Perks
        </Typography>
        <Typography variant="body2" className={classes.subtitle}>
          Select all the perks of your choice
        </Typography>
      </div>
      <Grid container spacing={2}>
        {perks.map((perk, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected.includes(perk.name)}
                  onChange={handleCheckboxChange}
                  name={perk.name}
                  className={classes.checkbox}
                />
              }
              label={perk.label}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const perks = [
  { name: "wifi", label: "Free wifi" },
  { name: "heating", label: "Heating" },
  { name: "smoke-alarm", label: "Smoke alarm" },
  { name: "free-parking", label: "Free Parking" },
  { name: "private-entrance", label: "Private entrance" },
  { name: "tv", label: "TV" },
];

export default Perks;
