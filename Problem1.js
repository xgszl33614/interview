var tournament = (() => {
  let teamArr = [] // 球队数组
  let teamNameArr = [] // 球队名数组

  /**
   * [line data format test]
   * @param  {[type]} data [line data]
   * @return {[Boolean]}      [if pass return true, otherwise false]
   */
  function validTest(data) {
    return /^[^;]+;[^;]+;(win|loss|draw)$/.test(data)
  }

  /**
   * [Team Constructor]
   * @param {[String]} name [Team name]
   */
  function Team(name) {
    this.name = name
    this.MP = 0
    this.W = 0
    this.D = 0
    this.L = 0
    this.P = 0
  }

  /**
   * [Team exist or not]
   * @param  {[String]} name [search key]
   * @return {[Number]}      [if exist retrun index in the array, else -1]
   */
  function findTeam(name) {
    return teamNameArr.indexOf(name)
  }

  /**
   * [calculat team's point and...]
   * @param  {[Team]} team      [球队]
   * @param  {[Boolean]} host   [0/1,是否主场]
   * @param  {[String]} result  [match result]
   * @return {[undefined]}       [undefined]
   */
  function calcPoint(team, host, result) {
    team.MP++
    if (result === 'win') {
      host ? team.L++ : team.W++
      team.P += host ? 0 : 3
    } else if (result === 'loss') {
      host ? team.W++ : team.L++
      team.P += host ? 3 : 0
    } else if (result === 'draw') {
      team.D++
      team.P++
    }
  }

  /**
   * [line data process]
   * @param  {[String]} line [line data]
   * @return {[undefined]}      [undefined]
   */
  function dataHandler(line) {
    let matchInfo = line.split(';')

    matchInfo.forEach((name, i) => {
      // 不操作最后一个数据
      if (i === 2) { return }
      let team
      let index = findTeam(name)

      if (index === -1) {
        team = new Team(name)
        teamArr.push(team)
        teamNameArr.push(name)
      } else { // Team已经存在
        team = teamArr[index]
      }

      calcPoint(team, i, matchInfo[2])
    })
  }
  /**
   * [rank]
   * @param  {[Team]} a [Team a]
   * @param  {[Team]} b [Team b]
   * @return {[Boolean]}   [order by P desc, name asc]
   */
  function rank(a, b) {
    if (a.P < b.P) {
      return 1
    } else if (a.P > b.P) {
      return -1
    } else {
      return a.name < b.name ? -1 : 1
    }
  }
  
  // entry
  function tournament(input) {
    let validData = input.trim().split('\n').map(item => item.trim()).filter(validTest)
    validData.forEach(dataHandler)

    return teamArr.sort(rank)
  }

  return tournament
})()

tournament(`
  Allegoric Alaskans;Blithering Badgers;win
  Devastating Donkeys;Courageous Californians;draw
  Devastating Donkeys;Allegoric Alaskans;win
  Courageous Californians;Blithering Badgers;loss
  Blithering Badgers;Devastating Donkeys;loss

  Allegoric Alaskans;Courageous Califo;rnians;win
  Blithering Badgers;Devastating Donkeys;oss
  Allegoric Alaskans;Courageous Californians;awin
  Allegoric Alaskans;;Courageous Californians;win
`)
