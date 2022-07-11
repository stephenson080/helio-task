import { Card, Icon, Image } from "semantic-ui-react";
type Author = {
  name: string;
  photo: string;
};

export interface Post {
  author: Author;
  _id: string;
  title: string;
  replyCount: number;
  coverImage: string;
  dateAdded: string;
  type: string;
  numUniqueUsersWhoReacted: number;
  responseCount: number;
}
type Props = {
  post: Post;
};
export default function PostCard(props: Props) {
  return (
    <Card>
      <Image src={props.post.coverImage} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <div style={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>
            <Image avatar src={props.post.author.photo} />
            <h4 style={{marginTop: '-5px'}}>{props.post.author.name}</h4>
          </div>
        </Card.Header>
        <Card.Meta>
          <span className="date">
            Post created: {new Date(props.post.dateAdded).toDateString()}
          </span>
        </Card.Meta>
        <Card.Description>{props.post.title}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>
          <Icon name="reply" />
          {props.post.replyCount}
        </p>
        <p>
          <Icon name="user" />
          {props.post.numUniqueUsersWhoReacted}
        </p>
      </Card.Content>
    </Card>
  );
}
