import { gql } from "@apollo/client";
export function getBestPosts() {
  return gql`
    query {
      storiesFeed(type: BEST) {
        dateAdded
        author {
          name
          photo
        }
        title
        coverImage
        replyCount
        type
        numUniqueUsersWhoReacted
        responseCount
      }
    }
  `;
}

export function getNewPosts() {
  return gql`
    query {
      storiesFeed(type: FEATURED) {
        dateAdded
        author {
          name
          photo
        }
        title
        coverImage
        replyCount
        type
        numUniqueUsersWhoReacted
        responseCount
      }
    }
  `;
}
