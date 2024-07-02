import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => createUpdateCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('New cabin successfully updated');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isUpdating, updateCabin };
}
