import React from 'react'
import {connect} from 'dva'
import CmsContainer from '../../components/cms/Container'

export default connect(() => ({}))(
    () => {
        return <div>
            <CmsContainer/>
        </div>;
    }
)