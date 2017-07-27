import React from 'react'
import './cmsContainer.scss'
import Frame from './frame/Frame'

let id = 0;

import PinPaiQiangWiget from './widget/PinPaiQiang'
import PinPaiQiangComponent from './components/PinPaiQiang'
import IconWiget from './widget/Icon'
import IconComponent from './components/Icon'
import HengXiangAD from './widget/HengXiangAD'
import HengXiangADComponent from './components/HengXiangAD'
import DanTiaoAD from './widget/DanTiaoAD'
import DanTiaoADComponent from './components/DanTiaoAD'
import SiGeAD from './widget/SiGeAD'
import SiGeADComponent from './components/SiGeAD'
import QiangGou from './widget/QiangGou'
import PicSpecial from './widget/PicSpecial'
import PicSpecialComponent from './components/PicSpecial'
import NewsSpecial from './widget/NewsSpecial'
import NewsSpecialComponent from './components/NewsSpecial'
import GoodSpecial from './widget/GoodSpecial'
import GoodSpecialComponent from './components/GoodSpecial'

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWidget: '',
            currentComponent: '',
            is_drag: false,
            currentName: '',
            id: '',
            cmsData: []
        }
    }

    render() {
        let self = this;


        return <div className="container">
            <div className="left">
                <PinPaiQiangWiget
                    onStart={() => {
                        self.setState({
                            is_drag: true,
                            currentComponent: PinPaiQiangComponent,
                            currentName: 'pinpaiqiang',
                            id: id++
                        })
                    }}
                    onEnd={() => {
                        self.setState({
                            is_drag: false
                        })
                    }}
                />
                <IconWiget
                    onStart={() => {
                        self.setState({
                            is_drag: true,
                            currentComponent: IconComponent,
                            currentName: 'icon',
                            id: id++
                        })
                    }}
                    onEnd={() => {
                        self.setState({
                            is_drag: false
                        })
                    }}
                />
                <HengXiangAD
                    onStart={() => {
                        self.setState({
                            is_drag: true,
                            currentComponent: HengXiangADComponent,
                            currentName: 'hengxiangad',
                            id: id++
                        })
                    }}
                    onEnd={() => {
                        self.setState({
                            is_drag: false
                        })
                    }}
                />

                <DanTiaoAD
                    onStart={() => {
                        self.setState({
                            is_drag: true,
                            currentComponent: DanTiaoADComponent,
                            currentName: 'dantiaoad',
                            id: id++
                        })
                    }}
                    onEnd={() => {
                        self.setState({
                            is_drag: false
                        })
                    }}
                />

                <SiGeAD
                    onStart={() => {
                        self.setState({
                            is_drag: true,
                            currentComponent: SiGeADComponent,
                            currentName: 'sigead',
                            id: id++
                        })
                    }}
                    onEnd={() => {
                        self.setState({
                            is_drag: false
                        })
                    }}
                />

                <QiangGou
                    onStart={() => {
                        self.setState({
                            is_drag: true,
                            currentComponent: IconComponent,
                            currentName: 'qianggou',
                            id: id++
                        })
                    }}
                    onEnd={() => {
                        self.setState({
                            is_drag: false
                        })
                    }}
                />
                <PicSpecial
                    onStart={() => {
                        self.setState({
                            is_drag: true,
                            currentComponent: PicSpecialComponent,
                            currentName: 'picspecial',
                            id: id++
                        })
                    }}
                    onEnd={() => {
                        self.setState({
                            is_drag: false
                        })
                    }}
                />
                <NewsSpecial
                    onStart={() => {
                        self.setState({
                            is_drag: true,
                            currentComponent: NewsSpecialComponent,
                            currentName: 'newsspecial',
                            id: id++
                        })
                    }}
                    onEnd={() => {
                        self.setState({
                            is_drag: false
                        })
                    }}
                />
                <GoodSpecial
                    onStart={() => {
                        self.setState({
                            is_drag: true,
                            currentComponent: GoodSpecialComponent,
                            currentName: 'goodspecial',
                            id: id++
                        })
                    }}
                    onEnd={() => {
                        self.setState({
                            is_drag: false
                        })
                    }}
                />
            </div>
            <div className="right">
                <Frame {...self.state} onChange={(data) => {
                    self.setState({
                        cmsData: data
                    })
                }}/>
            </div>
            <div className="output">
                {JSON.stringify(self.state.cmsData)}
            </div>
        </div>
    }

    componentDidMount() {

    }
}

export default Container;