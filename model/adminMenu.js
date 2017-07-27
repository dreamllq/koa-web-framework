/**
 * Created by lvliqi on 2017/5/2.
 */
const baseDB = require('./baseDB');

class adminMenu extends baseDB {
    constructor() {
        super('admin_menu');
    }

    /**
     * 构造菜单数据
     */
    async menu(rightMenu = null, rightBase = null) {
        let data = await this.getAllList();
        if (rightMenu || rightBase) {
            data = this.filter(data, rightMenu, rightBase);
        }
        let button = this.menuTree(data);
        let config = this.menuOpenConfig(button);
        return {
            button, config
        };

    }

    async getParentMenu(rightMenu = null, rightBase = null) {
        let data = await this.getAllList();
        data = this.filterPM(data, rightMenu, rightBase);
        return data;
    }

    filterPM(data, rightMenu, rightBase) {
        let obj = {};
        data.forEach(d => {
            obj[d.k] = d;
        });
        let returnData = {};

        let menuK = (d) => {
            let k = d.rbid || d.menu_k || d.k;
            if (obj[k] && !returnData[k]) {
                returnData[k] = obj[k];
            }
        };

        rightMenu.forEach(d => {
            menuK(d);
        });

        rightBase.forEach(d => {
            menuK(d);
        });

        return returnData;
    }

    filter(data, rightMenu, rightBase) {
        let obj = {};
        data.forEach(d => {
            obj[d.k] = d;
        });
        let returnData = {};

        let menuK = (d) => {
            let k = d.rbid || d.menu_k || d.k;
            if (obj[k] && !returnData[k]) {
                returnData[k] = obj[k];
                if (obj[k].parent != 0) {
                    menuK(obj[obj[k].parent]);
                }
            }
        };

        rightMenu.forEach(d => {
            menuK(d);
        });

        rightBase.forEach(d => {
            menuK(d);
        });

        let rd = [];
        for (let key in returnData) {
            rd.push(returnData[key]);
        }

        return rd;
    }

    menuTree(data) {
        let relat = {};
        let rootid = 0;
        relat[rootid] = {};
        relat[rootid].next = [];

        for (let i = 0, length = data.length; i < length; i++) {
            data[i].next = [];
            relat[data[i].k] = data[i];
            if (relat[data[i].parent])
                relat[data[i].parent].next.push(data[i].k);
        }

        let doMenuTree = function (root) {
            root.button = [];
            for (let i = 0; i < root.next.length; i++) {
                root.button.push(relat[root.next[i]]);
                doMenuTree(root.button[i]);
            }
        };
        doMenuTree(relat[rootid]);

        return relat[rootid].button
    }

    menuOpenConfig(data) {
        let obj = {};
        let stack = [];

        let handle = (node) => {
            if (node.button && node.button.length > 0) {
                stack.push(node.k);
                node.button.forEach((d) => {
                    handle(d);
                });
                stack.pop();
            } else {
                // console.log(stack);
                stack.push(node.k);
                let [top, ...left] = stack;
                obj[node.uri] = {
                    top: [top],
                    left
                };
                stack.pop();
            }
        };
        if (data && data.length > 0) {
            data.forEach((d) => {
                handle(d);
            });
        }

        return obj;
    }


    rightTree(data, rightBase) {
        let relat = {};
        let rootid = 0;
        relat[rootid] = {};
        relat[rootid].next = [];

        for (let i = 0, length = data.length; i < length; i++) {
            data[i].next = [];
            relat[data[i].k] = data[i];
            if (relat[data[i].parent])
                relat[data[i].parent].next.push(data[i].k);
        }

        let doMenuTree = function (root) {
            root.button = [];
            root.rights = [];
            for (let i = 0; i < rightBase.length; i++) {
                if (rightBase[i].menu_k == root.k) {
                    root.rights.push(rightBase[i]);
                }
            }
            for (let i = 0; i < root.next.length; i++) {
                root.button.push(relat[root.next[i]]);
                doMenuTree(root.button[i]);
            }
        };
        doMenuTree(relat[rootid]);

        return relat[rootid].button
    }

    async getByUri(uri) {
        return this.getOne({where: `uri='${uri}'`});
    }
}

module.exports = new adminMenu();