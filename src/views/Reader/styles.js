import styled from 'styled-components'
import COLORS from '@assets/theme/colors'

export const Header = styled.h1`
  padding: 15px;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.DARK};
  margin: 0;
`
export const Container = styled.div`
  margin-left: ${props => props.active ? '250px' : '50px'};
  background-color: ${COLORS.WHITE};
  transition: .3s ease;
`
export const Title = styled.h1`
  text-align: center;
`
export const ChapterWrapper = styled.div`
  padding: 0 15px;
  text-align: justify;
  overflow-y: auto;
  @media (min-width: 640px) {
    padding: 0 50px;
  }
`
export const ButtonContainer = styled.div`
  display: inline-block;
  width: 100%;
  .btn-right {
    display: ${props => props.hasNext ? 'block' : 'none'};
  }
  .btn-left {
    display: ${props => props.hasPrevious ? 'block' : 'none'};
  }
`