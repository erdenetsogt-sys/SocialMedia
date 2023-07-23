import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";

function Home() {
  const { loading, data } = useQuery(FETCH_POST_QUERY);
  const posts = data ? data.getPosts : [];

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          {loading ? (
            <h1>Loading posts..</h1>
          ) : (
            posts &&
            posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      comments {
        id
        username
        createdAt
        body
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;

export default Home;
