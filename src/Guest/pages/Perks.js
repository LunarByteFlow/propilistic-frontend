// import React from "react";

// const Perks = ({ selected, onChange }) => {
//   const handleCbClick = (e) => {
//     e.preventDefault();
//     const { checked, name } = e.target;
//     if (checked) {
//       onChange([...selected, name]);
//     } else {
//       onChange([...selected.filter((selectedName) => selectedName !== name)]);
//     }
//     console.log(e.target.name);
//   };

//   return (
//     <div>
//       <>
//         <div>
//           <h2 className="text-2xl mt-4">Perks</h2>
//           <p className="text-gray-500 text-sm">
//             select all the perks of your choice
//           </p>
//         </div>
//         <div className="grid gap-2 grid-cols-2 md:grid-cols-1 lg:grid-cols-3">
//           <label className="border p-4 inline-flex rounded-2xl gap-3 items-center cursor-pointer">
//             {/* <input type="checkbox" name="wifi" onChange={handleCbClick} />
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M.676 6.941A12.964 12.964 0 0110 3c3.657 0 6.963 1.511 9.324 3.941a.75.75 0 01-.008 1.053l-.353.354a.75.75 0 01-1.069-.008C15.894 6.28 13.097 5 10 5 6.903 5 4.106 6.28 2.106 8.34a.75.75 0 01-1.069.008l-.353-.354a.75.75 0 01-.008-1.053zm2.825 2.833A8.976 8.976 0 0110 7a8.976 8.976 0 016.499 2.774.75.75 0 01-.011 1.049l-.354.354a.75.75 0 01-1.072-.012A6.978 6.978 0 0010 9c-1.99 0-3.786.83-5.061 2.165a.75.75 0 01-1.073.012l-.354-.354a.75.75 0 01-.01-1.05zm2.82 2.84A4.989 4.989 0 0110 11c1.456 0 2.767.623 3.68 1.614a.75.75 0 01-.022 1.039l-.354.354a.75.75 0 01-1.085-.026A2.99 2.99 0 0010 13c-.88 0-1.67.377-2.22.981a.75.75 0 01-1.084.026l-.354-.354a.75.75 0 01-.021-1.039zm2.795 2.752a1.248 1.248 0 011.768 0 .75.75 0 010 1.06l-.354.354a.75.75 0 01-1.06 0l-.354-.353a.75.75 0 010-1.06z"
//                 clipRule="evenodd"
//               />
//             </svg> */}
//             <span>Free wifi</span>
//           </label>

//           <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
//             <input type="checkbox" name="heating" onChange={handleCbClick} />
//             {/* <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-8 h-8"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
//               />
//             </svg> */}
//             <span>heating</span>
//           </label>

//           <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
//             <input
//               type="checkbox"
//               name="smoke-alarm"
//               onChange={handleCbClick}
//             />
//             {/* <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-10 h-10"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
//               />
//             </svg> */}
//             <span>smoke alarm</span>
//           </label>

//           <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
//             <input
//               type="checkbox"
//               name="free-parking"
//               onChange={handleCbClick}
//             />
//             {/* <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-8 h-8"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
//               />
//             </svg> */}

//             <span>free Parking</span>
//           </label>

//           <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
//             <input
//               type="checkbox"
//               name="private-entrance"
//               onChange={handleCbClick}
//             />
//             {/* <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-10 h-10"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
//               />
//             </svg> */}

//             <span>Private entrance</span>
//           </label>

//           <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
//             <input type="checkbox" name="tv" onChange={handleCbClick} />
//             {/* <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-8 h-8"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
//               />
//             </svg> */}

//             <span>Tv</span>
//           </label>
//         </div>
//       </>
//     </div>
//   );
// };

// export default Perks;

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
