import React from 'react'
import SysApi from '../../service/sys'
import {Radio} from 'antd'

class FileChoose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            current: '/',
            checkFile: ''
        }
    }

    render() {
        let {list, current, checkFile} = this.state;
        let {onChange} = this.props;
        return <div>
            <div>当前路径：{current}</div>
            {
                list.map((d, i) => <div key={i}>
                    {
                        d.t == 'dir'
                            ? <a href="javascript:;" onClick={() => {
                                if (d.n == '..') {
                                    d.p = current.split('/');
                                    d.p.pop();
                                    d.p = d.p.join('/');
                                    d.p = d.p == '' ? '/' : d.p;
                                }
                                SysApi.fileDir({dir: d.p}).then(n => {
                                    let {data: list} = n;
                                    list = [
                                        {t: 'dir', p: '', n: '..'}, ...list
                                    ];
                                    this.setState({list, current: d.p});
                                }).catch(err => {
                                    errorAlert('文件读取失败');
                                })
                            }}>{d.n}</a>
                            : <Radio checked={checkFile == d.p} onClick={() => {
                                this.setState({
                                    checkFile: d.p
                                });
                                onChange && onChange(d.p);
                            }}>{d.n}</Radio>
                    }
                </div>)
            }
        </div>
    }

    componentDidMount() {
        SysApi.fileDir({dir: '/'}).then(d => {
            let {data: list} = d;
            this.setState({list, current: '/'});
        })
    }
}

export default FileChoose;