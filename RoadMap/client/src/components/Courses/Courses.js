import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Avatar, Button, ButtonGroup, CardActionArea, CardActions, ClickAwayListener, Container, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from './course2.png';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import P1 from './p1.png';
import P2 from './p2.png';
import P3 from './p3.png';
import P4 from './p4.png';
import P5 from './p5.png';
import A1 from './article1.png';
import A2 from './article2.png'
import Feedback from '../FeedBack';

const options = ['Ongoing', 'Start','Completed'];



export default function Courses(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  return (
    <Container>
        <Typography variant={"h5"} fontWeight={"700"} marginTop={"40px"}>Courses</Typography>
        <Card sx={{ display: 'flex', margin:"20px" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Course 1
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Koushik Kothagal
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <p>Get started on your Java programming journey with this easy-to-follow quick start guide.</p>
        </Box>
        <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
        <p style={{ fontWeight: "bold", marginLeft: "12px"}}>Duration: 12 hrs</p>
      </ButtonGroup>

      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
        </React.Fragment>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={Image}
        alt="Live from space album cover"
      />
        </Card>
        <Card sx={{ display: 'flex', margin:"20px" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Course 2
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <p>Get started on your Java programming journey with this easy-to-follow quick start guide.</p>
        </Box>
        <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
        <p style={{ fontWeight: "bold", marginLeft: "12px"}}>Duration: 6 hrs</p>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
        </React.Fragment>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={Image}
        alt="Live from space album cover"
      />
        </Card>
        <Box>
            <Typography variant="h5" fontWeight={"700"}  marginTop={"40px"}>
                Latest Posts with #{props.label}
            </Typography>
            <Container style={{margin:"20px"}}>
                <Card sx={{ maxWidth: 345, marginBottom:"20px", minWidth:"440px"}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={A1}
                        alt="green iguana"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Advance Your Engineering Skills
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Want to elevate your data engineering skills, from pipeline building and management to effectively using tools such as dbt and Airflow?
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        Share
                        </Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345, minWidth:"440px"}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={A2}
                        alt="green iguana"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Advance Your Engineering Skills
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Want to elevate your data engineering skills, from pipeline building and management to effectively using tools such as dbt and Airflow?
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        Share
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </Box>
        <Box marginTop={"20px"}>
            <Typography variant="h5" fontWeight={"700"} marginTop={"40px"} marginBottom={"20px"}>Top Voices</Typography>
            <Box display={"flex"} justifyContent={"space-around"}>
                <Avatar alt="Remy Sharp" src={P2}/>
                <Avatar alt="Travis Howard" src={P1} />
                <Avatar alt="Cindy Baker" src={P3} />
                <Avatar alt="Cindy Baker" src={P4} />
                <Avatar alt="Cindy Baker" src={P5} />
            </Box>
        </Box>
        <Feedback />
    </Container>
  )
}
