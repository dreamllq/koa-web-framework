import React from 'react'
import cs from 'classnames'

class Frame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cmsData: [],
            is_drag_sort: false,
            sort_start_index: -1,
            sort_end_index: -1,
            new_index: -1,
            sortComponent: ''
        }
    }

    render() {
        let {currentComponent, is_drag, currentName, id, onChange, cmsData} = this.props;
        let {is_drag_sort, sort_start_index, sort_end_index, new_index, sortComponent} = this.state;
        let self = this;
        let data = cmsData;
        let CC = currentComponent;
        console.log()

        return <div className="frame_container">
            <div className="frame"
                 ref={(el) => this.frame = el }
                 onDragOver={(e) => {
                     e.preventDefault();
                 }}
                 onDrop={() => {
                     if (is_drag) {
                         if (new_index == -1) {
                             cmsData.push({c: currentComponent, name: currentName, id, data: {}});
                         } else {
                             cmsData.splice(new_index, 0, {c: currentComponent, name: currentName, id, data: {}})
                         }
                         self.setState({
                             new_index: -1,
                             sort_end_index: -1,
                             sort_start_index: -1,
                             is_drag: false
                         });
                         onChange(cmsData);
                     } else if (is_drag_sort) {
                         if (sort_start_index == sort_end_index) {
                             self.setState({
                                 new_index: -1,
                                 sort_end_index: -1,
                                 sort_start_index: -1,
                                 is_drag_sort: false
                             });
                             return;
                         }
                         let a = [];

                         cmsData.forEach((d, i) => {
                             if (i == sort_start_index) {

                             } else if (i == sort_end_index) {
                                 if (sort_start_index > sort_end_index) {
                                     a.push(cmsData[sort_start_index]);
                                     a.push(d);
                                 } else if (sort_start_index < sort_end_index) {
                                     a.push(d);
                                     a.push(cmsData[sort_start_index]);
                                 }
                             } else {
                                 a.push(d);
                             }
                         });

                         onChange([...a]);
                         self.setState({
                             new_index: -1,
                             sort_end_index: -1,
                             sort_start_index: -1,
                             is_drag_sort: false
                         })
                     }
                 }}
            >
                {
                    data.map((d, i) => {
                        let Block = d.c;
                        return <div key={i} style={{paddingBottom: 5, paddingTop: 5}}>
                            <Block id={d.id}
                                   onDragStart={(e) => {
                                       self.setState({
                                           is_drag_sort: true,
                                           sort_start_index: i,
                                           sortComponent: (<Block isSort={true} name={`${d.name}_${d.id}`} id={d.id}/>)
                                       });
                                   }}
                                   onDragEnd={() => {
                                       self.setState({is_drag_sort: false});
                                   }}
                                   onDragOver={(e) => {
                                       e.preventDefault();
                                       if (is_drag_sort) {
                                           if (sort_end_index == i) return;
                                           self.setState({
                                               sort_end_index: i
                                           });
                                       } else if (is_drag) {
                                           if (new_index != i)
                                               self.setState({
                                                   new_index: i
                                               });
                                       }
                                   }}
                                   insertShow={i == new_index && is_drag}
                                   insertComponent={<CC isInsert={true} id={id}/>}
                                   sortShow={i == sort_end_index && sort_end_index < sort_start_index && is_drag_sort}
                                   sortComponent={sortComponent}
                                   sortShowBottom={i == sort_end_index && sort_end_index > sort_start_index && is_drag_sort}
                                   isSort={i == sort_start_index && is_drag_sort}
                                   onDel={() => {
                                       confirm({
                                           content: '确定删除吗？', onOk: () => {
                                               cmsData.splice(i, 1);
                                               onChange(cmsData);
                                           }
                                       })
                                   }}
                                   onSetData={(d) => {
                                       cmsData[i].data = d;
                                       onChange(cmsData);
                                   }}
                                   data={{...d.data}}
                            />
                        </div>
                    })
                }
                {
                    (new_index == -1 && is_drag) ? <div style={{padding: 10}}><CC isInsert={true} id={id}/></div> : ''
                }

                <div style={{
                    height: 200
                }}
                     onDragOver={(e) => {
                         e.preventDefault();
                         if (is_drag) {
                             if (new_index != -1)
                                 self.setState({
                                     new_index: -1
                                 });
                         }
                     }}></div>
            </div>
        </div>
    }


    componentDidMount() {

    }
}

export default Frame