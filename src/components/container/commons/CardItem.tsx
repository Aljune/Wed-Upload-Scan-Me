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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface ExpandMoreType{
    id: number;
    avatar: string;
    title: string;
    subheader: string;
    description: string;
    image: string[];
    method: string | undefined;
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

const CardItem: React.FC<ExpandMoreType> = (props) => {
    const [expandedKey, setExpandedKey] = React.useState<number | null>(null);
    const [reactStatus, setReactStatus] = React.useState<boolean>(false);
    const handleExpandClick = (id: number) => {
        console.log(id, 'expandedKey');
        setExpandedKey((prevKey) => (prevKey === id ? null : id));
    };
    const handleReactClick = () => {
        setReactStatus((prevStatus) => !prevStatus);
    }
    console.log(reactStatus, 'reactStatus');
    return (
        <>
            <Card sx={{ maxWidth: 345, margin: '8px' }}>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: '#7aa6b7' }} aria-label="recipe">
                        {props.avatar}
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={<Typography sx={{fontWeight: "bold"}}>
                        {props.title}
                    </Typography>}
                    subheader={props.subheader}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={props.image.length > 0 ? props.image[0] : ""} 
                    alt={props.title}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.description.length > 25 ? props.description.slice(0, 25) + '...' : props.description}
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
                        expand={props.id === expandedKey}
                        onClick={() => handleExpandClick(props.id)}
                        aria-expanded={props.id === expandedKey ? "true" : "false"}
                        aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={props.id === expandedKey} timeout="auto" unmountOnExit>
                    <CardContent>
                    <Typography sx={{fontWeight: "bold"}} paragraph>Message:</Typography>
                    <Typography paragraph>
                        {props.method}
                    </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        
        </>
    )
};
export default CardItem;