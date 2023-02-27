import styled from 'styled-components';

export const ProfileInputs = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ProfileList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  gap: 1rem;
  padding: 2rem 0;

  & li {
    font-size: 1.5rem;
  }
`;
