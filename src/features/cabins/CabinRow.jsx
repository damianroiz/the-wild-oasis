import styled from 'styled-components';
import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';

const TableRow = styled.tr`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  justify-items: center;
  align-items: center;
  padding: 1.8rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  button {
    background-color: var(--color-grey-50);
    color: var(--color-black);
    padding: 0.8rem 1.6rem;
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: 60% 50%;
  transform: scale(1.5) translateX(50%);
`;

const Cabin = styled.td`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.td`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.td`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      alert('Cabin Successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => alert(err.message),
  });

  return (
    <TableRow role="row">
      <td>
        <Img src={image} alt=""></Img>
      </td>
      <Cabin>{name}</Cabin>
      <td>Fits up to {maxCapacity} guests</td>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <td>
        <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
          Delete
        </button>
      </td>
    </TableRow>
  );
}

export default CabinRow;
