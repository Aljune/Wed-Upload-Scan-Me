import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from '@mui/icons-material/Delete';

interface ExpandMoreType{
    id: string;
    avatar: string;
    name: string;
    description: string;
    image: string[];
    subheader: string;
    // method: string | undefined;
}
export interface CardItemProps {
    data: ExpandMoreType[] | [];
    role: string;
    setIdDelete: (id: string) => void;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}


const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


const CardItem: React.FC<CardItemProps> = (props) => {

    const [expandedKey, setExpandedKey] = React.useState<string | null>(null);
    const [reactStatus, setReactStatus] = React.useState<boolean>(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const handleExpandClick = (id: string) => {
        console.log(id, 'expandedKey');
        setExpandedKey((prevKey) => (prevKey === id ? null : id));
    };
    const handleReactClick = () => {
        setReactStatus((prevStatus) => !prevStatus);
    }
  
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
        {props.data && props.data.length > 0 ? ( 
            props.data.map((item) => ( 
                <Card sx={{ maxWidth: 345, margin: '8px' }}>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: '#7aa6b7' }} aria-label="recipe">
                        {item.avatar}
                    </Avatar>
                    }

                    action={
                        props.role === 'admin' ? (
                            <IconButton  onClick={handleClick}  aria-label="settings">
                                <MoreVertIcon /> 
                            </IconButton>
                        ) : null // Or any other component you want to render for non-admin users
                    }
                    title={<Typography sx={{fontWeight: "bold"}}>
                        {item.name}
                    </Typography>}
                    subheader={item.subheader}
                />
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {
                        props.setIdDelete(item.id);
                        setAnchorEl(null);
                    }}><DeleteIcon/></MenuItem>
                    
                </Menu>
                <CardMedia
                    component="img"
                    height="194"
                    image={item.image.length > 0 ? item.image[0] : ""} 
                    alt={item.name}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {item.description.length > 25 ? item.description.slice(0, 25) + '...' : item.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={handleReactClick} aria-label="add to favorites">
                        <FavoriteIcon color={reactStatus ? "error" : "action"}  />
                    </IconButton>
                    <IconButton aria-label="share">
                    <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={item.id === expandedKey}
                        onClick={() => handleExpandClick(item.id)}
                        aria-expanded={item.id === expandedKey ? "true" : "false"}
                        aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={item.id === expandedKey} timeout="auto" unmountOnExit>
                    <CardContent>
                    <Typography sx={{fontWeight: "bold"}} paragraph>Message:</Typography>
                    <Typography paragraph>
                        {/* {item.method} */}
                    </Typography>
                    </CardContent>
                </Collapse>
            </Card>
           
            )) 

        ):(
            <Typography>No records available</Typography>
        )
        }    
    </>
    )
};
export default CardItem;