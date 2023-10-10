import { Button, Card, CardActions, CardContent, CardHeader, Drawer, Grid, Link, Typography } from "@mui/material"
import { PostType } from "../../interfaces/interfaces" 
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

interface PostProp{
  post:PostType
}
      

export const Post = ({post}:PostProp) =>{
  console.log(post)
    return (
      <>
      <Card sx={{ minWidth: 600 }}>
      <CardHeader 
        avatar={<Avatar src="https://www.hindustantimes.com/ht-img/img/2023/08/25/1600x900/international_dog_day_1692974397743_1692974414085.jpg" />}
        title={<Link href={`/${post.userName}`} underline="hover" color="neutral">{post.userName}</Link>}
        subheader={<Link href={`/${post.userName}`} underline="none" >{post.userLongName}</Link>}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {post.content}
        </Typography>
        <Card sx={{ minWidth: 600 }}>
      <CardHeader 
        avatar={<Avatar src="https://www.hindustantimes.com/ht-img/img/2023/08/25/1600x900/international_dog_day_1692974397743_1692974414085.jpg" />}
        title={<Link href={`/${post.userName}`} underline="hover" color="neutral">{post.userName}</Link>}
        subheader={<Link href={`/${post.userName}`} underline="none" >{post.userLongName}</Link>}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {post.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      </>
      
    )
}