import styled from 'styled-components';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  aspect-ratio: 16 / 9;
  display: inline-block;
  width: 100%;
`;

export const HeroImage: React.FC = () => {
  const url = "/assets/hero.avif"
  return (
    <_Wrapper>
      <_Image src={url} alt="Cyber TOON" />
    </_Wrapper>
  );
};
