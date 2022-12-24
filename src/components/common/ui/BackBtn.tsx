import React from 'react';
import { FaChevronLeft } from '@meronex/icons/fa';
import styled from 'styled-components';

type Props = {
  name: string;
};

const BackButton = styled.a`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 2rem;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  background: none;
  color: ${({ theme }) => theme.secondary};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.main};
    border: 1px solid ${({ theme }) => theme.main};
  }
`;

function BackBtn({ name }: Props) {
  return (
    <BackButton>
      <FaChevronLeft /> Back to {name}
    </BackButton>
  );
}

export default BackBtn;