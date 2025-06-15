import { Link } from 'react-router-dom'
import { RiDiscordFill } from 'react-icons/ri'
import { ImGithub } from 'react-icons/im'
import Tooltip from '@mui/material/Tooltip'

type footerProps = {
    toolName: string
    linkText: string
    linkPath: string
}

const Footer = (props: footerProps) => {
    return (
        <div>
            <p className="read-the-docs">
                <a href="https://talto.cc/projects/uHgxrL9QQ9B3Fep7-1DAO">エモクロアTRPG『新約・コトリバコ』</a>用 {props.toolName}
            </p>
            <p className="another-page">
                <Link to={`/kotoribako-chatpalette${props.linkPath}`}>{props.linkText}</Link>
            </p>
            <div className="icons">
                <Tooltip
                    arrow
                    placement="top"
                    title="kotoribako-chatpaletteユーザー向けDiscordサーバー"
                >
                    <a href="https://discord.gg/PJG2TZHXUK">
                        <RiDiscordFill size="32px" />
                    </a>
                </Tooltip>
                <Tooltip
                    arrow
                    placement="top"
                    title="GitHub"
                >
                    <a href="https://github.com/denkiuo604/kotoribako-chatpalette">
                        <ImGithub size="32px" />
                    </a>
                </Tooltip>
            </div>
        </div>
    )
}

export default Footer
