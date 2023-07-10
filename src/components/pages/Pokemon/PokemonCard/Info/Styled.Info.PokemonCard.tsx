import styled from 'styled-components';
import { device, Section } from '@/components/common/styles/Sizing';
import { Table } from '@/components/common/styles/Table';

export const PokemonInfoSection = styled(Section)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;

  @media ${device.lg} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5rem;

    & div {
      margin: 1rem 0;

      &:first-of-type {
        margin-top: 0;
      }

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

export const PokemonInfoTable = styled(Table)`
  width: 90%;

  & th {
    background: rgba(130, 130, 130, 0.2);
    text-transform: capitalize;
  }

  & td {
    font-size: 1.7rem;
    font-weight: 600;
    text-transform: capitalize;
    text-align: start;

    & a {
      width: fit-content;
      display: block;
      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  & tr:has(td:empty) {
    display: none;
  }
`;