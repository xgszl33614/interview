var domino = (() => {
  let originData = []
  let stackFlag = [] // 数据入栈时，压入索引
  let stack = [] // 数据栈

  function deepCopy(origin) {
    if (typeof origin !== 'object' || origin == null) return origin
    var target = Object.prototype.toString.call(origin).slice(8, -1) === 'Array' ? [] : {}
    Object.keys(origin).forEach(key => target[key] = deepCopy(origin[key]))
    return target
  }

  /**
   * [节点是否已经在栈中]
   * @param  {[type]} index [description]
   * @return {[type]}       [description]
   */
  function nodeInStack(index) {
    return stackFlag.includes(index)
  }

  /**
   * [交换节点两个数字的位置]
   * @param  {[type]} node [description]
   * @return {[type]}      [description]
   */
  function exchange(node) {
    node[0] = node[0] + node[1]
    node[1] = node[0] - node[1]
    node[0] = node[0] - node[1]
  }

  /**
   * [父子节点是否匹配]
   * @param  {[type]} parent [description]
   * @param  {[type]} child  [description]
   * @return {[type]}        [description]
   */
  function isMatch(parent, child) {
    if ( child[1] === parent[1]) {
      exchange(child)
      return true
    }
    if (child[0] === parent[1]) {
      return true
    }
    return false
  }

  /**
   * [寻找当前节点的所有可遍历子节点]
   * @param  {[type]} item         [description]
   * @param  {[type]} currentIndex [description]
   * @return {[type]}              [description]
   */
  function findChildNode(parentNode) {
    let childNodeArr = []

    for (let i = 0; i < originData.length; i++) {
      if (i !== parentNode.index && !nodeInStack(i) && isMatch(parentNode, originData[i])) {
        childNodeArr.push(originData[i])
      }
    }

    return childNodeArr
  }

  /**
   * [深度搜索]
   * @param  {[Node Object]} parentNode [给定开始节点]
   * @return {[undefined]}              [undefined]
   */
  function searchPath(parentNode) {
    // 压入节点，并搜寻子节点
    stack.push(parentNode)
    stackFlag.push(parentNode.index)

    let childNodeArr = deepCopy(findChildNode(parentNode))

    if (childNodeArr.length !== 0) {
      childNodeArr.forEach(node => {
        searchPath(node)
      })
    } else { // 至叶子节点，结束该次deep，判断是否合规
      if (stack.length === originData.length
        && stack[stack.length - 1][1] === stack[0][0]) {
        console.log(deepCopy(stack))
      }
    }
    // 每层搜索完成弹出top节点
    stack.pop()
    stackFlag.pop()
  }

  // 入口
  function domino(input) {
    originData = deepCopy(input)
    originData.forEach((item, i) => {
      item.index = i
    })

    searchPath(originData[0])
  }

  return domino
})()
domino([[5, 3], [3, 1], [2, 4], [1, 6], [2, 3], [3, 4], [5, 6]])
console.log('---')
domino([[5, 3], [1, 2], [2, 1], [3, 1], [2, 4], [1, 6], [2, 3], [3, 4], [5, 6]])
console.log('---')
domino([[1, 2], [2, 3], [3, 5], [5, 2], [2, 4], [4, 1]])
