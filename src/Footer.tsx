import { Link } from 'react-router-dom'
import { RiDiscordFill } from 'react-icons/ri'
import { ImGithub } from 'react-icons/im'

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
                <Link to={props.linkPath}>{props.linkText}</Link>
            </p>
            <div className="icons">
                <a href="https://discord.gg/PJG2TZHXUK">
                    <RiDiscordFill size="32px" />
                </a>
                <a href="https://github.com/denkiuo604/kotoribako-chatpalette">
                    <ImGithub size="32px" />
                </a>
            </div>
            <p className="read-the-docs">
                <div>
                    本コンテンツは、
                    <div>【小説『新約・コトリバコ』Amazon.co.jp限定特典PDF】</div>
                    のデータを利用しています。
                </div>
                <a href="https://www.amazon.co.jp/dp/4048975862">https://www.amazon.co.jp/dp/4048975862</a>
                <div>©手代木正太郎／まだら牛／KADOKAWA</div>
            </p>
        </div>
    )
}

export default Footer
