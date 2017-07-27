import React from 'react'
import {Form, Modal, Checkbox, Tree, Icon} from 'antd'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const TreeNode = Tree.TreeNode;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};


/**
 * key 为 type_id整合
 * @param menu
 * @returns {XML}
 * @constructor
 */
const CheckBoxTree = ({menu, onCheck, keys}) => {
    return <Tree checkable defaultExpandAll={false} onCheck={onCheck} defaultCheckedKeys={keys}>
        {
            menu.map((d, i) => <TreeNode title={d.name} key={`2_${d.k}`}>
                {
                    (d.button && d.button.length > 0) ? d.button.map((m, j) => (m.button.length > 0 || m.rights.length > 0) ? (<TreeNode title={m.name} key={`2_${m.k}`}>
                        {
                            (m.button && m.button.length > 0) ? m.button.map((n, k) => (n.button.length > 0 || n.rights.length > 0) ? (<TreeNode title={n.name} key={`2_${n.k}`}>
                                {
                                    n.rights.map((g, x) => <TreeNode title={g.name} key={`1_${g.id}`}/>)
                                }
                            </TreeNode>) : <TreeNode title={n.name} key={`2_${n.k}`}/>) : m.rights.map((n, k) => <TreeNode title={n.name} key={`1_${n.id}`}/>)
                        }
                    </TreeNode>) : <TreeNode title={m.name} key={`2_${m.k}`}/>) : d.rights.map((m, j) => <TreeNode title={m.name} key={`1_${m.id}`}/>)
                }
            </TreeNode>)
        }
    </Tree>
};


export default Form.create()(
    ({
         visible, title, onCancel, onOk, confirmLoading, keys, allRight, loading, onCheck,
         form: {
             getFieldDecorator,
             validateFields,
             getFieldsValue
         }
     }) => {

        const modelProps = {
            visible,
            title,
            onCancel,
            width: 800,
            onOk: onOk,
            confirmLoading
        };
        return <Modal {...modelProps}>
            {
                !loading ? (
                    <div>
                        <CheckBoxTree menu={allRight} onCheck={onCheck} keys={keys}/>
                    </div>
                ) : <Icon type="loading"/>
            }


        </Modal>
    })