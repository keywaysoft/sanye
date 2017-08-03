
/**
 * 此文件的头部注释
 */

/*global jQuery: false */

(function ($) {
    'use strict';
    var tree,
        checkedNodes = [],
        handleChildrenNode = function (node) {
            if (node['Children'] && node['Children'].length > 0) {
                node.chkDisabled = true;
                node.nocheck = true;
                $.each(node['Children'],
                    function (k, v) {
                        handleChildrenNode(v);
                    });
            }
        };
    var setting = {
        async: {
            enable: true,
            url: '',
            dataType: 'json',
            type: 'post',
            autoParam: []
        },
        callback: {
            onClick: function (event, treeId, treeNode) {
                if (treeNode.chkDisabled === false) {
                    if (treeNode.Checked === true) {
                        treeNode.Checked = false;
                    } else {
                        treeNode.Checked = true;
                    }
                    $.fn.zTree.getZTreeObj(treeId).updateNode(treeNode);
                }

                $('#' + treeId).trigger('treeselect', [treeId, treeNode]);
            },
            onCheck: function (event, treeId, treeNode) {
                $('#' + treeId).trigger('treeselect', [treeId, treeNode]);
            }
        },
        data: {
            key: {
                name: 'Name',
                title: '',
                url: 'Url',
                children: 'Children',
                checked: 'Checked'
            },
            simpleData: {
                enable: true,
                idKey: 'TreeParentNodeId',
                pIdKey: 'ParentId'
            }
        },
        check: {
            enable: false,
            chkStyle: 'checkbox',
            chkboxType: { 'Y': '', 'N': '' }
        },
        edit: {
            enable: false,
            drag: {
                isCopy: true,
                isMove: true,
                prev: true,
                next: true,
                inner: true
            },
            showRemoveBtn: false,
            showRenameBtn: false
        },
        view: {
            selectedMulti: false,
            autoCancelSelected: false,
            nameIsHTML: true
        }
    };
    tree = function (id, options) {
        this.treeid = id;

        if (options.keyId) {
            this.keyId = options.keyId;
        }

        if (options.url) {
            setting.async.url = options.url;
        }

        if (options.type) {
            setting.async.type = options.type;
        } else {
            options.type = 'post';
        }

        if (options.hasCheckbox != undefined) {
            setting.check.enable = options.hasCheckbox;
        }

        if (options.dataSource) {
            this.dataSource = options.dataSource;
        }

        if (options.currentNodeId) {
            this.currentNodeId = options.currentNodeId;
        }

        if (options.callback) {
            setting.callback = options.callback;
        }

        if (options.submitParams) {
            for (var key in options.submitParams) {
                setting.async.autoParam[setting.async.autoParam.length] = key.toString();
            }
        }

        if (options.keyParams) {
            if (options.keyParams.name) {
                setting.data.key.name = options.keyParams.name;
            }
            if (options.keyParams.title) {
                setting.data.key.title = options.keyParams.title;
            }
            if (options.keyParams.url) {
                setting.data.key.url = options.keyParams.url;
            }

        }

        var ckn = $('#' + id).attr('data-tree-checkedNodes');
        if (ckn) {
            checkedNodes = ckn.split(',');
        }

        var hasdataSource = $('#' + id).attr('data-tree-dataSource');
        if (hasdataSource != '[]' && hasdataSource) {
            this.hasSource = true;
            setting.async.enable = false;

            if ($.parseJSON(hasdataSource)) {
                this.dataSource = $.parseJSON(hasdataSource);
                if (this.dataSource[0]['TreeSetNodeId']) {
                    this.keyId = 'TreeSetNodeId';
                } else if (this.dataSource[0]['TreeParentNodeId']) {
                    this.keyId = 'TreeParentNodeId';
                }
            }
        } else {
            setting.async.enable = true;
            this.hasSource = false;
        }
        if (!this.hasSource && !this.dataSource) {
            var ztree = this;
            $.ajax({
                url: options.url,
                type: options.type,
                data: options.submitParams,
                dataType: 'json',
                success: function (data) {
                    if (data && data.length) {
                        if (data[0]['TreeSetNodeId']) {
                            ztree.keyId = 'TreeSetNodeId';
                        } else if (data[0]['TreeParentNodeId']) {
                            ztree.keyId = 'TreeParentNodeId';
                        }

                        $.each(data,
                            function (k, value) {
                                $.each(checkedNodes,
                                    function (k, v) {
                                        if (value[ztree.keyId] == v) {
                                            value.Checked = true;
                                        }
                                    });
                            });

                        $.fn.zTree.init($('#' + id), setting, data);
                        var treeObj = $.fn.zTree.getZTreeObj(id);
                        var selectDefaultNode = true;
                        if (typeof (options.selectDefaultNode) != "undefined" && options.selectDefaultNode == false) {
                            selectDefaultNode = false;
                        }
                        if (options.hasCheckbox === false && (isNull === 'false' || !isNull) && selectDefaultNode) {
                            treeObj.selectNode(treeObj.getNodes()[0]);
                        }

                        treeObj.setting.view.expandSpeed = "";
                        treeObj.expandAll(false);
                        treeObj.setting.view.expandSpeed = "fast";
                        $.each(treeObj.transformToArray(treeObj.getNodes()),
                            function (k, v) {
                                if (options.hasCheckbox === false) {
                                    if (v.Checked) {
                                        treeObj.selectNode(v);
                                    }
                                }

                                if (v.isParent === true && v.Children.length <= 0) {
                                    treeObj.reAsyncChildNodes(v, 'refresh', false);
                                }
                            });

                        if (options.currentNodeId) {
                            var node = treeObj.getNodesByParam(ztree.keyId, options.currentNodeId, null);
                            treeObj.selectNode(node[0]);
                        }
                    }
                }
            });

        } else {
            $.fn.zTree.init($('#' + id), setting, this.dataSource);
            var treeObj = $.fn.zTree.getZTreeObj(id);
            var nodes = treeObj.transformToArray(treeObj.getNodes());
            var isNull = $('#' + id).attr('data-tree-isNull');
            var isSelect = false;
            if (nodes.length > 0) {
                if (options.hasCheckbox === false) {
                    $.each(nodes,
                        function (k, v) {
                            if (v['Checked'] === true) {
                                treeObj.selectNode(v);
                                isSelect = true;
                            }
                        });
                }
                if (isSelect === false && options.hasCheckbox === false && isNull === 'false') {
                    treeObj.selectNode(nodes[0]);
                }

                treeObj.setting.view.expandSpeed = "";
                treeObj.expandAll(false);
                treeObj.setting.view.expandSpeed = "fast";
            }
        }
    };
    tree.prototype = {
        bindCollection: function (treeul, collectionName, bindProName) {
            var keyId = this.keyId;
            var treediv = treeul.next('div[data-tree-treedata]');
            if (treediv) {
                treediv.remove();
            }

            treeul.after('<div data-tree-treedata style=\"display: none\"></div>');
            var nodes = [];
            if ($.fn.zTree.getZTreeObj(this.treeid)) {
                nodes = $.fn.zTree.getZTreeObj(this.treeid).getCheckedNodes(true);
            }

            var index = -1;
            $.each(nodes,
                function (k, v) {
                    var val;
                    val = v[keyId];
                    index++;
                    var hidden =
                        '<input type="hidden" name="' + collectionName + '.Index"' + ' value="' + index + '"/>';
                    var chkbox = '<input type="checkbox" checked name="' +
                        collectionName +
                        '[' +
                        index +
                        '].' +
                        bindProName +
                        '"' +
                        ' value="' +
                        val +
                        '"/>';
                    treeul.next('div[data-tree-treedata]').append(hidden).append(chkbox);
                });
        },
        bindProperty: function (treeul, propertyName) {
            var treediv = treeul.next('div[data-tree-treedata]');
            if (treediv) {
                treediv.remove();
            }

            treeul.after('<div data-tree-treedata style=\"display: none\"></div>');
            var nodes = [];
            if ($.fn.zTree.getZTreeObj(this.treeid)) {
                nodes = $.fn.zTree.getZTreeObj(this.treeid).getSelectedNodes();
            }

            if (nodes.length > 0) {
                var val;
                val = nodes[0][this.keyId];
                var hidden = '<input type="hidden" name="' + propertyName + '"' + ' value="' + val + '"/>';
                treeul.next('div[data-tree-treedata]').append(hidden);
            }
        }
    };

    pe.ui.tree = tree;
}(jQuery));