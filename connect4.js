var board = $('table table tr')

var player1 = 'rgb(251, 54, 64)'
var player2 = 'rgb(66, 202, 253)'
var bc = 'rgb(23, 29, 28)'
var turn = 0
var gameNumber = 1
var player1Wins = 0
var player2Wins = 0

$('#game').text("Game: " + gameNumber)
gameStatus()

$('.board button').on('click', function(){
  var col = $(this).closest('td').index()
  var bottomRow = getBottomRow(col)
  if (bottomRow === 0)
    $(this).prop('disabled', true)
  board.eq(bottomRow).find('td').eq(col).find('button').css('background-color', turn++ % 2 == 0 ? player1 : player2)
  gameStatus()
  if (rowCheck(bottomRow) || columnCheck(col) || diagonalCheck())
  {
    $('#status').text((turn % 2 == 1 ? "Player 1" : "Player 2") + " has won!")
    if (turn % 2 == 1)
      $('td#p1').text(++player1Wins)
    else
      $('td#p2').text(++player2Wins)
    setTimeout(reset,2000)
    $('.board button').prop('disabled', true)
  }
})

function gameStatus()
{
  $('#status').text((turn % 2 == 0 ? "Player 1" : "Player 2") + ": It's your turn")
}

function reset()
{
  $.each($('.board button'), function(){
    $(this).css('background-color', bc)
  })
  $('#game').text("Game: " + ++gameNumber)
  $('.board button').prop('disabled', false)
  turn = 0
  gameStatus()
}

function colorCheck(col1, col2, col3, col4)
{
  return (col1===col2 && col1===col3 && col1===col4 && col1!==bc && col1!== undefined)
}

function rowCheck(row)
{
  for (var col = 0; col < 4; col++)
  {
    if (colorCheck(getColor(row, col), getColor(row, col+1), getColor(row, col+2), getColor(row, col+3)))
      return true
  }
  return false
}

function columnCheck(col)
{
  for (var row = 0; row < 3; row++)
  {
    if (colorCheck(getColor(row,col), getColor(row+1,col), getColor(row+2,col), getColor(row+3,col)))
      return true
  }
  return false
}

function diagonalCheck()
{
  for (var r = 2; r > -1; r--)                  // Descending Diagonal Check
  {
    for (var c = 0; c < 4; c++)
    {
      if (colorCheck(getColor(r, c), getColor(r+1,c+1), getColor(r+2,c+2), getColor(r+3,c+3)))
        return true
    }
  }

  for (var r = 3; r < 6; r++)
  {
    for (var c = 0; c < 4; c++)
    {
      if (colorCheck(getColor(r, c), getColor(r-1,c+1), getColor(r-2,c+2), getColor(r-3,c+3)))
        return true
    }
  }
  return false
}

function getColor(row, col)
{
  return board.eq(row).find('td').eq(col).find('button').css('background-color')
}

function getBottomRow(column)
{
  for (var i = board.length-1; i > -1; i--)
  {
    if (board.eq(i).find('td').eq(column).find('button').css('background-color') === bc)
      return i
  }
}
