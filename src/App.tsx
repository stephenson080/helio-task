import { useQuery } from "@apollo/client";
import {
  Button,
  Container,
  Dimmer,
  Divider,
  Grid,
  Loader,
  Search,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import "./App.css";

import { getNewPosts, getBestPosts } from "./gql/queries";

import PostCard, { Post } from "./components/Post"
import ErrorModal from "./components/ErrorModal";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchResult, setSearchResult] = useState<Post[]>([])
  const {
    data: bestPosts,
    loading: bestPostLoading,
    error: bestPostError,
  } = useQuery(getBestPosts());
  const {
    data: newPosts,
    loading: newPostsLoading,
    error: newPostsError,
  } = useQuery(getNewPosts());

  useEffect(() => {
    let allPosts: Post[] = [];
    if (bestPosts && newPosts) {
      allPosts = [...bestPosts.storiesFeed, ...newPosts.storiesFeed];
      setPosts(allPosts);
    }
  }, [bestPosts, newPosts]);
  // function to filter posts using the search box
  function filterPostsBySearch(value: string) {
    const valueInLowerCase = value.toLowerCase();
    const updatePostOne = bestPosts.storiesFeed.filter(
      (p: Post) =>
        p.author.name.toLowerCase().includes(valueInLowerCase) ||
        p.title.toLowerCase().includes(valueInLowerCase)
    );
    const updatePostTwo = newPosts.storiesFeed.filter(
      (p: Post) =>
        p.author.name.toLowerCase().includes(valueInLowerCase) ||
        p.title.toLowerCase().includes(valueInLowerCase)
    );
    setPosts([...updatePostOne, ...updatePostTwo]);
    setSearchResult([...updatePostOne, ...updatePostTwo])
  }

  // function to filter posts using the filter buttons
  function filterPosts(
    type: "less-or-equal" | "greater",
    prop: "replyCount" | "numUniqueUsersWhoReacted",
    value: number
  ) {
    if (type === "less-or-equal") {
      const updatePostsOne = bestPosts.storiesFeed.filter(
        (p: Post) => p[prop] < value || p[prop] === value
      );
      const updatePostsTwo = newPosts.storiesFeed.filter(
        (p: Post) => p[prop] < value || p[prop] === value
      );
      setPosts([...updatePostsOne, ...updatePostsTwo]);
    } else {
      const updatePostsOne = bestPosts.storiesFeed.filter(
        (p: Post) => p[prop] > value
      );
      const updatePostsTwo = newPosts.storiesFeed.filter(
        (p: Post) => p[prop] > value
      );
      setPosts([...updatePostsOne, ...updatePostsTwo]);
    }
  }

  if (bestPostLoading || newPostsLoading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  if (newPostsError || bestPostError){
    return <ErrorModal retry={() => window.location.reload()} />
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "80px",
      }}
    >
      <Container>
        <Search
          size="massive"
          style={{ margin: "30px auto", width: "500px" }}
          placeholder="Search post title, author name, "
          onSearchChange={(e, data) => filterPostsBySearch(data.value!)}
          results={searchResult}
        />
        <div
          style={{
            width: "100%",
            margin: "20px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h4>Filters</h4>
          <Button.Group>
            <Button
              onClick={() => filterPosts("less-or-equal", "replyCount", 3)}
            >
              Replies less than or equal 3
            </Button>
            <Button onClick={() => filterPosts("greater", "replyCount", 3)}>
              Replies greater than 3
            </Button>
            <Button
              onClick={() =>
                filterPosts("less-or-equal", "numUniqueUsersWhoReacted", 10)
              }
            >
              users who reacted less than or equal 10
            </Button>
            <Button
              onClick={() =>
                filterPosts("greater", "numUniqueUsersWhoReacted", 10)
              }
            >
              users who reacted greater than 10
            </Button>
          </Button.Group>
        </div>
        <Divider />

        <h2>Post of July, 2022</h2>
        <Grid>
          {posts.length === 0 ? (
            <h3>No Post To Display</h3>
          ) : (
            posts
              .filter((p) => p.dateAdded.includes("2022-07"))
              .map((p: Post, index: number) => {
                return (
                  <Grid.Column key={index} width="4">
                    <PostCard post={p} />
                  </Grid.Column>
                );
              })
          )}
        </Grid>
        <h2>Post of May, 2022</h2>
        <Grid>
          {posts.length === 0 ? (
            <h3>No Post To Display</h3>
          ) : (
            posts
              .filter((p) => p.dateAdded.includes("2022-05"))
              .map((p: Post, index: number) => {
                return (
                  <Grid.Column key={index} width="4">
                    <PostCard post={p} />
                  </Grid.Column>
                );
              })
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
