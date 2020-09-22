import { useLottie } from 'lottie-react'
import animationData from './data.json'

const defaultLottieOptions = {
  animationData: animationData,
  loop: true,
  autoplay: true,
}
export default (props: { height?: number }) => {
  const { height = 60 } = props
  const Lotties = useLottie(defaultLottieOptions, { height })
  return Lotties.View
}
