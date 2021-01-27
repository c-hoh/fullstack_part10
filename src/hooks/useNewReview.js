import { useMutation } from '@apollo/react-hooks';
import { NEW_REVIEW } from '../graphql/mutations';

const useNewReview = () => {
  const [reviewMutation, result] = useMutation(NEW_REVIEW);

  const postReview = async ({ repoOwner, repoName, repoRating, repoReview }) => {
    const { data } = await reviewMutation(
      { variables: 
        { repoOwner: repoOwner,
          repoName: repoName,
          rating: Number(repoRating),
          review: repoReview
        }
      });
    return data;
  };

  return [postReview, result];
};

export default useNewReview;