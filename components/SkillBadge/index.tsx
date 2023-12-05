import './index.scss'

interface Props {
  text: string
  light?: boolean
}

export default function SkillBadge(props: Props) {
  let className = 'SkillBadge'
  if (props.light) className += ' theme-light shadow-md'

  return <div className={className}>{props.text}</div>
}
