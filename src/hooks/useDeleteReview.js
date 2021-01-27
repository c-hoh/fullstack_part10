import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';
import { IS_AUTH } from '../graphql/queries';

const useDeleteReview = () => {
  const [deleteMutation, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    const { data } = await deleteMutation({ 
      variables: { id: String(id) },
      refetchQueries: {
        query: IS_AUTH
      }
    });
    return data;
  };

  return [deleteReview, result];
};

export default useDeleteReview;