export default class TreeNode {
  constructor (node) {
    this.nid = node.nid
    this.label = node.label
    this.leaf = node.leaf
    this.type = node.type
    this.contain = node.contain
    this.parentId = node.parentId
    this.ownerId = node.ownerId
    this.belongProject = node.belongProject
    this.children = node.children ? node.children : []
    console.log(this)
  }

  static nullNode (nid) {
    return new TreeNode({
      nid: nid,
      label: 'ccc',
      leaf: false,
      type: '',
      contain: '',
      parentId: '',
      ownerId: '1',
      belongProject: '1',
      children: []
    })
  }
}
